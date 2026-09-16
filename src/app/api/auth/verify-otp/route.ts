import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, otp, type = "register" } = await req.json();
    if (!email || !otp) return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (!user.otp || user.otp !== otp) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    if (user.otpExpires && user.otpExpires < new Date()) return NextResponse.json({ error: "OTP has expired" }, { status: 400 });

    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    if (type === "register") {
      return NextResponse.json({ success: true, message: "Registration successful", user: { id: user._id, username: user.username, name: user.name, email: user.email, role: user.role } });
    }

    const token = signToken({
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions || [], // 👈 add केलं
    });
    const response = NextResponse.json({ success: true, user: { id: user._id, username: user.username, name: user.name, email: user.email, role: user.role, permissions: user.permissions || [] } });
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/" });
    return response;
  } catch (error) {
    console.error("Verify OTP error", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
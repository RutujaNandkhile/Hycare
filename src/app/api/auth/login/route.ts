import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword, ensureAdminAccount, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) return NextResponse.json({ error: "Username and password are required" }, { status: 400 });

    await ensureAdminAccount();
    await connectDB();
    const user = await User.findOne({ username: username.toLowerCase().trim() });

    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Self-heal: जुने users ज्यांचं isVerified कधी set च झालं नाही, त्यांना auto-fix करा
    if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    const ok = await comparePassword(password, user.password);
    if (!ok) return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });

    const token = signToken({
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions || [],
    });
    const response = NextResponse.json({ success: true, user: { id: user._id, username: user.username, name: user.name, email: user.email, phone: user.phone, role: user.role, permissions: user.permissions || [] } });
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/" });
    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
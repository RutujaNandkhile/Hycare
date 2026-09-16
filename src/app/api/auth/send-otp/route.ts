import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { generateOTP, hashPassword } from "@/lib/auth";
import { sendOTPEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email, username, name, phone, password, type = "register" } = await req.json();
    const normalizedEmail = email?.toLowerCase().trim();
    const normalizedUsername = username?.toLowerCase().trim();
    if (!normalizedEmail) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    await connectDB();
    let user = await User.findOne({ email: normalizedEmail });

    if (type === "register") {
      if (!normalizedUsername || !name || !password) return NextResponse.json({ error: "Username, name and password are required" }, { status: 400 });
      const usernameTaken = await User.findOne({ username: normalizedUsername, ...(user ? { _id: { $ne: user._id } } : {}) });
      if (usernameTaken) return NextResponse.json({ error: "Username already exists" }, { status: 409 });
      if (user?.isVerified) return NextResponse.json({ error: "Account already exists. Please login." }, { status: 400 });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    if (!user) {
      user = await User.create({ username: normalizedUsername || normalizedEmail.split("@")[0], name: name || normalizedEmail.split("@")[0], email: normalizedEmail, phone, password: await hashPassword(password || ""), otp, otpExpires, isVerified: false, role: "user" });
    } else {
      if (type === "register") {
        user.username = normalizedUsername;
        user.name = name.trim();
        user.phone = phone?.trim();
        user.password = await hashPassword(password);
      }
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    await sendOTPEmail(normalizedEmail, otp, type);
    return NextResponse.json({ success: true, message: "OTP sent to your email", ...(process.env.NODE_ENV === "development" && !process.env.EMAIL_USER ? { otp } : {}) });
  } catch (error: any) {
    console.error("Send OTP error", error);
    return NextResponse.json({ error: error.message || "Failed to send OTP" }, { status: 500 });
  }
}

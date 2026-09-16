export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getAuthUser, hashPassword } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email"; // 👈 तुमचा existing mail lib पाठवल्यावर हे adjust करू

async function admin() {
  const u = await getAuthUser();
  return u?.role === "admin" ? u : null;
}

function generateUsername(name: string) {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10) || "user";
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${base}${rand}`;
}

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let pass = "";
  for (let i = 0; i < 10; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

export async function GET() {
  if (!(await admin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const users = await User.find().select("-password -otp -otpExpires").sort({ createdAt: -1 });
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  const a = await admin();
  if (!a) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, email, phone, role, permissions } = await req.json();
  if (!name || !email || !role) {
    return NextResponse.json({ error: "Name, email and role are required" }, { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 400 });

  const username = generateUsername(name);
  const plainPassword = generatePassword();
  const hashed = await hashPassword(plainPassword);

  const user = await User.create({
    username,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone || undefined,
    password: hashed,
    role,
    permissions: Array.isArray(permissions) ? permissions : [],
    isVerified: true,
  });

  // Welcome email with credentials
  try {
    await sendWelcomeEmail({
      to: user.email,
      name: user.name,
      username: user.username,
      password: plainPassword,
    });
  } catch (e) {
    console.error("Failed to send welcome email:", e);
    // user तयार झालाच आहे, फक्त mail fail झाला तरी request fail करू नये
  }

  const safeUser = await User.findById(user._id).select("-password -otp -otpExpires");
  return NextResponse.json({ user: safeUser }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const a = await admin();
  if (!a) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, username, name, email, phone, role, password, permissions } = await req.json();
  await connectDB();

  const target = await User.findById(id);
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (target._id.toString() === a.userId && role === "user") {
    return NextResponse.json({ error: "You cannot remove your own admin role" }, { status: 400 });
  }

  if (username) target.username = username.toLowerCase().trim();
  if (name) target.name = name.trim();
  if (email) target.email = email.toLowerCase().trim();
  if (phone !== undefined) target.phone = phone;
  if (role) target.role = role;
  if (Array.isArray(permissions)) target.permissions = permissions;
  if (password) target.password = await hashPassword(password);

  await target.save();

  const user = await User.findById(id).select("-password -otp -otpExpires");
  return NextResponse.json({ user });
}

export async function DELETE(req: NextRequest) {
  const a = await admin();
  if (!a) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  if (id === a.userId) return NextResponse.json({ error: "You cannot delete your own admin account" }, { status: 400 });

  await connectDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
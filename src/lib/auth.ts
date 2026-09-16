import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";

export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  role: "user" | "admin";
  permissions: string[];
}

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try { return jwt.verify(token, JWT_SECRET) as TokenPayload; } catch { return null; }
}

export async function getAuthUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function ensureAdminAccount() {
  const email = (process.env.ADMIN_EMAIL || "admin@hycare.com").toLowerCase().trim();
  const username = (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "Admin@123";
  await connectDB();

  let admin = await User.findOne({ $or: [{ email }, { username }] });
  const hashed = await hashPassword(password);

  if (!admin) {
    admin = await User.create({
      username,
      name: "HyCare Admin",
      email,
      password: hashed,
      role: "admin",
      isVerified: true,
      permissions: [],
    });
  } else {
    let changed = false;
    if (admin.role !== "admin") { admin.role = "admin"; changed = true; }
    if (!admin.isVerified) { admin.isVerified = true; changed = true; }
    if (admin.username !== username) { admin.username = username; changed = true; }
    if (admin.email !== email) { admin.email = email; changed = true; }
    if (process.env.ADMIN_PASSWORD) { admin.password = hashed; changed = true; }
    if (changed) await admin.save();
  }
  return admin;
}
/**
 * Creates the configured admin account if it does not already exist.
 * Admin username/password are read from ADMIN_USERNAME / ADMIN_PASSWORD.
 */
import { connectDB } from "./db";
import User from "../models/User";
import { hashPassword } from "./auth";

export async function seedAdmin() {
  await connectDB();
  const email = (process.env.ADMIN_EMAIL || "admin@hycare.com").toLowerCase().trim();
  const username = (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "Admin@123";

  let admin = await User.findOne({ $or: [{ email }, { username }] });
  if (admin) {
    if (admin.role !== "admin") admin.role = "admin";
    if (!admin.isVerified) admin.isVerified = true;
    if (admin.username !== username) admin.username = username;
    if (admin.email !== email) admin.email = email;
    admin.password = await hashPassword(password);
    await admin.save();
    return admin;
  }

  return User.create({
    username,
    name: "HyCare Admin",
    email,
    role: "admin",
    isVerified: true,
    password: await hashPassword(password),
  });
}

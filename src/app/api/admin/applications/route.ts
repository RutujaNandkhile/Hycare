import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import { getAuthUser } from "@/lib/auth";

async function requireAdmin() {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return null;
  }
  return user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const applications = await Application.find().sort({ createdAt: -1 });
  return NextResponse.json({ applications });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  await connectDB();
  const app = await Application.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json({ application: app });
}

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    await connectDB();
    const application = await Application.create({
      name,
      email,
      phone,
      company,
      service,
      message,
      status: "pending",
    });

    return NextResponse.json({ success: true, id: application._id }, { status: 201 });
  } catch (error) {
    console.error("Application submit error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

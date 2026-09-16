import { NextRequest, NextResponse } from "next/server";
import { ensureAdminAccount } from "@/lib/auth";
import { getAuthUser } from "@/lib/auth";

// Admin seed is intentionally protected. It cannot be called publicly by an anonymous user.
export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    const setupKey = req.headers.get("x-admin-setup-key");
    const configuredKey = process.env.ADMIN_SETUP_KEY;

    if (authUser?.role !== "admin" && (!configuredKey || setupKey !== configuredKey)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = await ensureAdminAccount();
    return NextResponse.json({
      success: true,
      message: "Admin account is ready",
      username: admin.username,
      email: admin.email,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to seed admin" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { hasPermission, PermissionKey } from "@/lib/permissions";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();

    // type query param सांगतो कशासाठी upload होतोय: gallery, slider, इ.
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "gallery" | "slider" | ...

    const permissionMap: Record<string, PermissionKey> = {
      gallery: "manage_gallery",
      slider: "manage_slider",
    };

    const requiredPermission = type ? permissionMap[type] : undefined;

    const allowed =
      user?.role === "admin" ||
      (requiredPermission && hasPermission(user, requiredPermission));

    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json({
        url: `https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80`,
        message: "Cloudinary not configured - using placeholder",
      });
    }

    const result = await uploadImage(file, "hycare");
    return NextResponse.json({ url: result.url, public_id: result.public_id });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
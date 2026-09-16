
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";

export const dynamic = "force-dynamic";

/* =========================
   GET - Admin + User
   All active gallery photos
========================= */
export async function GET() {
  try {
    await connectDB();

    const items = await Gallery.find({
      isActive: true,
    }).sort({ order: 1 });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Gallery GET error:", error);

    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}

/* =========================
   POST - Admin + User
   Add Photo
========================= */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      category,
      imageUrl,
      isActive = true,
      order = 0,
    } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        {
          error: "Title and image are required",
        },
        { status: 400 }
      );
    }

    const item = await Gallery.create({
      title,
      category: category || "CNC STRENGTH",
      imageUrl,
      isActive,
      order,
    });

    return NextResponse.json(
      {
        success: true,
        item,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gallery POST error:", error);

    return NextResponse.json(
      {
        error: "Failed to add photo",
      },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE - Admin + User
   Delete Photo
========================= */
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Photo ID is required",
        },
        { status: 400 }
      );
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error) {
    console.error("Gallery DELETE error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete photo",
      },
      { status: 500 }
    );
  }
}


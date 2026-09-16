
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Slider from "@/models/Slider";

export const dynamic = "force-dynamic";

/* =========================
   GET - Admin + User
========================= */
export async function GET() {
  try {
    await connectDB();

    const items = await Slider.find({
      isActive: true,
    }).sort({ order: 1 });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Slider GET error:", error);

    return NextResponse.json(
      {
        error: "Failed to load sliders",
      },
      { status: 500 }
    );
  }
}

/* =========================
   POST - Admin + User
   Add Slider
========================= */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
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

    const item = await Slider.create({
      title,
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
    console.error("Slider POST error:", error);

    return NextResponse.json(
      {
        error: "Failed to add slider",
      },
      { status: 500 }
    );
  }
}

/* =========================
   PUT - Admin + User
   Edit Slider
========================= */
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      id,
      title,
      imageUrl,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          error: "Slider ID is required",
        },
        { status: 400 }
      );
    }

    const updateData: {
      title?: string;
      imageUrl?: string;
    } = {};

    if (title) {
      updateData.title = title;
    }

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const item = await Slider.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    if (!item) {
      return NextResponse.json(
        {
          error: "Slider not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Slider PUT error:", error);

    return NextResponse.json(
      {
        error: "Failed to update slider",
      },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE - Admin + User
========================= */
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Slider ID is required",
        },
        { status: 400 }
      );
    }

    await Slider.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Slider deleted successfully",
    });
  } catch (error) {
    console.error("Slider DELETE error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete slider",
      },
      { status: 500 }
    );
  }
}


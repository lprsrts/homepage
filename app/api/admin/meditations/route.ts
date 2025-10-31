import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getMeditations, saveMeditation, deleteMeditation } from "@/lib/content";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authResult = await verifyAuth(request);
  if (!authResult.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const meditations = getMeditations();
    return NextResponse.json({ meditations });
  } catch (error) {
    console.error("Error loading meditations:", error);
    return NextResponse.json(
      { error: "Failed to load meditations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authResult = await verifyAuth(request);
  if (!authResult.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const meditation = await request.json();

    if (!meditation.slug || !meditation.title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    saveMeditation({
      slug: meditation.slug,
      title: meditation.title,
      date: meditation.date || new Date().toISOString().split("T")[0],
      excerpt: meditation.excerpt || "",
      content: meditation.content || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating meditation:", error);
    return NextResponse.json(
      { error: "Failed to create meditation" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const authResult = await verifyAuth(request);
  if (!authResult.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const meditation = await request.json();

    if (!meditation.slug || !meditation.title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    saveMeditation({
      slug: meditation.slug,
      title: meditation.title,
      date: meditation.date || new Date().toISOString().split("T")[0],
      excerpt: meditation.excerpt || "",
      content: meditation.content || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating meditation:", error);
    return NextResponse.json(
      { error: "Failed to update meditation" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authResult = await verifyAuth(request);
  if (!authResult.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    deleteMeditation(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting meditation:", error);
    return NextResponse.json(
      { error: "Failed to delete meditation" },
      { status: 500 }
    );
  }
}

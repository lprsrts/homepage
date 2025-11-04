import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getMemoirPosts, saveMemoirPost, deleteMemoirPost } from "@/lib/content";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authResult = await verifyAuth(request);
  if (!authResult.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = getMemoirPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error loading memoir posts:", error);
    return NextResponse.json(
      { error: "Failed to load memoir posts" },
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
    const post = await request.json();
    console.log("POST request received:", post);

    // Validate that slug and title are provided and not just whitespace
    if (!post.slug?.trim() || !post.title?.trim()) {
      console.log("Validation failed:", { slug: post.slug, title: post.title });
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    const postData = {
      slug: post.slug.trim(),
      title: post.title.trim(),
      date: post.date || new Date().toISOString().split("T")[0],
      excerpt: post.excerpt || "",
      content: post.content || "",
      language: post.language,
    };

    console.log("Saving memoir post:", postData);
    await saveMemoirPost(postData);
    console.log("Memoir post saved successfully");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating memoir post:", error);
    return NextResponse.json(
      { error: "Failed to create memoir post" },
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
    const post = await request.json();
    console.log("PUT request received:", post);

    // Validate that slug and title are provided and not just whitespace
    if (!post.slug?.trim() || !post.title?.trim()) {
      console.log("Validation failed:", { slug: post.slug, title: post.title });
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    const postData = {
      slug: post.slug.trim(),
      title: post.title.trim(),
      date: post.date || new Date().toISOString().split("T")[0],
      excerpt: post.excerpt || "",
      content: post.content || "",
      language: post.language,
    };

    console.log("Updating memoir post:", postData);
    await saveMemoirPost(postData);
    console.log("Memoir post updated successfully");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating memoir post:", error);
    return NextResponse.json(
      { error: "Failed to update memoir post" },
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

    await deleteMemoirPost(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting memoir post:", error);
    return NextResponse.json(
      { error: "Failed to delete memoir post" },
      { status: 500 }
    );
  }
}

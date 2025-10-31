import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/content";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authResult = await verifyAuth(request);
  if (!authResult.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = getBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return NextResponse.json(
      { error: "Failed to load blog posts" },
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

    if (!post.slug || !post.title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    saveBlogPost({
      slug: post.slug,
      title: post.title,
      date: post.date || new Date().toISOString().split("T")[0],
      excerpt: post.excerpt || "",
      content: post.content || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
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

    if (!post.slug || !post.title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    saveBlogPost({
      slug: post.slug,
      title: post.title,
      date: post.date || new Date().toISOString().split("T")[0],
      excerpt: post.excerpt || "",
      content: post.content || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
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

    deleteBlogPost(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/content";

export async function GET() {
  try {
    const posts = getBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return NextResponse.json({ posts: [] });
  }
}

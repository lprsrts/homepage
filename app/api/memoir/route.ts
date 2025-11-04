import { NextResponse } from "next/server";
import { getMemoirPosts } from "@/lib/content";

export async function GET() {
  try {
    const posts = getMemoirPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error loading memoir posts:", error);
    return NextResponse.json({ posts: [] });
  }
}

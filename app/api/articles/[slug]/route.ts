import { NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/articles";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const article = getArticleBySlug(params.slug);

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Error loading article:", error);
    return NextResponse.json(
      { error: "Failed to load article" },
      { status: 500 }
    );
  }
}

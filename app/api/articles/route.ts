import { NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";

export async function GET() {
  try {
    const articles = getArticles();
    // Only return slug, title, and date for the list
    const articleList = articles.map(({ slug, title, date }) => ({
      slug,
      title,
      date,
    }));

    return NextResponse.json({ articles: articleList });
  } catch (error) {
    console.error("Error loading articles:", error);
    return NextResponse.json({ articles: [] });
  }
}

import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getArticles, saveArticle, deleteArticle } from "@/lib/articles";

export async function GET(request: Request) {
  const authResult = await verifyAuth(request);
  if (!authResult.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = getArticles();
    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error loading articles:", error);
    return NextResponse.json(
      { error: "Failed to load articles" },
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
    const article = await request.json();

    if (!article.slug || !article.title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    saveArticle({
      slug: article.slug,
      title: article.title,
      date: article.date || new Date().toISOString().split("T")[0],
      content: article.content || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
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
    const article = await request.json();

    if (!article.slug || !article.title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    saveArticle({
      slug: article.slug,
      title: article.title,
      date: article.date || new Date().toISOString().split("T")[0],
      content: article.content || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
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

    deleteArticle(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}

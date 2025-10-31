import { NextResponse } from "next/server";
import { getMeditations } from "@/lib/content";

export async function GET() {
  try {
    const meditations = getMeditations();
    return NextResponse.json({ meditations });
  } catch (error) {
    console.error("Error loading meditations:", error);
    return NextResponse.json({ meditations: [] });
  }
}

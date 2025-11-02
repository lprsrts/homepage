import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/data';

export async function GET() {
  try {
    const data = getProjects();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json(
      { projects: [] },
      { status: 200 }
    );
  }
}

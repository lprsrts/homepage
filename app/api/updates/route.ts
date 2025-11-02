import { NextResponse } from 'next/server';
import { getUpdates } from '@/lib/data';

export async function GET() {
  try {
    const data = getUpdates();
    // Sort by date descending
    data.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading updates:', error);
    return NextResponse.json(
      { updates: [] },
      { status: 200 }
    );
  }
}

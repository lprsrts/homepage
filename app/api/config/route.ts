import { NextResponse } from 'next/server';
import { getSiteConfig } from '@/lib/data';

export async function GET() {
  const config = getSiteConfig();
  return NextResponse.json(config);
}

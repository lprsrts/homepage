import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  return NextResponse.json({ valid: true, username: payload.username });
}

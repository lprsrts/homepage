import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getSiteConfig, saveSiteConfig } from '@/lib/data';

function authenticate(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  return verifyToken(token);
}

export async function GET(request: NextRequest) {
  const payload = authenticate(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const config = getSiteConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  const payload = authenticate(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newConfig = await request.json();
    saveSiteConfig(newConfig);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Config update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getMedia, saveMedia, MediaItem } from '@/lib/data';

export const dynamic = 'force-dynamic';

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

  const media = getMedia();
  return NextResponse.json(media);
}

export async function POST(request: NextRequest) {
  const payload = authenticate(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newItem: MediaItem = await request.json();
    const media = getMedia();
    
    // Generate new ID
    const maxId = media.items.reduce((max, m) => Math.max(max, parseInt(m.id) || 0), 0);
    newItem.id = String(maxId + 1);
    newItem.uploadedAt = new Date().toISOString();
    
    media.items.unshift(newItem);
    saveMedia(media);
    
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Media creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const payload = authenticate(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
    }
    
    const media = getMedia();
    media.items = media.items.filter(m => m.id !== id);
    saveMedia(media);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Media deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

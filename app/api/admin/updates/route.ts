import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getUpdates, saveUpdates, Update } from '@/lib/data';

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

  try {
    const data = getUpdates();
    // Sort by date descending
    data.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading updates:', error);
    return NextResponse.json(
      { error: 'Failed to load updates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const payload = authenticate(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const update: Update = await request.json();
    console.log('POST update request received:', update);

    // Validate required fields
    if (!update.date || !update.content?.trim()) {
      console.log('Validation failed:', { date: update.date, content: update.content });
      return NextResponse.json(
        { error: 'Date and content are required' },
        { status: 400 }
      );
    }

    const data = getUpdates();
    
    // Generate ID if not provided
    if (!update.id) {
      const maxId = data.updates.reduce((max, u) => Math.max(max, parseInt(u.id) || 0), 0);
      update.id = String(maxId + 1);
    }

    // Add update
    data.updates.push({
      id: update.id,
      date: update.date,
      content: update.content.trim(),
      category: update.category || undefined,
    });

    // Sort by date descending
    data.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log('Saving updates:', data);
    await saveUpdates(data);
    console.log('Updates saved successfully');

    return NextResponse.json({ success: true, update });
  } catch (error) {
    console.error('Error creating update:', error);
    return NextResponse.json(
      { error: 'Failed to create update' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const payload = authenticate(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const update: Update = await request.json();
    console.log('PUT update request received:', update);

    // Validate required fields
    if (!update.id || !update.date || !update.content?.trim()) {
      console.log('Validation failed:', { id: update.id, date: update.date, content: update.content });
      return NextResponse.json(
        { error: 'ID, date and content are required' },
        { status: 400 }
      );
    }

    const data = getUpdates();
    const index = data.updates.findIndex(u => u.id === update.id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      );
    }

    // Update entry
    data.updates[index] = {
      id: update.id,
      date: update.date,
      content: update.content.trim(),
      category: update.category || undefined,
    };

    // Sort by date descending
    data.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log('Updating updates:', data);
    await saveUpdates(data);
    console.log('Updates updated successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating update:', error);
    return NextResponse.json(
      { error: 'Failed to update entry' },
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
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const data = getUpdates();
    const index = data.updates.findIndex(u => u.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      );
    }

    // Remove update
    data.updates.splice(index, 1);

    console.log('Deleting update:', id);
    await saveUpdates(data);
    console.log('Update deleted successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting update:', error);
    return NextResponse.json(
      { error: 'Failed to delete update' },
      { status: 500 }
    );
  }
}

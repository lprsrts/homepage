import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getBlogPosts, saveBlogPosts, BlogPost } from '@/lib/data';

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

  const posts = getBlogPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const payload = authenticate(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newPost: BlogPost = await request.json();
    const posts = getBlogPosts();
    
    // Generate new ID
    const maxId = posts.posts.reduce((max, p) => Math.max(max, parseInt(p.id) || 0), 0);
    newPost.id = String(maxId + 1);
    
    posts.posts.unshift(newPost);
    saveBlogPosts(posts);
    
    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Blog post creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
    const updatedPost: BlogPost = await request.json();
    const posts = getBlogPosts();
    
    const index = posts.posts.findIndex(p => p.id === updatedPost.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    posts.posts[index] = updatedPost;
    saveBlogPosts(posts);
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Blog post update error:', error);
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
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }
    
    const posts = getBlogPosts();
    posts.posts = posts.posts.filter(p => p.id !== id);
    saveBlogPosts(posts);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog post deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

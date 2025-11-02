import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getProjects, saveProjects, Project } from '@/lib/data';

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
    const data = getProjects();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json(
      { error: 'Failed to load projects' },
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
    const project: Project = await request.json();
    console.log('POST project request received:', project);

    // Validate required fields
    if (!project.title?.trim() || !project.description?.trim()) {
      console.log('Validation failed:', { title: project.title, description: project.description });
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const data = getProjects();
    
    // Generate ID if not provided
    if (!project.id) {
      const maxId = data.projects.reduce((max, p) => Math.max(max, parseInt(p.id) || 0), 0);
      project.id = String(maxId + 1);
    }

    // Add project
    data.projects.push({
      ...project,
      title: project.title.trim(),
      description: project.description.trim(),
      tech: project.tech || [],
      link: project.link || '',
      featured: project.featured || false,
    });

    console.log('Saving projects:', data);
    await saveProjects(data);
    console.log('Projects saved successfully');

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
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
    const project: Project = await request.json();
    console.log('PUT project request received:', project);

    // Validate required fields
    if (!project.id || !project.title?.trim() || !project.description?.trim()) {
      console.log('Validation failed:', { id: project.id, title: project.title, description: project.description });
      return NextResponse.json(
        { error: 'ID, title and description are required' },
        { status: 400 }
      );
    }

    const data = getProjects();
    const index = data.projects.findIndex(p => p.id === project.id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project
    data.projects[index] = {
      ...project,
      title: project.title.trim(),
      description: project.description.trim(),
      tech: project.tech || [],
      link: project.link || '',
      featured: project.featured || false,
    };

    console.log('Updating projects:', data);
    await saveProjects(data);
    console.log('Projects updated successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
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

    const data = getProjects();
    const index = data.projects.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Remove project
    data.projects.splice(index, 1);

    console.log('Deleting project:', id);
    await saveProjects(data);
    console.log('Project deleted successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

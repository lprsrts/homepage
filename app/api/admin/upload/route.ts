import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { GitHubStorage } from '@/lib/github-storage';

export const dynamic = 'force-dynamic';

function authenticate(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  return verifyToken(token);
}

export async function POST(request: NextRequest) {
  const payload = authenticate(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename to avoid conflicts
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${sanitizedName}`;
    const url = `/${folder}/${filename}`;

    // Check if running on Vercel (production)
    const isVercel = process.env.VERCEL === '1';

    if (isVercel) {
      // Upload to GitHub in production
      try {
        const githubStorage = new GitHubStorage();
        const filePath = `public/${folder}/${filename}`;
        
        // Upload to GitHub
        const githubUrl = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${filePath}`;
        
        const response = await fetch(githubUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Upload image: ${filename}`,
            content: buffer.toString('base64'),
            branch: process.env.GITHUB_BRANCH || 'main',
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`GitHub upload failed: ${error}`);
        }

        return NextResponse.json({ 
          url,
          filename: sanitizedName,
          originalName: file.name,
          size: file.size,
          type: file.type,
          message: 'Image uploaded to GitHub. Vercel will auto-deploy with the new image.'
        });
      } catch (error) {
        console.error('GitHub upload error:', error);
        return NextResponse.json(
          { error: 'Failed to upload to GitHub. Check your GitHub credentials in environment variables.' },
          { status: 500 }
        );
      }
    } else {
      // Local development: write to filesystem
      const targetDir = path.join(process.cwd(), 'public', folder);
      if (!existsSync(targetDir)) {
        await mkdir(targetDir, { recursive: true });
      }

      const filepath = path.join(targetDir, filename);
      await writeFile(filepath, buffer);

      return NextResponse.json({ 
        url,
        filename: sanitizedName,
        originalName: file.name,
        size: file.size,
        type: file.type
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

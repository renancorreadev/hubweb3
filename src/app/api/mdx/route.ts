import { NextResponse } from 'next/server';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'No path provided' }, { status: 400 });
  }

  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const mdxSource = await serialize(fileContents, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    });

    return NextResponse.json({ mdxSource });
  } catch (error) {
    console.error('Error loading MDX file:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
} 
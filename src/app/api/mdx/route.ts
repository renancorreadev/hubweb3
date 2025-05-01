import { NextResponse } from 'next/server';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';

interface MDXContent {
  content: any;
  metadata: {
    slug: string;
    title?: string;
    description?: string;
  };
}

function getMDXContent(dirPath: string): MDXContent[] {
  const items: MDXContent[] = [];
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    
    if (file.isDirectory()) {
      // Recursively get content from subdirectories
      items.push(...getMDXContent(fullPath));
    } else if (file.name.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const slug = path
        .relative(process.cwd(), fullPath)
        .replace(/\.mdx$/, '')
        .split(path.sep)
        .slice(5) // Skip src/features/blockchain/projects/loyahub/docs
        .join('/');

      items.push({
        content,
        metadata: {
          slug,
          // You can add more metadata extraction here if needed
        }
      });
    }
  }

  return items;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestPath = searchParams.get('path');

  if (!requestPath) {
    // If no specific path is provided, return the structure of all MDX files
    const docsPath = path.join(process.cwd(), 'src/features/blockchain/projects/loyahub/docs');
    try {
      const allContent = getMDXContent(docsPath);
      const structure = allContent.map(item => ({
        slug: item.metadata.slug,
        title: item.metadata.title,
        description: item.metadata.description
      }));
      return NextResponse.json({ structure });
    } catch (error) {
      console.error('Error reading docs structure:', error);
      return NextResponse.json(
        { error: "Failed to read docs structure" },
        { status: 500 }
      );
    }
  }

  try {
    const fullPath = path.join(process.cwd(), requestPath);
    
    // Security check to ensure we're only reading files from the docs directory
    const docsPath = path.join(process.cwd(), 'src/features/blockchain/projects/loyahub/docs');
    if (!fullPath.startsWith(docsPath)) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 }
      );
    }

    let filePath = fullPath;
    // If the path doesn't end with .mdx, try to find an index.mdx
    if (!fullPath.endsWith('.mdx')) {
      filePath = path.join(fullPath, 'index.mdx');
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      );
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
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
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 }
    );
  }
}

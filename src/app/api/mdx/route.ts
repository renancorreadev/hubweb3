import { NextResponse, NextRequest } from 'next/server';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import { SupportedLanguage } from '@/i18n';

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

// Base path for docs content
const DOCS_CONTENT_ROOT = path.join(process.cwd(), 'src/features/blockchain/projects/loyahub/docs');

// Function to get MDX source, now language-aware
async function getMDXSource(lang: SupportedLanguage, relativePath: string) {
  const filePath = path.join(DOCS_CONTENT_ROOT, lang, `${relativePath}.mdx`);
  const indexFilePath = path.join(DOCS_CONTENT_ROOT, lang, relativePath, 'index.mdx');

  let finalPath = '';
  if (fs.existsSync(filePath)) {
    finalPath = filePath;
  } else if (fs.existsSync(indexFilePath)) {
    finalPath = indexFilePath;
  }

  if (!finalPath) {
    console.error(`MDX file not found for lang '${lang}' and path '${relativePath}'. Checked: ${filePath} and ${indexFilePath}`);
    return null;
  }

  try {
    const fileContent = fs.readFileSync(finalPath, 'utf8');
    const mdxSource = await serialize(fileContent, { parseFrontmatter: true });
    return mdxSource;
  } catch (error) {
    console.error(`Error reading or serializing MDX file ${finalPath}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const relativePath = searchParams.get('path'); // Agora esperamos o path RELATIVO
  const lang = (searchParams.get('lang') || 'pt') as SupportedLanguage;

  if (!['pt', 'en'].includes(lang)) {
    return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  }

  if (!relativePath) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }

  try {
    const mdxSource = await getMDXSource(lang, relativePath);

    if (!mdxSource) {
      return NextResponse.json({ error: 'MDX content not found' }, { status: 404 });
    }

    return NextResponse.json({ mdxSource });

  } catch (error) {
    console.error('Error in MDX API:', error);
    return NextResponse.json({ error: 'Failed to process MDX content' }, { status: 500 });
  }
}

import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NavItem } from '@/features/blockchain/projects/loyahub/components/layout/Navigation';
import { SupportedLanguage } from '@/i18n'; 

// Base path for docs content
const DOCS_CONTENT_ROOT = path.join(process.cwd(), 'src/features/blockchain/projects/loyahub/docs');

// Map of section names to icon names
const SECTION_ICONS: { [key: string]: string } = {
  introduction: 'HomeIcon',
  api: 'CommandLineIcon',
  test: 'BeakerIcon',
};

interface MDXMetadata {
  title: string;
  description?: string;
  order?: number;
  icon?: string;
}

// Read MDX metadata from a file
function getMDXMetadata(filePath: string): MDXMetadata {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return {
      title: data.title || path.basename(filePath, '.mdx'),
      description: data.description,
      order: data.order,
      icon: data.icon
    };
  } catch (error) {
    // Return default metadata if file doesn't exist or has errors
    console.warn(`Could not read metadata for ${filePath}:`, error);
    return {
      title: path.basename(filePath, '.mdx'),
      order: 999 // Default high order for items without metadata
    };
  }
}

// Generate href for a file or directory (Mantendo a rota física atual)
function generateHref(relativePath: string): string {
  // NOT adding /lang/ here yet, as physical route hasn't changed
  return `/blockchain/projects/loyahub/docs/${relativePath}`
    .replace(/\/index\.mdx$/, '') // Remove index.mdx from the end
    .replace(/\.mdx$/, ''); // Remove .mdx from the end
}

// Walk through the docs directory for a specific language
function generateNavigationItems(lang: SupportedLanguage, dir: string, relativePath: string = ''): NavItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items: NavItem[] = [];

  // First collect all items
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    const relativeItemPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.mdx');
      const metadata = getMDXMetadata(indexPath); // Metadata comes from index.mdx
      const children = generateNavigationItems(lang, fullPath, relativeItemPath); // Recurse
      const iconName = SECTION_ICONS[entry.name.toLowerCase()];

      items.push({
        label: metadata.title, // Use title from index.mdx
        href: generateHref(relativeItemPath), // Path relative to /docs/
        description: metadata.description,
        items: children.length > 0 ? children : undefined,
        order: metadata.order,
        icon: iconName
      });
    } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
      const metadata = getMDXMetadata(fullPath);
      items.push({
        label: metadata.title,
        href: generateHref(relativeItemPath),
        description: metadata.description,
        order: metadata.order
      });
    }
  });

  // Sort items by order, then by label
  return items.sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || 999) - (b.order || 999);
    }
    return a.label.localeCompare(b.label);
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // Get language from query param, default to 'pt'
    const lang = (searchParams.get('lang') || 'pt') as SupportedLanguage;
    
    // Validate language
    if (!['pt', 'en'].includes(lang)) {
        return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
    }

    // Construct path based on language
    const langDocsPath = path.join(DOCS_CONTENT_ROOT, lang);

    if (!fs.existsSync(langDocsPath)) {
      return NextResponse.json({ error: `Docs not found for language: ${lang}` }, { status: 404 });
    }

    const navigation = generateNavigationItems(lang, langDocsPath);
    return NextResponse.json({ navigation });
  } catch (error) {
    console.error('Error generating navigation:', error);
    return NextResponse.json({ error: 'Failed to generate navigation' }, { status: 500 });
  }
} 
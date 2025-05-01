import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NavItem } from '@/features/blockchain/projects/loyahub/components/layout/Navigation';

const DOCS_ROOT = path.join(process.cwd(), 'src/features/blockchain/projects/loyahub/docs');

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
    return {
      title: path.basename(filePath, '.mdx'),
      order: 999 // Default high order for items without metadata
    };
  }
}

// Generate href for a file or directory
function generateHref(relativePath: string): string {
  return `/blockchain/projects/loyahub/${relativePath}`
    .replace(/\/index\.mdx$/, '') // Remove index.mdx from the end
    .replace(/\.mdx$/, ''); // Remove .mdx from the end
}

// Walk through the docs directory and generate navigation structure
function generateNavigationItems(dir: string = DOCS_ROOT, relativePath: string = ''): NavItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items: NavItem[] = [];

  // First collect all items
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    const relativeItemPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      // Always check for index.mdx in directory
      const indexPath = path.join(fullPath, 'index.mdx');
      const hasIndex = fs.existsSync(indexPath);
      
      // Get metadata from index.mdx if it exists
      const metadata = hasIndex ? getMDXMetadata(indexPath) : { 
        title: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
        order: 999
      };

      // Get all child items (excluding index.mdx)
      const children = generateNavigationItems(fullPath, relativeItemPath);
      
      // Get the icon name for this section
      const iconName = SECTION_ICONS[entry.name.toLowerCase()];

      // Always create a section for directories
      items.push({
        label: metadata.title,
        href: hasIndex ? generateHref(relativeItemPath) : undefined,
        description: metadata.description,
        items: children.length > 0 ? children : undefined,
        order: metadata.order,
        icon: iconName
      });
    } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
      // Only add non-index MDX files as items
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

export async function GET() {
  try {
    const navigation = generateNavigationItems();
    return NextResponse.json({ navigation });
  } catch (error) {
    console.error('Error generating navigation:', error);
    return NextResponse.json({ error: 'Failed to generate navigation' }, { status: 500 });
  }
} 
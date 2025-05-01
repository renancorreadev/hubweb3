import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_ROOT = path.join(process.cwd(), 'src/features/blockchain/projects/loyahub/docs');

interface SearchResult {
  title: string;
  description?: string;
  content: string;
  href: string;
  matches: string[];
  headings?: string[];
}

function generateHref(relativePath: string): string {
  return `/blockchain/projects/loyahub/${relativePath}`
    .replace(/\/index\.mdx$/, '')
    .replace(/\.mdx$/, '');
}

function extractContentFromMDX(mdxContent: string): { content: string; headings: string[] } {
  const headings: string[] = [];
  
  // Extract content from custom components
  const processedContent = mdxContent
    // Process CodeBlock content
    .replace(/<CodeBlock[^>]*>([\s\S]*?)<\/CodeBlock>/g, (_, code) => code)
    // Process ApiExample content
    .replace(/<ApiExample[^>]*>([\s\S]*?)<\/ApiExample>/g, (_, content) => content)
    // Process StepByStep content
    .replace(/<StepByStep[^>]*>([\s\S]*?)<\/StepByStep>/g, (_, content) => content)
    // Process TerminalCommands content
    .replace(/<TerminalCommands[^>]*>([\s\S]*?)<\/TerminalCommands>/g, (_, content) => content)
    // Extract headings
    .replace(/^#{1,6}\s+(.+)$/gm, (match, heading) => {
      headings.push(heading.trim());
      return heading;
    })
    // Clean up any remaining JSX/HTML tags
    .replace(/<[^>]+>/g, ' ')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();

  return {
    content: processedContent,
    headings
  };
}

async function searchInDirectory(dir: string, query: string, results: SearchResult[] = [], relativePath: string = ''): Promise<SearchResult[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const newRelativePath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      await searchInDirectory(fullPath, query, results, newRelativePath);
    } else if (entry.name.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { data, content: mdxContent } = matter(content);
      
      // Process MDX content
      const { content: processedContent, headings } = extractContentFromMDX(mdxContent);
      
      // Convert query and searchable content to lowercase for case-insensitive search
      const searchQuery = query.toLowerCase();
      const searchableContent = processedContent.toLowerCase();
      const searchableTitle = (data.title || '').toLowerCase();
      const searchableDescription = (data.description || '').toLowerCase();
      const searchableHeadings = headings.map(h => h.toLowerCase());

      // Check if the query matches title, description, headings, or content
      if (
        searchableTitle.includes(searchQuery) ||
        searchableDescription.includes(searchQuery) ||
        searchableHeadings.some(h => h.includes(searchQuery)) ||
        searchableContent.includes(searchQuery)
      ) {
        // Find matching excerpts (up to 3)
        const matches: string[] = [];
        let lastIndex = 0;
        let count = 0;
        const maxMatches = 3;

        // First check headings for matches
        searchableHeadings.forEach(heading => {
          if (count < maxMatches && heading.includes(searchQuery)) {
            matches.push(`Heading: ${headings[searchableHeadings.indexOf(heading)]}`);
            count++;
          }
        });

        // Then check content for remaining matches
        while (count < maxMatches) {
          const index = searchableContent.indexOf(searchQuery, lastIndex);
          if (index === -1) break;

          // Get a snippet of text around the match
          const start = Math.max(0, index - 50);
          const end = Math.min(processedContent.length, index + query.length + 50);
          const excerpt = processedContent.slice(start, end).trim();
          matches.push(excerpt);

          lastIndex = index + query.length;
          count++;
        }

        results.push({
          title: data.title || entry.name.replace('.mdx', ''),
          description: data.description,
          content: processedContent,
          href: generateHref(newRelativePath),
          matches,
          headings
        });
      }
    }
  }

  return results;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q');

    if (!searchQuery) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const results = await searchInDirectory(DOCS_ROOT, searchQuery);
    
    // Sort results by relevance
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const query = searchQuery.toLowerCase();

      // Priority: 1. Title match, 2. Heading match, 3. Description match
      if (aTitle.includes(query) && !bTitle.includes(query)) return -1;
      if (!aTitle.includes(query) && bTitle.includes(query)) return 1;
      
      const aHasHeadingMatch = a.headings?.some(h => h.toLowerCase().includes(query)) || false;
      const bHasHeadingMatch = b.headings?.some(h => h.toLowerCase().includes(query)) || false;
      
      if (aHasHeadingMatch && !bHasHeadingMatch) return -1;
      if (!aHasHeadingMatch && bHasHeadingMatch) return 1;

      return 0;
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error searching docs:', error);
    return NextResponse.json({ error: 'Failed to search documentation' }, { status: 500 });
  }
} 
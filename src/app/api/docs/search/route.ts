import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SupportedLanguage } from '@/i18n';

// Base path for all projects' docs content
const PROJECTS_ROOT = path.join(process.cwd(), 'src/features/blockchain/projects');

interface SearchResult {
  title: string;
  description?: string;
  content: string;
  href: string;
  matches: string[];
  headings?: string[];
}

// Generate href for a file or directory, now project-aware
function generateHref(project: string, relativePath: string): string {
  // Assume a rota física reflete o projeto: /blockchain/projects/[project]/docs/...
  return `/blockchain/projects/${project}/docs/${relativePath}`
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

// Search within a specific project and language directory
async function searchInDirectory(project: string, lang: SupportedLanguage, dir: string, query: string, results: SearchResult[] = [], relativePath: string = ''): Promise<SearchResult[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const newRelativePath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      // Pass project and lang down recursively
      await searchInDirectory(project, lang, fullPath, query, results, newRelativePath);
    } else if (entry.name.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { data, content: mdxContent } = matter(content);
      
      const { content: processedContent, headings } = extractContentFromMDX(mdxContent);
      
      const searchQuery = query.toLowerCase();
      const searchableContent = processedContent.toLowerCase();
      const searchableTitle = (data.title || '').toLowerCase();
      const searchableDescription = (data.description || '').toLowerCase();
      const searchableHeadings = headings.map(h => h.toLowerCase());

      if (
        searchableTitle.includes(searchQuery) ||
        searchableDescription.includes(searchQuery) ||
        searchableHeadings.some(h => h.includes(searchQuery)) ||
        searchableContent.includes(searchQuery)
      ) {
        const matches: string[] = [];
        let lastIndex = 0;
        let count = 0;
        const maxMatches = 3;

        searchableHeadings.forEach(heading => {
          if (count < maxMatches && heading.includes(searchQuery)) {
            matches.push(`Heading: ${headings[searchableHeadings.indexOf(heading)]}`);
            count++;
          }
        });

        while (count < maxMatches) {
          const index = searchableContent.indexOf(searchQuery, lastIndex);
          if (index === -1) break;
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
          // Pass project to generate href
          href: generateHref(project, newRelativePath), 
          matches,
          headings
        });
      }
    }
  }

  return results;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const lang = (searchParams.get('lang') || 'pt') as SupportedLanguage;
    const project = searchParams.get('project'); // Obter projeto

    // --- Validação --- 
    if (!project) {
      return NextResponse.json({ error: 'Project parameter is required' }, { status: 400 });
    }
    const allowedProjects = ['loyahub', 'rwa']; // Exemplo
    if (!allowedProjects.includes(project)) {
      return NextResponse.json({ error: `Unsupported project: ${project}` }, { status: 400 });
    }
    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }
    if (!['pt', 'en'].includes(lang)) {
      return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
    }
    // --- Fim Validação ---

    // Construct dynamic content root path
    const projectDocsContentRoot = path.join(PROJECTS_ROOT, project, 'docs');
    const langDocsPath = path.join(projectDocsContentRoot, lang);

    if (!fs.existsSync(langDocsPath)) {
      // Retornar array vazio se pasta não existe
      return NextResponse.json({ results: [] });
    }

    // Passar project e lang para a função de busca
    const results = await searchInDirectory(project, lang, langDocsPath, query);
    
    // Sort results by relevance (sem mudanças)
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const queryLower = query.toLowerCase();

      if (aTitle.includes(queryLower) && !bTitle.includes(queryLower)) return -1;
      if (!aTitle.includes(queryLower) && bTitle.includes(queryLower)) return 1;
      
      const aHasHeadingMatch = a.headings?.some(h => h.toLowerCase().includes(queryLower)) || false;
      const bHasHeadingMatch = b.headings?.some(h => h.toLowerCase().includes(queryLower)) || false;
      
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
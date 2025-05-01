import { NextResponse, NextRequest } from 'next/server';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import { SupportedLanguage } from '@/i18n';



// Base path for all projects' docs content
const PROJECTS_ROOT = path.join(process.cwd(), 'src/features/blockchain/projects');

// Function to get MDX source, now project and language-aware
async function getMDXSource(project: string, lang: SupportedLanguage, relativePath: string) {
  // Construct dynamic content root path
  const projectDocsContentRoot = path.join(PROJECTS_ROOT, project, 'docs');
  
  const filePath = path.join(projectDocsContentRoot, lang, `${relativePath}.mdx`);
  const indexFilePath = path.join(projectDocsContentRoot, lang, relativePath, 'index.mdx');

  let finalPath = '';
  if (fs.existsSync(filePath)) {
    finalPath = filePath;
  } else if (fs.existsSync(indexFilePath)) {
    finalPath = indexFilePath;
  }

  if (!finalPath) {
    console.error(`MDX file not found for project '${project}', lang '${lang}' and path '${relativePath}'. Checked: ${filePath} and ${indexFilePath}`);
    return null;
  }

  try {
    const fileContent = fs.readFileSync(finalPath, 'utf8');
    // Ensure frontmatter is parsed
    const mdxSource = await serialize(fileContent, { parseFrontmatter: true }); 
    return mdxSource;
  } catch (error) {
    console.error(`Error reading or serializing MDX file ${finalPath}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const relativePath = searchParams.get('path');
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
  if (!['pt', 'en'].includes(lang)) {
    return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  }
  if (!relativePath) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }
  // --- Fim Validação ---

  try {
    // Passar project, lang e path
    const mdxSource = await getMDXSource(project, lang, relativePath);

    if (!mdxSource) {
      return NextResponse.json({ error: 'MDX content not found' }, { status: 404 });
    }

    return NextResponse.json({ mdxSource });

  } catch (error) {
    console.error('Error in MDX API:', error);
    return NextResponse.json({ error: 'Failed to process MDX content' }, { status: 500 });
  }
}

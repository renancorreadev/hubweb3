import React from 'react';
import { RwaDocsPage } from '@/features/blockchain/projects/rwa';

interface DocsPageProps {
  params: {
    slug: string[]; // Slug can be an array of path segments
  };
}

// This component receives the slug from the URL parameters
// and renders the main RwaDocsPage component.
export default function DocsSlugPage({ params }: DocsPageProps) {
  console.log('RWA DocsSlugPage params:', params); 
  return <RwaDocsPage slug={params.slug} />;
} 
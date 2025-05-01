import React from 'react';
import { LoyahubPage } from '@/features/blockchain/projects/loyahub';

interface DocsPageProps {
  params: {
    lang: string;
    slug: string[]; // Slug can be an array of path segments
  };
}

// This component receives the language and slug from the URL parameters
// and renders the main LoyahubPage component.
// LoyahubPage itself handles fetching the correct content based on the current state and language context.
export default function DocsSlugPage({ params }: DocsPageProps) {
  console.log('DocsSlugPage params:', params); // Log para depuração
  return <LoyahubPage />;
}

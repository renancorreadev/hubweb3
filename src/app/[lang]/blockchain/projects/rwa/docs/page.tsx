import React from 'react';
import { RwaDocsPage } from '@/features/blockchain/projects/rwa';

interface DocsRootPageProps {
  params: {
    lang: string;
  };
}

// This component renders the main LoyahubPage for the root /docs route.
// LoyahubPage handles fetching the default introduction content for the given language.
export default function DocsRootPage({ params }: DocsRootPageProps) {
  console.log('RWA DocsRootPage params:', params); // Log específico para RWA
  return <RwaDocsPage />;
}

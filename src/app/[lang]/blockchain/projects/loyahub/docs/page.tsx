import React from 'react';
import { LoyahubPage } from '@/features/blockchain/projects/loyahub';

interface DocsRootPageProps {
  params: {
    lang: string;
  };
}

// This component renders the main LoyahubPage for the root /docs route.
// LoyahubPage handles fetching the default introduction content for the given language.
export default function DocsRootPage({ params }: DocsRootPageProps) {
  console.log('DocsRootPage params:', params); // Log para depuração
  return <LoyahubPage />;
}

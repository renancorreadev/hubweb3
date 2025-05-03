import React from 'react';
import { LoyahubPage } from '@/features/blockchain/projects/loyahub';

interface DocsPageProps {
  params: {
    slug: string[]; 
  };
}

export default function DocsSlugPage({ params }: DocsPageProps) {
  console.log('Loyahub DocsSlugPage params:', params);
  return <LoyahubPage slug={params.slug} />;
} 
'use client';

import { JSX, ReactNode } from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

interface TableOfContents {
  items: Array<{
    title: string;
    url: string;
    items?: TableOfContents['items'];
  }>;
}

interface DocsPageProps {
  children: ReactNode;
  toc: TableOfContents;
  title: string;
  filePath: string;
  hideTableOfContents?: boolean;
  full?: boolean;
  pageTree?: any;
  href: string;
  lastModified?: Date;
}

export function DocsPage({
  children,
  toc,
  title,
  filePath,
  hideTableOfContents,
  full,
  pageTree,
  href,
  lastModified,
}: DocsPageProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={`${full ? 'max-w-full' : 'max-w-5xl'} mx-auto`}>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {lastModified && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t('shared.lastModified')}: {new Date(lastModified).toLocaleDateString()}
          </p>
        )}
      </header>

      <div className="flex gap-8">
        {/* Main Content */}
        <main className={`flex-1 prose dark:prose-invert max-w-none ${mobileOnly.padding.p4}`}>
          {children}
        </main>

        {/* Table of Contents - Hidden on mobile */}
        {!hideTableOfContents && (
          <aside className={`${mobileOnly.display.hidden} ${desktopOnly.display.block} w-64 sticky top-24 self-start`}>
            <nav className="space-y-2">
              <h4 className="font-medium mb-4">{t('shared.tableOfContents')}</h4>
              <TableOfContents items={toc.items} />
            </nav>
          </aside>
        )}
      </div>

      {/* Footer Navigation */}
      <footer className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <DocsPagination pageTree={pageTree} currentUrl={href} />
      </footer>
    </div>
  );
}

function TableOfContents({ items }: { items: TableOfContents['items'] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item, index) => (
        <li key={index}>
          <a 
            href={item.url}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white block py-1"
          >
            {item.title}
          </a>
          {item.items && (
            <ul className="pl-4 mt-2 space-y-2 border-l border-zinc-200 dark:border-zinc-700">
              {item.items.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <a 
                    href={subItem.url}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white block py-1"
                  >
                    {subItem.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function DocsPagination({ pageTree, currentUrl }: { pageTree: any; currentUrl: string }) {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between">
      <div>
        <a 
          href="#" 
          className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {t('shared.navigation.previous')}
        </a>
      </div>
      <div>
        <a 
          href="#" 
          className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2"
        >
          {t('shared.navigation.next')}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l15.75 7.5-15.75 7.5" />
          </svg>
        </a>
      </div>
    </div>
  );
} 
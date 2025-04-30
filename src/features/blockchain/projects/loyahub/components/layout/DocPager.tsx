import React from 'react';
import Link from 'next/link';

interface PagerItem {
  href: string;
  label: string;
}

interface DocPagerProps {
  previous?: PagerItem;
  next?: PagerItem;
}

export const DocPager: React.FC<DocPagerProps> = ({ previous, next }) => {
  return (
    <nav className="mt-16 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {/* Previous */}
      {previous ? (
        <Link
          href={previous.href}
          className="group flex flex-col items-start rounded-2xl border border-hub-border-light dark:border-hub-border-dark px-6 py-5 shadow-md transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/20"
        >
          <span className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark text-base mb-1 flex items-center gap-1">
            <span className="text-lg">&lt;</span> Anterior
          </span>
          <span className="text-hub-primary-light dark:text-hub-primary-dark text-xl md:text-2xl font-dsemi transition-colors duration-200">
            {previous.label}
          </span>
        </Link>
      ) : <div />}

      {/* Next */}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end rounded-2xl border border-hub-border-light dark:border-hub-border-dark px-6 py-5 shadow-md transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/20"
        >
          <span className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark text-base mb-1 flex items-center gap-1">
            Próximo <span className="text-lg">&gt;</span>
          </span>
          <span className="text-hub-primary-light dark:text-hub-primary-dark text-xl md:text-2xl font-dsemi transition-colors duration-200">
            {next.label}
          </span>
        </Link>
      ) : <div />}
    </nav>
  );
}; 
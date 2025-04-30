'use client';

import { JSX, ReactNode } from "react";
import { useTheme } from "@/shared/hooks/useTheme";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";

import { DocsSidebar } from "./DocsSidebar";
import { DocsNavbar } from "./DocsNavbar";

interface DocsLayoutProps {
  children: ReactNode;
  tree: any;
  locale: string;
}

export function DocsLayout({ children, tree, locale }: DocsLayoutProps): JSX.Element {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <DocsNavbar locale={locale} />
      
      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className={`${mobileOnly.display.hidden} ${desktopOnly.display.block} w-64 h-screen bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 fixed top-16 left-0 overflow-y-auto`}>
          <DocsSidebar tree={tree} />
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${desktopOnly.padding.p16} ${mobileOnly.padding.p4} pt-16`}>
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 
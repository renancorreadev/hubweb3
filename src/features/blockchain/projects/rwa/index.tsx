"use client";

import React, { useState, useEffect } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useTheme } from "next-themes";
import {
  SunIcon,
  MoonIcon,
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/shared/contexts/LanguageContext";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import {
  Navigation,
  NavItemComponent,
  NavItem,
} from "../components/layout/Navigation";
import { SectionContent } from "../components/content/SectionContent";
import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";
import { DocPager } from "../components/layout/DocPager";
import { useParams, usePathname } from "next/navigation";

interface RwaDocsPageProps {
  slug?: string[];
}

export function RwaDocsPage({ slug }: RwaDocsPageProps = {}) {
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([]);
  const [currentPath, setCurrentPath] = useState("/blockchain/projects/rwa/docs/introduction");
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavLoading, setIsNavLoading] = useState(true);

  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  
  // If a slug is provided, set the current path
  useEffect(() => {
    if (slug && slug.length > 0) {
      const newPath = `/blockchain/projects/rwa/docs/${slug.join('/')}`;
      setCurrentPath(newPath);
    } else if (pathname && pathname.includes('/docs/')) {
      // Se não temos slug, mas temos pathname que inclui /docs/, usamos ele
      setCurrentPath(pathname);
    }
  }, [slug, pathname]);

  useEffect(() => {
    async function loadNavigation() {
      setIsNavLoading(true);
      try {
        const projectName = 'rwa';
        const response = await fetch(`/api/docs/navigation?lang=${language}&project=${projectName}`);
        const data = await response.json();
        if (data.navigation) {
          setNavigationItems(data.navigation);
        } else {
          console.error('Navigation data missing in response:', data);
          setNavigationItems([]);
        }
      } catch (error) {
        console.error('Error loading navigation:', error);
        setNavigationItems([]);
      } finally {
        setIsNavLoading(false);
      }
    }

    if (language) {
      loadNavigation();
    }
  }, [language]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadContent() {
      if (!currentPath || !language) return;
      
      try {
        setIsLoading(true);
        const normalizedPath = currentPath
          .replace(/^\/blockchain\/projects\/rwa\/docs\//, '')
          .replace(/^\//, '');
        
        const relativeContentPath = normalizedPath || 'introduction';
        const projectName = 'rwa';

        console.log(`Fetching content for project '${projectName}', lang '${language}' with relative path:`, relativeContentPath);

        const response = await fetch(
          `/api/mdx?path=${encodeURIComponent(relativeContentPath)}&lang=${language}&project=${projectName}`
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to load content for ${relativeContentPath} (${language}). Status: ${response.status}. Response: ${errorText}`);
          throw new Error(`Failed to load content for ${relativeContentPath} (${language})`);
        }

        const data = await response.json();

        if (!data || !data.mdxSource) {
          console.error('Invalid content format received:', data);
          throw new Error('Invalid content format received');
        }

        setContent(data.mdxSource);
      } catch (error) {
        console.error("Error loading content:", error);
        const errorContent = await serialize(
          `# Error\nFailed to load content for language: ${language}. Please check if the documentation file exists.`
        );
        setContent(errorContent);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [currentPath, language]);

  const handleNavigation = (path: string) => {
    console.log('Navigating to (physical path):', path);
    setCurrentPath(path);
  };

  const breadcrumbItems = [
    { 
      label: t('loyahubDocs.breadcrumbs.root'),
      href: "/blockchain/projects/rwa/docs/introduction",
      onClick: () => handleNavigation("/blockchain/projects/rwa/docs/introduction")
    },
    ...currentPath
      .split("/")
      .filter(Boolean)
      .filter(segment => !['blockchain', 'projects', 'rwa', 'docs'].includes(segment))
      .map((segment, index, array) => {
        const relevantSegments = array.filter(s => !['blockchain', 'projects', 'rwa', 'docs'].includes(s));
        const segmentIndex = relevantSegments.indexOf(segment);
        const pathUnderDocs = relevantSegments.slice(0, segmentIndex + 1).join("/");
        const fullPath = "/blockchain/projects/rwa/docs/" + pathUnderDocs;
        return {
          label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
          href: fullPath,
          onClick: () => handleNavigation(fullPath),
        };
      }),
  ];

  const filteredItems = navigationItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items?.some((child: NavItem) =>
        child.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (!mounted || isNavLoading) return null;

  return (
    <div className="flex h-screen bg-white dark:bg-hub-background transition-colors duration-200">
      <div className={`${mobileOnly.display.hidden} ${desktopOnly.display.block}`}>
        <Navigation
          items={navigationItems}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onNavigate={handleNavigation}
          currentPath={currentPath}
          language={language}
          project="rwa"
        />
      </div>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white dark:bg-hub-background border-b border-hub-border-light dark:border-hub-border-dark px-6 py-4">
          <div className="flex items-center justify-between">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-hub-hover-light dark:bg-hub-hover-dark text-hub-text-primary-light dark:text-hub-text-primary-dark"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${desktopOnly.display.hidden} p-2 rounded-lg bg-hub-hover-light dark:bg-hub-hover-dark text-hub-text-primary-light dark:text-hub-text-primary-dark`}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`${desktopOnly.display.hidden} fixed inset-0 z-50 bg-white dark:bg-hub-background`}
            >
              <div className="p-6 pt-20 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3
                      className={`font-monument text-hub-text-primary-light dark:text-hub-text-primary-dark ${mobileOnly.text["3xl"]} ${desktopOnly.text["4xl"]}`}>
                      {t('loyahubDocs.title')}
                    </h3>
                    <p
                      className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark font-diatype mt-2 ${mobileOnly.text.xl} ${desktopOnly.text.xl}`}>
                      {t('loyahubDocs.subtitle')}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-hub-hover-light dark:bg-hub-hover-dark text-hub-text-primary-light dark:text-hub-text-primary-dark"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.button>
                </div>

                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-hub-hover-light dark:bg-hub-hover-dark border border-hub-border-light dark:border-hub-border-dark text-hub-text-primary-light dark:text-hub-text-primary-dark placeholder-hub-text-secondary-light dark:placeholder-hub-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-hub-primary-light dark:focus:ring-hub-primary-dark"
                  />
                  <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-hub-text-secondary-light dark:text-hub-text-secondary-dark" />
                </div>

                <div className="space-y-4">
                  {filteredItems.map((item, index) => (
                    <NavItemComponent
                      key={`${item.label}-${index}`}
                      item={item}
                      isActive={currentPath === item.href}
                      onMobileMenuToggle={() => setIsMobileMenuOpen(false)}
                      onNavigate={handleNavigation}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-6">
          <AnimatePresence mode="wait">
            {isLoading || isNavLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-64"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hub-primary"></div>
              </motion.div>
            ) : (
              content && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <SectionContent content={content} />

                  <DocPager
                    navigationItems={navigationItems}
                    currentPath={currentPath}
                    onNavigate={handleNavigation}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

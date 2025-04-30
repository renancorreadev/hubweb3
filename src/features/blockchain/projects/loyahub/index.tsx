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
import { Breadcrumbs } from "./components/layout/Breadcrumbs";
import {
  Navigation,
  NavItemComponent,
  NavItem,
} from "./components/layout/Navigation";
import { SectionContent } from "./components/content/SectionContent";
import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";
import { StepByStep } from "./components/content/StepByStep";
import { CodeBlock } from "./components/content/CodeBlock";
import { DocPager } from "./components/layout/DocPager";

// Navigation structure with more detailed topics
const navigationItems: NavItem[] = [
  {
    label: "Getting Started",
    items: [
      { label: "Introduction", href: "/introduction" },
      { label: "Quick Start", href: "/quick-start" },
      { label: "Installation", href: "/installation" },
    ],
  },
  {
    label: "Core Concepts",
    items: [
      { label: "Architecture", href: "/architecture" },
      { label: "Authentication", href: "/authentication" },
      { label: "Security", href: "/security" },
      {
        label: "Smart Contracts",
        items: [
          { label: "Overview", href: "/smart-contracts" },
          { label: "Deployment", href: "/smart-contracts/deployment" },
          { label: "Interaction", href: "/smart-contracts/interaction" },
        ],
      },
    ],
  },
  {
    label: "API Reference",
    items: [
      { label: "REST API", href: "/api-reference/rest" },
      { label: "WebSocket API", href: "/api-reference/websocket" },
      { label: "SDK Reference", href: "/api-reference/sdk" },
    ],
  },
  {
    label: "Guides",
    items: [
      { label: "User Management", href: "/guides/user-management" },
      { label: "Loyalty Programs", href: "/guides/loyalty-programs" },
      { label: "Rewards System", href: "/guides/rewards" },
    ],
  },
];

export function LoyahubPage() {
  const [currentPath, setCurrentPath] = useState("/introduction");
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true);
        const filePath = `src/features/Blockchain/Projects/Loyahub/docs${currentPath}.mdx`;
        const response = await fetch(
          `/api/mdx?path=${encodeURIComponent(filePath)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setContent(data.mdxSource);
      } catch (error) {
        console.error("Error loading content:", error);
        const errorContent = await serialize(
          "# Error\nFailed to load content."
        );
        setContent(errorContent);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [currentPath]);

  // Generate breadcrumb items based on current path
  const breadcrumbItems = [
    { label: "Documentation", href: "/" },
    ...currentPath
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => ({
        label:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: "/" + array.slice(0, index + 1).join("/"),
      })),
  ];

  const filteredItems = navigationItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items?.some((child: NavItem) =>
        child.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-white dark:bg-hub-background transition-colors duration-200">
      {/* Left sidebar navigation - hidden on mobile by default */}
      <div
        className={`${mobileOnly.display.hidden} ${desktopOnly.display.block}`}
      >
        <Navigation
          items={navigationItems}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        {/* Top navigation bar */}
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

        {/* Mobile Menu */}
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
                      className={`font-monument text-hub-text-primary-light dark:text-hub-text-primary-dark ${mobileOnly.text["3xl"]} ${desktopOnly.text["4xl"]}`}
                    >
                      Documentation
                    </h3>
                    <p
                      className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark font-diatype mt-2 ${mobileOnly.text.xl} ${desktopOnly.text.xl}`}
                    >
                      Learn how to integrate Loyahub
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
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content section */}
        <div className="px-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
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
                    previous={{
                      href: "/previous-topic",
                      label: "Composing Multiple Programs",
                    }}
                    next={{ href: "/core-concepts", label: "Core Concepts" }}
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

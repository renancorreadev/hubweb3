import React from 'react';
import Link from 'next/link';
import { NavItem } from './Navigation';

// Extended type for flattened navigation items
interface FlattenedNavItem extends NavItem {
  parentPath?: string;
}

interface DocPagerProps {
  navigationItems: NavItem[];
  currentPath: string;
}

// Helper function to flatten navigation items into a single array while preserving hierarchy
const flattenNavigation = (items: NavItem[], parentPath: string = ''): FlattenedNavItem[] => {
  let flattened: FlattenedNavItem[] = [];
  
  items.forEach(item => {
    if (item.href) {
      // Add current item
      flattened.push({
        ...item,
        parentPath
      });
    }
    
    // If item has children, process them with current item's path as parent
    if (item.items) {
      const childParentPath = item.href || parentPath;
      flattened = flattened.concat(flattenNavigation(item.items, childParentPath));
    }
  });
  
  return flattened;
};


// Helper function to find the next and previous items based on the current path
const findAdjacentItems = (items: NavItem[], currentPath: string): { previous?: NavItem; next?: NavItem } => {
  let allItems: { item: NavItem; index: number }[] = [];
  
  // Function to recursively collect all items with href in order
  const collectItems = (navItems: NavItem[]) => {
    navItems.forEach(item => {
      if (item.href) {
        allItems.push({ item, index: allItems.length });
      }
      if (item.items) {
        collectItems(item.items);
      }
    });
  };

  // Collect all items in order
  collectItems(items);

  // Find current item index
  const currentIndex = allItems.findIndex(({ item }) => item.href === currentPath);

  if (currentIndex === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: currentIndex > 0 ? allItems[currentIndex - 1].item : undefined,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1].item : undefined
  };
};

export const DocPager: React.FC<DocPagerProps> = ({ navigationItems, currentPath }) => {
  const { previous, next } = findAdjacentItems(navigationItems, currentPath);

  return (
    <nav className="mt-16 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {/* Previous */}
      {previous?.href ? (
        <Link
          href={previous.href}
          className="group flex flex-col items-start rounded-2xl border border-hub-border-light dark:border-hub-border-dark px-6 py-5 shadow-md transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/20"
        >
          <span className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark text-base mb-1 flex items-center gap-1">
            <span className="text-lg">&lt;</span> Previous
          </span>
          <span className="text-hub-primary-light dark:text-hub-primary-dark text-xl md:text-2xl font-dsemi transition-colors duration-200">
            {previous.label}
          </span>
          {previous.description && (
            <span className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark text-sm mt-1">
              {previous.description}
            </span>
          )}
        </Link>
      ) : <div />}

      {/* Next */}
      {next?.href ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end rounded-2xl border border-hub-border-light dark:border-hub-border-dark px-6 py-5 shadow-md transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/20"
        >
          <span className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark text-base mb-1 flex items-center gap-1">
            Next <span className="text-lg">&gt;</span>
          </span>
          <span className="text-hub-primary-light dark:text-hub-primary-dark text-xl md:text-2xl font-dsemi transition-colors duration-200">
            {next.label}
          </span>
          {next.description && (
            <span className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark text-sm mt-1">
              {next.description}
            </span>
          )}
        </Link>
      ) : <div />}
    </nav>
  );
}; 
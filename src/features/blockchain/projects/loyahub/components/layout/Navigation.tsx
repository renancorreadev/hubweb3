import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  BeakerIcon,
  CommandLineIcon,
  BookOpenIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

type HeroIcon = React.ComponentType<{ className?: string }>;

// Map of icon names to actual components
const ICON_COMPONENTS: { [key: string]: HeroIcon } = {
  HomeIcon,
  BeakerIcon,
  CommandLineIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
};

export interface NavItem {
  label: string;
  href?: string;
  items?: NavItem[];
  icon?: string;
  description?: string;
  order?: number;
}

interface NavigationProps {
  items: NavItem[];
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const NavItemComponent: React.FC<{
  item: NavItem;
  level?: number;
  isActive?: boolean;
  isParentActive?: boolean;
  onMobileMenuToggle?: () => void;
  onNavigate?: (path: string) => void;
}> = ({
  item,
  level = 0,
  isActive = false,
  isParentActive = false,
  onMobileMenuToggle,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(isActive || isParentActive);
  const hasChildren = item.items && item.items.length > 0;
  const pathname = usePathname();

  useEffect(() => {
    if (isActive || isParentActive) {
      setIsOpen(true);
    }
  }, [isActive, isParentActive]);

  // Get the actual icon component from the icon name
  const IconComponent = item.icon ? ICON_COMPONENTS[item.icon] : undefined;

  const handleClick = () => {
    if (item.href) {
      onNavigate?.(item.href);
      onMobileMenuToggle?.();
    }
  };

  return (
    <motion.div
      className={`ml-${level * 4}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: level * 0.05 }}
    >
      <div className="flex items-center py-3 group">
        {hasChildren && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg hover:bg-hub-hover-light dark:hover:bg-hub-hover-dark transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon className="h-5 w-5 text-hub-text-secondary-light dark:text-hub-text-secondary-dark" />
            </motion.div>
          </motion.button>
        )}
        {item.href ? (
          <button
            onClick={handleClick}
            className={`flex items-center space-x-3 text-hub-text-primary-light dark:text-hub-text-primary-dark hover:text-hub-primary-light dark:hover:text-hub-primary-dark transition-all duration-200 ml-2 ${mobileOnly.text.xl} ${desktopOnly.text.xl} font-dsemi ${
              isActive ? 'text-hub-primary-light dark:text-hub-primary-dark' : ''
            }`}
          >
            {IconComponent && (
              <span className="group-hover:scale-110 transition-transform duration-200">
                <IconComponent className="h-6 w-6" />
              </span>
            )}
            <span>{item.label}</span>
          </button>
        ) : (
          <span className={`flex items-center space-x-3 text-hub-text-secondary-light dark:text-hub-text-secondary-dark font-dsemi ml-2 ${mobileOnly.text.xl} ${desktopOnly.text.xl}`}>
            {IconComponent && (
              <span>
                <IconComponent className="h-6 w-6" />
              </span>
            )}
            <span>{item.label}</span>
          </span>
        )}
      </div>
      {item.description && (
        <p className={`ml-6 text-hub-text-secondary-light dark:text-hub-text-secondary-dark ${mobileOnly.text.lg} ${desktopOnly.text.lg} font-diatype`}>
          {item.description}
        </p>
      )}
      <AnimatePresence>
        {hasChildren && isOpen && item.items && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 overflow-hidden border-l border-hub-border-light dark:border-hub-border-dark"
          >
            {item.items.map((child, index) => (
              <NavItemComponent
                key={`${child.label}-${index}`}
                item={child}
                level={level + 1}
                isActive={pathname === child.href}
                isParentActive={isActive}
                onMobileMenuToggle={onMobileMenuToggle}
                onNavigate={onNavigate}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Navigation: React.FC<NavigationProps> = ({
  items,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onNavigate,
  currentPath
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items?.some((child) =>
        child.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <nav className={`${desktopOnly.display.block} w-80 bg-white dark:bg-hub-background border-r border-hub-border-light dark:border-hub-border-dark h-full overflow-y-auto`}>
      <div className="p-6 space-y-4">
        <div className="mb-8">
          <h3 className={`font-monument text-hub-text-primary-light dark:text-hub-text-primary-dark ${mobileOnly.text["3xl"]} ${desktopOnly.text["4xl"]}`}>
            Documentation
          </h3>
          <p className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark font-diatype mt-2 ${mobileOnly.text.xl} ${desktopOnly.text.xl}`}>
            Learn how to integrate Loyahub
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-hub-hover-light dark:bg-hub-hover-dark border border-hub-border-light dark:border-hub-border-dark text-hub-text-primary-light dark:text-hub-text-primary-dark placeholder-hub-text-secondary-light dark:placeholder-hub-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-hub-primary-light dark:focus:ring-hub-primary-dark"
          />
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-hub-text-secondary-light dark:text-hub-text-secondary-dark" />
        </div>

        <div className="space-y-2">
          {filteredItems.map((item, index) => (
            <NavItemComponent
              key={`${item.label}-${index}`}
              item={item}
              isActive={currentPath === item.href}
              onMobileMenuToggle={onMobileMenuToggle}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

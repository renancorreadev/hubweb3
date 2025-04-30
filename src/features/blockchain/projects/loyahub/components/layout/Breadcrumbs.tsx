import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { mobileOnly, desktopOnly } from '@/shared/configs/responsive';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-4 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <ChevronRightIcon className="h-6 w-6 text-hub-text-secondary-light dark:text-hub-text-secondary-dark" />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <Link 
              href={item.href}
              className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark hover:text-hub-primary-light dark:hover:text-hub-primary-dark transition-colors duration-200 font-diatype ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}
            >
              {item.label}
            </Link>
          </motion.div>
        </React.Fragment>
      ))}
    </nav>
  );
}; 
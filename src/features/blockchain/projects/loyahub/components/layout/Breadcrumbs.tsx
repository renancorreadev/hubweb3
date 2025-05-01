import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';


interface BreadcrumbItem {
  label: string;
  href: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-4 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={`${item.href}-${index}`}>
          {index > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon className="h-5 w-5 text-hub-text-secondary-light dark:text-hub-text-secondary-dark" />
            </motion.div>
          )}
          <motion.button
            onClick={item.onClick}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark hover:text-hub-primary-light dark:hover:text-hub-primary-dark transition-all duration-200 ${
              index === items.length - 1
                ? "text-hub-text-primary-light dark:text-hub-text-primary-dark font-medium"
                : ""
            }`}
          >
            {item.label}
          </motion.button>
        </React.Fragment>
      ))}
    </nav>
  );
}; 
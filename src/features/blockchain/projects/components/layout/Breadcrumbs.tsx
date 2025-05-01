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
  const showEllipsis = items.length > 2;

  return (
    <nav className={`flex items-center space-x-1 ${className}`}>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isMiddle = !isFirst && !isLast;

        return (
          <React.Fragment key={`${item.href}-${index}`}>
            {!isFirst && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`${showEllipsis && isMiddle ? 'hidden md:flex' : 'flex'} items-center`}
              >
                <ChevronRightIcon className="h-4 w-4 text-hub-text-secondary-light dark:text-hub-text-secondary-dark" />
              </motion.div>
            )}

            {isFirst && showEllipsis && (
              <div className="flex items-center space-x-1 md:hidden">
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRightIcon className="h-4 w-4 text-hub-text-secondary-light dark:text-hub-text-secondary-dark" />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark"
                >
                  ...
                </motion.span>
              </div>
            )}

            <motion.button
              onClick={item.onClick}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`
                text-hub-text-secondary-light dark:text-hub-text-secondary-dark hover:text-hub-primary-light dark:hover:text-hub-primary-dark transition-all duration-200 whitespace-nowrap
                ${isLast ? "text-hub-text-primary-light dark:text-hub-text-primary-dark font-medium" : ""}
                ${isMiddle && showEllipsis ? 'hidden md:inline-block' : 'inline-block'}
              `}
            >
              {item.label}
            </motion.button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}; 
"use client";

import Link from "next/link";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { motion } from "framer-motion";

interface SubMenuItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  isSelected?: boolean;
}

export function SubMenuItem({ href, label, icon, description, isSelected = false }: SubMenuItemProps) {
  const { isDark, getColor, getTextColor } = useThemeColors();

  const itemVariants = {
    closed: { 
      opacity: 0,
      x: -10,
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div variants={itemVariants}>
      <motion.div
        whileHover={{
          backgroundColor: isDark ? getColor('hover') : '#F5F5F5',
          transition: { duration: 0.2 }
        }}
        className="rounded-lg"
        style={{
          backgroundColor: isDark ? 'transparent' : isSelected ? '#E8F5E9' : 'transparent',
        }}
      >
        <Link
          href={href}
          className={`group flex items-start gap-4 p-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] 
            ${mobileOnly.text.base} ${desktopOnly.text.base}`}
          style={{
            backgroundColor: 'transparent',
            color: isDark ? '#ffffff' : isSelected ? '#4CAF50' : '#1A1A1A',
          }}
        >
          {icon && (
            <motion.span 
              className="flex-shrink-0 transition-transform duration-200 mt-0.5"
              style={{
                color: isDark ? getColor('primary') : '#0EA66B',
              }}
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.span>
          )}
          <div className="flex flex-col gap-1">
            <motion.span 
              className={`font-medium transition-colors duration-200 ${mobileOnly.text.base} ${desktopOnly.text["xl"]}`}
              style={{
                color: isDark ? '#ffffff' : '#1A1A1A',
              }}
              whileHover={{
                color: isDark ? getColor('primary') : '#4CAF50',
                transition: { duration: 0.2 }
              }}
            >
              {label}
            </motion.span>
            {description && (
              <motion.span 
                className={`abcm text-sm leading-relaxed transition-opacity duration-200 ${mobileOnly.text.sm} ${desktopOnly.text.base}`}
                style={{
                  color: isDark ? '#ffffff' : '#1A1A1A',
                }}
                whileHover={{
                  opacity: 0.9,
                  transition: { duration: 0.2 }
                }}
              >
                {description}
              </motion.span>
            )}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
} 
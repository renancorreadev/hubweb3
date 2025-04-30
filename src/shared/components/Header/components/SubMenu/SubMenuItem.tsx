"use client";

import Link from "next/link";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SubMenuItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  isSelected?: boolean;
  children?: React.ReactNode;
  level?: number;
}

export function SubMenuItem({ 
  href, 
  label, 
  icon, 
  description, 
  isSelected = false,
  children,
  level = 0
}: SubMenuItemProps) {
  const { isDark, getColor, getTextColor } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const childrenVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.2
        },
        opacity: {
          duration: 0.1
        }
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.2
        },
        opacity: {
          duration: 0.1,
          delay: 0.1
        }
      }
    }
  };

  const hoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const hasChildren = Boolean(children);
  const paddingLeft = `${level * 1.5}rem`;

  return (
    <motion.div 
      variants={itemVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        variants={hoverVariants}
        className="rounded-lg"
        style={{
          backgroundColor: isDark 
            ? isSelected 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'transparent'
            : isSelected 
              ? '#E8F5E9' 
              : 'transparent',
        }}
      >
        <div
          className={`group flex items-start gap-4 p-4 rounded-lg transition-all duration-200 transform
            ${mobileOnly.text.base} ${desktopOnly.text.base}`}
          style={{
            backgroundColor: 'transparent',
            color: isDark ? '#ffffff' : isSelected ? '#4CAF50' : '#1A1A1A',
            paddingLeft,
          }}
        >
          {icon && (
            <motion.span 
              className="flex-shrink-0 transition-transform duration-200 mt-0.5"
              style={{
                color: isDark ? getColor('primary') : '#0EA66B',
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut"
              }}
            >
              {icon}
            </motion.span>
          )}
          <div className="flex flex-col gap-1 flex-grow">
            <div className="flex items-center justify-between">
              <Link href={href} className="flex-grow">
                <motion.span 
                  className={`font-medium transition-colors duration-200 ${mobileOnly.text.base} ${desktopOnly.text["xl"]}`}
                  style={{
                    color: isDark ? '#ffffff' : '#1A1A1A',
                  }}
                  animate={{
                    color: isHovered 
                      ? isDark 
                        ? getColor('primary') 
                        : '#4CAF50'
                      : isDark 
                        ? '#ffffff' 
                        : '#1A1A1A'
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                >
                  {label}
                </motion.span>
              </Link>
              {hasChildren && (
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  animate={{ 
                    rotate: isOpen ? 180 : 0,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                >
                  <ChevronDown size={16} />
                </motion.button>
              )}
            </div>
            {description && (
              <motion.span 
                className={`text-sm leading-relaxed transition-opacity duration-200 ${mobileOnly.text.sm} ${desktopOnly.text.base}`}
                style={{
                  color: isDark ? '#ffffff' : '#1A1A1A',
                }}
                animate={{
                  opacity: isHovered ? 0.9 : 0.7
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut"
                }}
              >
                {description}
              </motion.span>
            )}
          </div>
        </div>
        <AnimatePresence>
          {isOpen && children && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={childrenVariants}
              className="overflow-hidden"
              style={{
                borderLeft: isDark 
                  ? '1px solid rgba(255, 255, 255, 0.1)' 
                  : '1px solid rgba(0, 0, 0, 0.1)',
                marginLeft: '1.5rem'
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} 
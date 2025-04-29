"use client";

import { ReactNode } from "react";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

interface SubMenuContentProps {
  isOpen: boolean;
  children: ReactNode;
}

export function SubMenuContent({ isOpen, children }: SubMenuContentProps) {
  const { isDark, getColor } = useThemeColors();

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className={`${mobileOnly.position.absolute} ${desktopOnly.position.absolute} 
            ${mobileOnly.display.block} ${desktopOnly.display.block} 
            ${mobileOnly.width.full} ${desktopOnly.width.full} 
            ${mobileOnly.margin.mt2} ${desktopOnly.margin.mt2} 
            ${mobileOnly.padding.p4} ${desktopOnly.padding.p4} 
            rounded-lg shadow-lg min-w-[280px] max-w-[320px]`}
          style={{
            backgroundColor: isDark ? getColor('background') : '#ffffff',
            border: `1px solid ${isDark ? getColor('border') : '#E5E5E5'}`,
            transformOrigin: "top center",
          }}
        >
          <motion.div 
            className="flex flex-col gap-2"
            variants={{
              closed: { opacity: 0 },
              open: { opacity: 1 }
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
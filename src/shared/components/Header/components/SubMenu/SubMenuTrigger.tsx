"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { motion } from "framer-motion";

interface SubMenuTriggerProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  href: string;
}

export function SubMenuTrigger({ label, isOpen, onClick, icon, href }: SubMenuTriggerProps) {
  const { isDark, getColor, getTextColor } = useThemeColors();

  const triggerVariants = {
    closed: { 
      rotate: 0,
      transition: { duration: 0.2 }
    },
    open: { 
      rotate: 180,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={`flex items-center gap-2 transition-colors duration-200 ${
          mobileOnly.text.lg
        } ${desktopOnly.text.base}`}
        style={{
          color: isDark ? '#ffffff' : '#1A1A1A',
        }}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span 
          className={`${desktopOnly.text["2xl"]} ${mobileOnly.text.base}`}
          style={{
            color: isDark ? '#ffffff' : '#1A1A1A',
          }}
        >
          {label}
        </span>
      </Link>
      <motion.button
        onClick={onClick}
        className="p-1 rounded-full transition-colors duration-200"
        style={{
          backgroundColor: isDark ? getColor('hover') : '#F5F5F5',
        }}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: isDark ? getColor('primary') : '#0EA66B',
        }}
        whileTap={{ scale: 0.9 }}
        aria-expanded={isOpen}
      >
        <motion.div
          variants={triggerVariants}
          animate={isOpen ? "open" : "closed"}
        >
          <ChevronDown
            size={24}
            style={{
              color: isDark ? '#ffffff' : '#1A1A1A',
            }}
          />
        </motion.div>
      </motion.button>
    </motion.div>
  );
} 
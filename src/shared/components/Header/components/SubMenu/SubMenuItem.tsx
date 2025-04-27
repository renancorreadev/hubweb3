"use client";

import Link from "next/link";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

interface SubMenuItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

export function SubMenuItem({ href, label, icon, description }: SubMenuItemProps) {
  return (
    <Link
      href={href}
      className={`group flex items-start gap-4 p-4 rounded-lg hover:bg-[#1a2a1a] dark:hover:bg-[#f0f9f0] 
        transition-all duration-200 transform hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] 
        ${mobileOnly.text.base} ${desktopOnly.text.base}`}
    >
      {icon && (
        <span className="flex-shrink-0 text-hub-primary group-hover:scale-110 transition-transform duration-200 mt-0.5">
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-1">
        <span className="font-medium group-hover:text-hub-primary transition-colors duration-200 dark:group-hover:text-hub-secondary">
          {label}
        </span>
        {description && (
          <span className="text-sm text-hub-text-secondary leading-relaxed group-hover:opacity-90 dark:group-hover:text-black transition-opacity duration-200">
            {description}
          </span>
        )}
      </div>
    </Link>
  );
} 
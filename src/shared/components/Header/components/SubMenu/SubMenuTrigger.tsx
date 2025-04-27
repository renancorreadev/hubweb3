"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

interface SubMenuTriggerProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  href: string;
}

export function SubMenuTrigger({ label, isOpen, onClick, icon, href }: SubMenuTriggerProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={href}
        className={`flex items-center gap-2 hover:text-hub-primary transition-colors duration-200 ${
          mobileOnly.text.lg
        } ${desktopOnly.text.base}`}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className={`${desktopOnly.text["2xl"]} ${mobileOnly.text.base}`}>{label}</span>
      </Link>
      <button
        onClick={onClick}
        className="p-1 hover:bg-hub-background-secondary rounded-full transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <ChevronDown
          size={24}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
} 
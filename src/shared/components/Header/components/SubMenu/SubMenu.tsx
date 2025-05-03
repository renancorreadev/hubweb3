"use client";

import { useState, useRef, useEffect } from "react";
import { SubMenuTrigger } from "./SubMenuTrigger";
import { SubMenuContent } from "./SubMenuContent";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import React from "react";

interface SubMenuProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  href: string;
}

export function SubMenu({ label, icon, children, href }: SubMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);


  const isSingleItem = React.Children.count(children) === 1;

  useEffect(() => {
    if (isSingleItem) return; 

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSingleItem]);

  const handleToggle = () => {
    if (isSingleItem) return;
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={menuRef}
      className={`${mobileOnly.display.block} ${desktopOnly.display.block}`}
    >
      <div className="relative">
        <SubMenuTrigger
          label={label}
          isOpen={isOpen}
          onClick={handleToggle}
          icon={icon}
          href={href}
          showDropdown={!isSingleItem}
        />
        
        {/* Desktop */}
        <div className="hidden lg:block absolute left-0 top-full pt-2 min-w-[280px]">
          {isOpen && <SubMenuContent isOpen={isOpen}>{children}</SubMenuContent>}
        </div>

        {/* Mobile Accordion */}
        <div
          ref={contentRef}
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`${mobileOnly.padding.py2} ${mobileOnly.padding.px4}`}>
            <div className="border-l-2 border-hub-primary pl-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
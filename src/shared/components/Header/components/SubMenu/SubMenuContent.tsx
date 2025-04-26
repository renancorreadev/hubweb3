"use client";

import { ReactNode } from "react";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

interface SubMenuContentProps {
  isOpen: boolean;
  children: ReactNode;
}

export function SubMenuContent({ isOpen, children }: SubMenuContentProps) {
  return (
    <div
      className={`${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
      } transition-all duration-200 ease-out ${
        mobileOnly.position.absolute
      } ${desktopOnly.position.absolute} ${
        mobileOnly.display.block
      } ${desktopOnly.display.block} ${
        mobileOnly.width.full
      } ${desktopOnly.width.full} ${
        mobileOnly.margin.mt2
      } ${desktopOnly.margin.mt2} ${
        mobileOnly.padding.p4
      } ${desktopOnly.padding.p4} bg-hub-background rounded-lg shadow-lg min-w-[280px] max-w-[320px]`}
      style={{
        transformOrigin: "top center",
      }}
    >
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
} 
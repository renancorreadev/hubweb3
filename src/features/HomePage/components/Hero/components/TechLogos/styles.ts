import { mobileOnly, tabletOnly, desktopOnly } from "@/shared/configs/responsive";

export const techLogosStyles = {
  container: `
    w-full 
    ${mobileOnly.margin.mt12} 
    ${tabletOnly.margin.mt16} 
    ${desktopOnly.margin.mt24}
  `,

  title: `
    text-xs 
    text-hub-primary 
    tracking-wider 
    uppercase 
    font-dsemi
    text-center
  `,

  logosWrapper: `
    flex 
    flex-wrap 
    justify-center 
    ${mobileOnly.gap.gap4}
    ${tabletOnly.gap.gap6}
    ${desktopOnly.gap.gap8}
    ${mobileOnly.margin.mt8}
    ${tabletOnly.margin.mt12}
  `,

  logoItem: `
    w-20 
    h-20 
    flex 
    items-center 
    justify-center 
    bg-transparent
  `,

  logoImage: `
    relative 
    w-16 
    h-16 
    object-contain 
    opacity-80 
    hover:opacity-100 
    transition-transform 
    duration-300
  `,
};

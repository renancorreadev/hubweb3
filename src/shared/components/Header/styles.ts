import { mobileOnly, tabletOnly, desktopOnly } from "@/shared/configs/responsive";

export const headerStyles = {
  container: `
    sticky 
    top-0 
    z-50 
    w-full 
    bg-hub-background/80 
    backdrop-blur-md 
    border-b 
    border-white/10
    ${mobileOnly.padding.p2}
  `,

  wrapper: `
    w-full 
    max-w-[1440px] 
    mx-auto 
    flex 
    items-center 
    justify-between 
    ${mobileOnly.padding.px4}
    ${tabletOnly.padding.px8}
    ${mobileOnly.height.h16}
    ${desktopOnly.height.h20}
  `,

  logo: `
    flex 
    items-center
  `,

  mobileMenuButton: `
    lg:hidden 
    flex 
    flex-col 
    gap-1
  `,

  menuIconLine: `
    w-6 
    h-0.5 
    bg-white
    transition-all
  `,

  navDesktop: `
    hidden 
    lg:flex 
    items-center 
    gap-6
  `,

  navMobile: `
    lg:hidden 
    flex 
    flex-col 
    gap-4 
    mt-4
    px-4
    pb-4
  `,

  themeToggle: `
    ml-3 
    hover:scale-110 
    transition-transform
    md:flex hidden gap-2 items-center
  `,
};

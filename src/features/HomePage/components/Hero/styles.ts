// src/features/HomePage/components/Hero/styles.ts

import { mobileOnly, tabletOnly, desktopOnly } from "@/shared/configs/responsive";

export const heroStyles = {
  section: `
    relative
    flex
    flex-col
    items-center
    ${desktopOnly.flex.center}
    ${mobileOnly.flex.center}
    text-center
    min-h-[85vh]
    px-4
    sm:px-8
    bg-gradient-to-b
    dark:from-black dark:via-hub-background-dark dark:to-black
    overflow-hidden
    transition-colors
    duration-300
  `,

  backgroundImage: `
    absolute
    inset-0
    w-full
    h-full
    pointer-events-none
    -z-10
  `,

  image: `
    object-cover
    object-center
    dark:opacity-40
    opacity-80
    saturate-150
    transition-all
    duration-300
    w-full
    h-full
  `,

  content: `
    relative
    flex
    flex-col
    items-center
    justify-center
    w-full
    text-hub-text-primary-light
    dark:text-hub-text-primary-dark
    ${mobileOnly.padding.p4} 
    ${tabletOnly.padding.p8} 
    ${desktopOnly.padding.p12}
    z-10
  `,

  buttonsContainer: `
    mt-10
    flex
    flex-col
    sm:flex-row
    flex-wrap
    justify-center
    gap-4
  `,
};

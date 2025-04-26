// src/features/HomePage/components/Hero/styles.ts

import { mobileOnly, tabletOnly, desktopOnly } from "@/shared/configs/responsive";

export const heroStyles = {
  section: `
    relative
    flex
    flex-col
    items-center
    justify-center
    text-center
    min-h-[90vh]
    px-4
    sm:px-8
    py-20
    bg-gradient-to-b
    from-black
    via-hub-background
    to-black
    overflow-hidden
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
    opacity-40
    saturate-150
  `,

  content: `
    relative
    flex
    flex-col
    items-center
    justify-center
    w-full
    ${mobileOnly.padding.p4} 
    ${tabletOnly.padding.p8} 
    ${desktopOnly.padding.p12}
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

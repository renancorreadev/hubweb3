import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";

const descriptionStyles = {
  p: `mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/80 font-diatype leading-relaxed ${desktopOnly.text["2xl"]} ${mobileOnly.text["sm"]}` 
}

export function HeroDescription() {
    return (
      <p className={descriptionStyles.p}>
        Bring blockchain to the people. HubWeb3 supports experiences for power users, new consumers, and everyone in between.
      </p>
    );
  }
  

import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";

const titleStyles  = {
  h1: `text-white font-monument leading-tight tracking-tight ${desktopOnly.text["8xl"]} ${mobileOnly.text["5xl"]}` 
}

export function HeroTitle() {
    return (
      <h1 className={titleStyles.h1}>
        Powerful for developers.<br />
        Fast for everyone.
      </h1>
    );
  }
  
"use client";

import Image from "next/image";
import { HeroTitle } from "./components/HeroTitle";
import { HeroDescription } from "./components/HeroDescription";
import { PrimaryButton } from "./components/PrimaryButton";
import { SecondaryButton } from "./components/SecondaryButton";
import { TechLogos } from "./components/TechLogos";
import { heroStyles } from "./styles";
import { RenderContainer } from "@/shared/components/RenderContainer";

export function Hero() {
  return (
    <RenderContainer>
      <section className={heroStyles.section}>
        <div className={heroStyles.backgroundImage}>
          <Image
            src="/images/hero/hero.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
            className={heroStyles.image}
            sizes="100vw"
          />
        </div>

        <div className={heroStyles.content}>
          <HeroTitle />
          <HeroDescription />

          <div className={heroStyles.buttonsContainer}>
            <PrimaryButton href="#start">Start Building</PrimaryButton>
            <SecondaryButton href="#resources">Resources</SecondaryButton>
          </div>

          <TechLogos />
        </div>
      </section>
    </RenderContainer>
  );
}

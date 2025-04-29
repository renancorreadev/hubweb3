"use client";

import Image from "next/image";

import { PrimaryButton } from "./components/PrimaryButton";
import { SecondaryButton } from "./components/SecondaryButton";
import { TechLogos } from "./components/TechLogos";
import { heroStyles } from "./styles";
import { RenderContainer } from "@/shared/components/RenderContainer";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";

export function Hero() {
  const { t } = useTranslation();

  const styles = {
    h1: `text-white font-monument leading-tight tracking-tight ${desktopOnly.text["8xl"]} ${mobileOnly.text["5xl"]}`,
    p: `mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/80 font-diatype leading-relaxed ${desktopOnly.text["2xl"]} ${mobileOnly.text["sm"]}`,
  };

  return (
    <RenderContainer>
      <section className={heroStyles.section}>
        {/* Background Pattern */}

        <Image
          src="/images/hero/hero.svg"
          alt="Background Pattern"
          fill
          priority
          quality={100}
          className="object-cover object-center opacity-40 dark:opacity-80 transition-opacity duration-300 pointer-events-none"
        />

        <div className={heroStyles.content}>
          <h1 className={styles.h1}>
            {t('hero.title').split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('hero.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className={styles.p}>
            {t('hero.description')}
          </p>

          <div className={heroStyles.buttonsContainer}>
            <PrimaryButton href="#start">
              {t("hero.startBuilding")}
            </PrimaryButton>
            <SecondaryButton href="#resources">
              {t("hero.resources")}
            </SecondaryButton>
          </div>

          <TechLogos />
        </div>
      </section>
    </RenderContainer>
  );
}

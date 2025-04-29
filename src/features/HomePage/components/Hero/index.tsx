"use client";

import Image from "next/image";
import { PrimaryButton } from "./components/PrimaryButton";
import { SecondaryButton } from "./components/SecondaryButton";
import { TechLogos } from "./components/TechLogos";
import { heroStyles } from "./styles";
import { RenderContainer } from "@/shared/components/RenderContainer";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const styles = {
    h1: `text-white font-monument leading-tight tracking-tight ${desktopOnly.text["8xl"]} ${mobileOnly.text["5xl"]}`,
    p: `mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/80 font-diatype leading-relaxed ${desktopOnly.text["2xl"]} ${mobileOnly.text["sm"]}`,
  };

  return (
    <RenderContainer>
      <section ref={containerRef} className={`${heroStyles.section} relative overflow-hidden`}>
        {/* Background Pattern with Parallax */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero/hero.svg"
            alt="Background Pattern"
            fill
            priority
            quality={100}
            className="object-cover object-center opacity-40 dark:opacity-80 transition-opacity duration-300 pointer-events-none"
          />
        </motion.div>

        <div className={heroStyles.content}>
          <motion.h1 
            className={styles.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('hero.title').split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('hero.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.p 
            className={styles.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div 
            className={heroStyles.buttonsContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PrimaryButton href="#start">
              {t("hero.startBuilding")}
            </PrimaryButton>
            <SecondaryButton href="#resources">
              {t("hero.resources")}
            </SecondaryButton>
          </motion.div>

          <motion.div
            className="mt-0 px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TechLogos />
          </motion.div>
        </div>
      </section>
    </RenderContainer>
  );
}

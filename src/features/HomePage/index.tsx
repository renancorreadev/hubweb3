"use client";

import React from "react";
import { Hero } from "./components/Hero";
import { RenderContainer } from "@/shared/components/RenderContainer";
import { HeroSlider } from "@/components/HeroSlider";
import { desktopOnly } from "@/shared/configs/responsive";
import { BlockchainTips } from "@/features/homepage/components/BlockchainTips";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function HomePage() {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: t('projects.chainlink.title'),
      subtitle: t('projects.chainlink.subtitle'),
      imageUrl: "/images/sliders/chainlink.jpg",
      linkUrl: "https://chainlink.com",
    },
    {
      id: 2,
      title: t('projects.money.title'),
      subtitle: t('projects.money.subtitle'),
      imageUrl: "/images/sliders/money.jpg",
      linkUrl: "https://money.com",
    },
    {
      id: 3,
      title: t('projects.token.title'),
      subtitle: t('projects.token.subtitle'),
      imageUrl: "/images/sliders/token.png",
      linkUrl: "https://token.com",
    },
  ];

  return (
    <RenderContainer>
      <Hero />
      {/* Slider de projetos */}
      <HeroSlider
        projects={projects}
        className={desktopOnly.padding.p6}
        imageRadius={24}
        textContainerRadius={16}
        showButton={false}
      />
      {/* Bloco de dicas de blockchain */}
      {/* <BlockchainTips /> */}
    </RenderContainer>
  );
}

import React from "react";
import { Hero } from "./components/Hero";
import { RenderContainer } from "@/shared/components/RenderContainer";
import { HeroSlider } from "@/components/HeroSlider";
import { desktopOnly } from "@/shared/configs/responsive";
import { BlockchainTips } from "@/features/HomePage/components/BlockchainTips";

const projects = [
  {
    id: 1,
    title: "Chainlink",
    subtitle: "The leading oracle network for blockchain.",
    imageUrl: "/images/sliders/chainlink.jpg",
    linkUrl: "https://chainlink.com",
  },
  {
    id: 2,
    title: "Money",
    subtitle: "The leading oracle network for blockchain.",
    imageUrl: "/images/sliders/money.jpg",
    linkUrl: "https://money.com",
  },
  {
    id: 3,
    title: "Token",
    subtitle: "The leading oracle network for blockchain.",
    imageUrl: "/images/sliders/token.png",
    linkUrl: "https://token.com",
  },
];

export function HomePage() {
  return (
    <RenderContainer>
      <Hero />
      {/* Slider de projetos */}
      <HeroSlider
        projects={projects}
        className={desktopOnly.padding.p6}
        imageRadius={24}
        textContainerRadius={16}
        showButton={true}
        buttonText="See Now"
      />
      {/* Bloco de dicas de blockchain */}
     <BlockchainTips /> 

    </RenderContainer>
  );
}

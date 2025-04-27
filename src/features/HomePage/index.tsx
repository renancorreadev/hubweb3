import React from "react";
import { Hero } from "./components/Hero";
import { RenderContainer } from "@/shared/components/RenderContainer";
import { HeroSlider } from "@/components/HeroSlider";
import { desktopOnly } from "@/styles/responsive-classes";

const projects = [
  {
    id: 1,
    title: "Chainlink",
    subtitle: "The leading oracle network for blockchain.", 
    imageUrl: "/images/sliders/chainlink.jpg",
  },
  {
    id: 2,
    title: "Money",
    subtitle: "The leading oracle network for blockchain.",
    imageUrl: "/images/sliders/money.jpg",
  },
  {
    id: 3,
    title: "Token",
    subtitle: "The leading oracle network for blockchain.",
    imageUrl: "/images/sliders/token.png",
  },
];

export function HomePage() {
  return (
    <RenderContainer>
      <Hero />
      {/* Slider de projetos */}
      <HeroSlider projects={projects} className={desktopOnly.padding.p6} imageRadius={24} textContainerRadius={16} />
    </RenderContainer>
  );
}
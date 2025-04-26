import React from "react";
import { Hero } from "./components/Hero";
import { RenderContainer } from "@/shared/components/RenderContainer";


export function HomePage() {
  return (
    <RenderContainer>
      <Hero />
    </RenderContainer>
  );
}
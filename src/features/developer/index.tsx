"use client";

import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { ProjectSlider } from "./components/ProjectSlider";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

export function DeveloperPage() {
  const { isDark } = useThemeColors();

  return (
    <div className={isDark ? "bg-black" : "bg-white"}>
      <Hero />
      <Skills />
      <ProjectSlider />
      <Projects />
      <Experience />
    </div>
  );
}
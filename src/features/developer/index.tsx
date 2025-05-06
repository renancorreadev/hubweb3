"use client";

import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { ProjectSlider } from "./components/ProjectSlider";
import { Profile } from "./components/Profile";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

export function DeveloperPage() {
  const { isDark } = useThemeColors();

  return (
    <div style={{ backgroundColor: isDark ? "#000000" : "#FFFFFF" }}>
      <Hero />
      <Profile />
      <Skills />
      <ProjectSlider />
      <Projects />
      <Experience />
    </div>
  );
}
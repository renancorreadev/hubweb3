"use client";

import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Profile } from "./components/Profile";
import dynamic from "next/dynamic";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

const ProjectSlider = dynamic(() => import("./components/ProjectSlider").then(mod => mod.ProjectSlider), { ssr: false, loading: () => <div>Carregando projetos...</div> });
const Projects = dynamic(() => import("./components/Projects").then(mod => mod.Projects), { ssr: false, loading: () => <div>Carregando lista de projetos...</div> });
const Experience = dynamic(() => import("./components/Experience").then(mod => mod.Experience), { ssr: false, loading: () => <div>Carregando experiências...</div> });

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
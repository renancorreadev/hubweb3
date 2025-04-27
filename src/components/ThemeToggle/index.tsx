"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-8 h-8" />
    ); // Evita hydration error — reserva o espaço certinho do botão
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 p-2 rounded-full 
        border transition-all duration-300 ease-in-out
        dark:border-hub-border-dark border-hub-border-light
        hover:bg-hub-hover-light dark:hover:bg-hub-hover-dark
        hover:border-hub-primary-light dark:hover:border-hub-primary-dark
        dark:text-hub-text-primary-dark text-hub-text-primary-light"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-hub-primary-dark" />
      ) : (
        <Moon size={20} className="text-hub-primary-light" />
      )}
    </button>
  );
}

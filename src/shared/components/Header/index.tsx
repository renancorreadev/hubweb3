"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { InkeepSearchBar } from "@/shared/components/Header/components/SearchBar";
import { DevelopersNav } from "@/shared/components/Header/components/DevelopersNav";
import { HeaderList } from "@/shared/components/Header/components/HeaderList";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isThemePage = true; // Ajuste se quiser condicionar

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-hub-background/80 backdrop-blur-md border-b border-white/1 p-2">
        <div className="w-full max-w-[1440px] mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="HubWeb3">
            <Image
              src="/logos/hub.png"
              alt="HubWeb3"
              width={50}
              height={30}
              priority
            />
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
          </button>

          {/* Nav items */}
          <div className={`lg:flex items-center gap-6 hidden`}>
            <HeaderList />
            <InkeepSearchBar />
            {isMounted && isThemePage && (
              <button
                onClick={toggleTheme}
                className="ml-3 hover:scale-110 transition-transform "
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden px-4 pb-4">
            <HeaderList />
            <div className="mt-4 flex justify-between items-center">
              <InkeepSearchBar />
              {isMounted && isThemePage && (
                <button
                  onClick={toggleTheme}
                  className="ml-3 hover:scale-110 transition-transform"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* DevelopersNav */}
      {(pathname.includes("/developers") || pathname.includes("/docs")) && (
        <DevelopersNav />
      )}
    </>
  );
}

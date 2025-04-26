"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { InkeepSearchBar } from "@/shared/components/Header/components/SearchBar";
import { DevelopersNav } from "@/shared/components/Header/components/DevelopersNav";
import { SubMenuList } from "@/shared/components/Header/components/SubMenu/SubMenuList";
import { headerStyles } from "./styles";
import { RenderContainer } from "../RenderContainer";

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

  const isThemePage = true; // Se quiser condicionar troca de tema só para algumas rotas

  return (
    <RenderContainer>
      <header className={headerStyles.container}>
        <div className={headerStyles.wrapper}>
          {/* Logo */}
          <Link href="/" className={headerStyles.logo} aria-label="HubWeb3">
            <Image
              src="/logos/hub.png"
              alt="HubWeb3"
              width={50}
              height={30}
              priority
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={headerStyles.mobileMenuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={headerStyles.menuIconLine} />
            <span className={headerStyles.menuIconLine} />
            <span className={headerStyles.menuIconLine} />
          </button>

          {/* Nav items desktop */}
          <div className={headerStyles.navDesktop}>
            <SubMenuList />
            <InkeepSearchBar />
            {isMounted && isThemePage && (
              <button
                onClick={toggleTheme}
                className={headerStyles.themeToggle}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Nav items mobile */}
        {isOpen && (
          <div className={headerStyles.navMobile}>
            <SubMenuList />
            <div className="flex justify-between items-center">
              <InkeepSearchBar />
              {isMounted && isThemePage && (
                <button
                  onClick={toggleTheme}
                  className={headerStyles.themeToggle}
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
    </RenderContainer>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { InkeepSearchBar } from "@/shared/components/Header/components/SearchBar";
import { DevelopersNav } from "@/shared/components/Header/components/DevelopersNav";
import { SubMenuList } from "@/shared/components/Header/components/SubMenu/SubMenuList";
import { headerStyles } from "./styles";
import { RenderContainer } from "../RenderContainer";
import { useLanguage } from "@/shared/contexts/LanguageContext";
import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
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
            <div className="flex items-center gap-3">
              {isMounted && (
                <button
                  onClick={toggleLanguage}
                  className={headerStyles.themeToggle}
                  aria-label="Toggle language"
                >
                  <Globe size={22} />
                  <span className={`ml-1 text-xs font-medium ${mobileOnly.text.sm} ${desktopOnly.text.base}`}>{language.toUpperCase()}</span>
                </button>
              )}
              {isMounted && isThemePage && (
                <button
                  onClick={toggleTheme}
                  className={headerStyles.themeToggle}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Nav items mobile */}
        {isOpen && (
          <div className={headerStyles.navMobile}>
            <SubMenuList />
            <div className="flex flex-col w-full gap-4 mt-4">
                
            <div className="flex gap-2 ">
            {isMounted && (
                <button
                  onClick={toggleLanguage}
                  className={`${headerStyles.themeToggle}  ml-2 gap-2`}
                  aria-label="Toggle language"
                >
                  <Globe size={18} />
                  <span className="ml-1 max-sm:text-xs max-lg:text-4xl font-medium">{language.toUpperCase()}</span>
                </button>
              )}
              
              {isMounted && isThemePage && (
                <button
                  onClick={toggleTheme}
                  className={`${headerStyles.themeToggle} self-start ml-2`}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              )}
            </div>
              <InkeepSearchBar />
            
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

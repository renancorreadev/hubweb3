"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { InkeepSearchBar } from "@/shared/components/Header/components/SearchBar";
import { DevelopersNav } from "@/shared/components/Header/components/DevelopersNav";
import { SubMenuList } from "@/shared/components/Header/components/SubMenu/SubMenuList";
import { headerStyles } from "./styles";
import { RenderContainer } from "../RenderContainer";
import { useLanguage } from "@/shared/contexts/LanguageContext";

import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { Typography } from "@/components/Typography";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  // const isThemePage = false; // Desabilitado - apenas modo dark

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <RenderContainer>
      <header
        className={headerStyles.container}
        style={{
          backgroundColor: isDark ? getColor('background') : '#ffffff',
          borderColor: isDark ? getColor('border') : '#E5E5E5',
        }}
      >
        <div className={headerStyles.wrapper}>
          {/* Logo */}
          <Link href="/" className={headerStyles.logo} aria-label={"HubWeb3"}>
            <Image
              src="/logos/hub.png"
              alt={"HubWeb3"}
              width={isMobile ? 50 : 50}
              height={isMobile ? 20 : 30}
              priority
              style={{
                filter: isDark ? 'brightness(0) invert(1)' : 'none',
              }}
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <motion.button
            className={headerStyles.mobileMenuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: isDark ? '#ffffff' : '#1A1A1A',
            }}
          >
            <motion.span
              className={headerStyles.menuIconLine}
              style={{
                backgroundColor: isDark ? '#ffffff' : '#1A1A1A',
              }}
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
            />
            <motion.span
              className={headerStyles.menuIconLine}
              style={{
                backgroundColor: isDark ? '#ffffff' : '#1A1A1A',
              }}
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
            />
            <motion.span
              className={headerStyles.menuIconLine}
              style={{
                backgroundColor: isDark ? '#ffffff' : '#1A1A1A',
              }}
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
            />
          </motion.button>

          {/* Nav items desktop */}
          <div className={headerStyles.navDesktop}>
            <SubMenuList />
            {/* <InkeepSearchBar /> */}
            <div className="flex items-center gap-3">
              {isMounted && (
                <motion.button
                  onClick={toggleLanguage}
                  className={headerStyles.themeToggle}
                  aria-label={t('app.language')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    color: isDark ? '#ffffff' : '#1A1A1A',
                  }}
                >
                  <Globe size={22} />
                  <Typography
                    variant="button"
                    color="text.primary"
                    className="ml-1"
                    size="xs"
                    mobileSize="xs"
                    weight="medium"
                    transform="uppercase"
                  >
                    {language}
                  </Typography>
                </motion.button>
              )}
              {/* {isMounted && isThemePage && (
                <motion.button
                  onClick={toggleTheme}
                  className={headerStyles.themeToggle}
                  aria-label={theme === 'light' ? t('app.darkMode') : t('app.lightMode')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    color: isDark ? '#ffffff' : '#1A1A1A',
                  }}
                >
                  {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
                </motion.button>
              )} */}
            </div>
          </div>
        </div>

        {/* Nav items mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={headerStyles.navMobile}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                backgroundColor: isDark ? getColor('background') : '#ffffff',
                borderColor: isDark ? getColor('border') : '#E5E5E5',
              }}
            >
              <SubMenuList />
              <div className="flex flex-col w-full gap-4 mt-4">
                <div className="flex gap-2">
                  {isMounted && (
                    <motion.button
                      onClick={toggleLanguage}
                      className={`${headerStyles.themeToggle} ml-2 gap-2`}
                      aria-label={t('app.language')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        color: isDark ? '#ffffff' : '#1A1A1A',
                      }}
                    >
                      <Globe size={18} />
                      <Typography
                        variant="button"
                        color="text.primary"
                        className="ml-1"
                        size="sm"
                        mobileSize="xs"
                        weight="medium"
                        transform="uppercase"
                      >
                        {language}
                      </Typography>
                    </motion.button>
                  )}

                  {/* {isMounted && isThemePage && (
                    <motion.button
                      onClick={toggleTheme}
                      className={`${headerStyles.themeToggle} self-start ml-2`}
                      aria-label={theme === 'light' ? t('app.darkMode') : t('app.lightMode')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        color: isDark ? '#ffffff' : '#1A1A1A',
                      }}
                    >
                      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </motion.button>
                  )} */}
                </div>
                {/* <InkeepSearchBar /> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DevelopersNav */}
      {(pathname.includes("/developers") || pathname.includes("/docs")) && (
        <DevelopersNav />
      )}
    </RenderContainer>
  );
}

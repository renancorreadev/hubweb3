"use client";

import Link from "next/link";
import Image from "next/image";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import { CustomSelect } from "@/components/CustomSelect";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { SupportedLanguage } from "@/i18n";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { Typography, Heading3 } from "@/components/Typography";
import { RenderContainer } from "../RenderContainer";

import {theme} from "@/shared/styles/theme";

export function Footer() {
  const { t, changeLanguage } = useTranslation();
  const { isDark, getColor} = useThemeColors();

  const handleLanguageChange = (value: string) => {
    if (value === "pt" || value === "en") {
      changeLanguage(value as SupportedLanguage);
    }
  };

  const languageOptions = [
    { value: "pt", label: "Português", flag: "🇧🇷" },
    { value: "en", label: "English", flag: "🇺🇸" },
  ];

  return (
    <RenderContainer>
      <div className="bg-white dark:bg-black">
        <footer
          className={`
            border-t border-slate-800 dark:border-hub-border-dark py-12 
            ${mobileOnly.margin.mx6}
            ${desktopOnly.margin.mx12}
            `}
          style={{
            backgroundColor: isDark ? getColor("background") : "#ffffff",
          }}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mb-12`}
            >
              {/* Coluna 1: Logo e descrição */}
              <div className="col-span-1 lg:col-span-1">
                <div className="flex flex-col">
                  <Heading3 className="mb-4">
                    {t("footer.managedBy")}
                  </Heading3>
                  <div className="mb-6 flex justify-start">
                    <Image
                      src="/logos/hub.png"
                      alt={t("footer.logoAlt")}
                      width={120}
                      height={50}
                      style={{
                        filter: isDark ? "brightness(0) invert(1)" : "none",
                      }}
                    />
                  </div>
                  <div className="flex gap-4 mb-6">
                    <Link
                      href="https://youtube.com"
                      aria-label={t("footer.social.youtube")}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </div>
                    </Link>
                    <Link
                      href="https://twitter.com"
                      aria-label={t("footer.social.twitter")}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                    </Link>
                    <Link
                      href="https://discord.com"
                      aria-label={t("footer.social.discord")}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.385-.403.8-.548 1.17a16.98 16.98 0 0 0-5.145 0 8.49 8.49 0 0 0-.548-1.17.077.077 0 0 0-.079-.036 19.43 19.43 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C1.866 8.313 1.184 12.011 1.5 15.656a.08.08 0 0 0 .03.055 19.91 19.91 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106c-.653-.248-1.274-.549-1.872-.892a.077.077 0 0 1-.008-.128 10.492 10.492 0 0 0 .372-.291.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.245.198.372.292a.077.077 0 0 1-.006.127c-.598.344-1.22.645-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028c1.961-.604 3.95-1.515 6-3.03a.077.077 0 0 0 .032-.054c.377-3.897-.574-7.568-2.43-10.696a.06.06 0 0 0-.03-.028z" />
                        </svg>
                      </div>
                    </Link>
                    <Link
                      href="https://github.com"
                      aria-label={t("footer.social.github")}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.09.682-.217.682-.481 0-.237-.009-.866-.014-1.699-2.782.603-3.369-1.338-3.369-1.338-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.337-2.22-.251-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.378.202 2.398.1 2.651.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.934.359.31.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </div>
                    </Link>
                    <Link
                      href="https://telegram.org"
                      aria-label={t("footer.social.telegram")}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Coluna 2: Links HubWeb3 */}
              <div className="col-span-1">
                <Heading3 className="mb-4">
                  {t("footer.hubweb3.title")}
                </Heading3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/concessoes"
                      className="hover:text-hub-primary transition-colors"
                    >
                      <Typography 
                        variant="body" 
                        font="monument"
                        color="text.secondary"
                        size="xl"
                      >
                        {t("footer.hubweb3.grants")}
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kit-midia"
                      className="hover:text-hub-primary transition-colors"
                    >
                      <Typography 
                        variant="body" 
                        font="monument"
                        color="text.secondary"
                        size="xl"
                      >
                        {t("footer.hubweb3.media")}
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/aviso-legal"
                      className="hover:text-hub-primary transition-colors"
                    >
                      <Typography 
                        variant="body" 
                        font="monument"
                        color="text.secondary"
                        size="xl"
                      >
                        {t("footer.hubweb3.legal")}
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/politica-privacidade"
                      className="hover:text-hub-primary transition-colors"
                    >
                      <Typography 
                        variant="body" 
                        font="monument"
                        color="text.secondary"
                        size="xl"
                      >
                        {t("footer.hubweb3.privacy")}
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Coluna 3: Links CONECTE-SE */}
              <div className="col-span-1">
                <Heading3 className="mb-4">
                  {t("footer.connect.title")}
                </Heading3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/blog"
                      className="hover:text-hub-primary transition-colors"
                    >
                      <Typography 
                        variant="body" 
                        font="monument"
                        color="text.secondary"
                        size="xl"
                      >
                        {t("footer.connect.blog")}
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/boletim"
                      className="hover:text-hub-primary transition-colors"
                    >
                      <Typography 
                        variant="body" 
                        font="monument"
                        color="text.secondary"
                        size="xl"
                      >
                        {t("footer.connect.newsletter")}
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Coluna 4: Seletor de idioma (apenas em desktop) */}
              <div className={`col-span-1 ${mobileOnly.display.hidden} md:flex flex-col`}>
                <Heading3 className="mb-4">
                  {t("footer.language.title")}
                </Heading3>
                <CustomSelect
                  options={languageOptions}
                  defaultValue={"en"}
                  neonColor={false}
                  size="md"
                  onChange={handleLanguageChange}
                />
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 pt-6 text-center">
              <Typography 
                variant="body" 
                font="monument"
                color="text.secondary"
                size="xl"
              >
                © {new Date().getFullYear()} HubWeb3 — {t("footer.copyright")}
              </Typography>
            </div>
          </div>
        </footer>
      </div>
    </RenderContainer>
  );
}

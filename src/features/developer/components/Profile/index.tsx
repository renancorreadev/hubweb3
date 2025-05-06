"use client";

import { Body, Caption, Heading1, Heading2, Typography } from "@/components/Typography";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import Image from "next/image";

export const Profile = () => {
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();

  return (
    <section
      className={`relative overflow-hidden 
     ${mobileOnly.padding.pt12}
     ${desktopOnly.padding.pt12}
       ${desktopOnly.padding.pb20}
     
     `}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -left-20 top-40 w-80 h-80 rounded-full opacity-5 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${
                isDark ? "#14F195" : "#14F195"
              } 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute -right-20 bottom-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${
                isDark ? "#9945FF" : "#9945FF"
              } 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          />
        </div>

        <div >
          {/* Título Principal em 100% da largura */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-16 text-center"
          >
            <motion.div
              className="mb-4 inline-block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Heading1>{t("developer.subtitle")}</Heading1>
            </motion.div>

            <Heading1
 
              className="mb-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Renan C.F Correa
              </motion.span>
            </Heading1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[#14F195] flex  justify-center items-center"
            >
              <Heading2>{t("developer.hero.title")}</Heading2>
            </motion.div>

            <motion.div
              className="h-1.5 w-24 mt-4 mx-auto"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{
                background: isDark
                  ? "linear-gradient(90deg, #14F195 0%, #9945FF 100%)"
                  : "linear-gradient(90deg, #14F195 0%, #9945FF 100%)",
              }}
            />
          </motion.div>

          <div
            className={`flex ${mobileOnly.flex.col} ${desktopOnly.flex.row} items-center gap-8 md:gap-10`}
          >
            {/* Foto do Perfil */}
            <div className="w-full md:w-[40%] md:order-1 order-1 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-sm"
              >
                {/* Versão mobile: retangular */}
                <div
                  className="md:hidden relative w-full h-80 rounded-xl overflow-hidden border-4 shadow-xl mb-8"
                  style={{
                    borderColor: isDark ? "#14F19530" : "#14F19530",
                    boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 15px ${
                      isDark ? "#14F19550" : "#9945FF50"
                    }`,
                  }}
                >
                  <Image
                    src="/images/developer.jpeg"
                    alt="Renan Correa"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    className="transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>

                {/* Versão desktop: circular */}
                <div
                  className="hidden md:block relative w-80 h-80 rounded-full overflow-hidden border-4 shadow-xl"
                  style={{
                    borderColor: isDark ? "#14F19530" : "#14F19530",
                    boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 15px ${
                      isDark ? "#14F19550" : "#9945FF50"
                    }`,
                  }}
                >
                  <Image
                    src="/images/developer.jpeg"
                    alt="Renan Correa"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>

                {/* Círculo decorativo - apenas no desktop */}
                <motion.div
                  className="absolute -z-10 -inset-3 rounded-full opacity-20 hidden md:block"
                  style={{
                    background: `linear-gradient(45deg, #14F195 0%, #9945FF 100%)`,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>

            {/* Informações do Perfil */}
            <div className="w-full md:w-[60%] md:order-2 order-2 mb-12 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-xl p-8 md:p-10 w-full"
                style={{
                  backgroundColor: isDark
                    ? "rgba(10, 10, 10, 0.7)"
                    : "rgba(10, 10, 10, 0.85)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isDark
                      ? "rgba(30, 30, 40, 0.3)"
                      : "rgba(255, 255, 255, 0.1)"
                  }`,
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.3)`,
                }}
              >
                <div className="">
                  <Body className="text-white dark:text-slate-500">{t("developer.summary")}</Body>
                </div>
                {/* Tech badges */}
                <motion.div
                  className="mt-8 flex flex-wrap gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {[
                    "Ethereum",
                    "Solana",
                    "Hyperledger",
                    "Go",
                    "Java",
                    "NodeJS",
                    "Solidity",
                    "Tokenização",
                  ].map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="inline-block px-4 py-2 text-sm md:text-base rounded-full font-medium shadow-sm"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(30, 30, 40, 0.8)"
                          : "rgba(20, 20, 30, 0.8)",
                        color: isDark ? "#14F195" : "#14F195",
                        border: `1px solid ${
                          isDark
                            ? "rgba(153, 69, 255, 0.3)"
                            : "rgba(20, 241, 149, 0.3)"
                        }`,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: isDark
                          ? "rgba(153, 69, 255, 0.3)"
                          : "rgba(20, 241, 149, 0.3)",
                        color: "#ffffff",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Estatísticas rápidas */}
                <motion.div
                  className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {[
                    { label: "Experiência", value: "7+ Anos" },
                    { label: "Projetos", value: "25+" },
                    { label: "Especialidade", value: "Tokenização" },
                    { label: "Foco", value: "DLT Solutions" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-2">
                      <Body
              
                        style={{ color: "#14F195" }}
                      >
                        {stat.value}
                      </Body>
                      <Caption>
                        {stat.label}
                      </Caption>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-6 mt-6 md:mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    href="/contact"
                    variant="primary"
                    className="text-base px-6 py-3"
                  >
                    {t("developer.cta.contact")}
                  </Button>
                  <Button
                    href="/projects"
                    variant="secondary"
                    className={`text-base px-6 py-3 ${
                      isDark
                        ? ""
                        : "border-2 border-hub-primary text-white bg-black hover:bg-hub-primary hover:text-white"
                    }`}
                  >
                    {t("developer.cta.projects")}
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

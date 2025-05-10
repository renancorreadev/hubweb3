"use client";

import { ReactNode } from "react";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Heading2, Body } from "@/components/Typography";
import { motion } from "framer-motion";
// import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import Image from "next/image";
import Link from "next/link";
import { RenderContainer } from "@/shared/components/RenderContainer";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import '@/styles/image-zoom.css';

interface ProjectLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  description: string | ReactNode;
  tags?: string[];
  techStack?: string[];
  imagePath?: string;
  githubUrl?: string;
  demoUrl?: string;
  nextProject?: {
    name: string;
    url: string;
  };
  prevProject?: {
    name: string;
    url: string;
  };
}

export function ProjectLayout({
  children,
  title,
  subtitle,
  description,
  tags = [],
  techStack = [],
  imagePath = "/images/projects/default-project.jpg",
  githubUrl,
  demoUrl,
  nextProject,
  prevProject,
}: ProjectLayoutProps) {
  const { isDark, getColor } = useThemeColors();
  const { t } = useTranslation();

  return (
    <RenderContainer>
      <section
        className="py-12 md:py-24 relative overflow-hidden"
        style={{
          backgroundColor: isDark ? getColor("background") : "#ffffff",
          backgroundImage: isDark
            ? `radial-gradient(circle at 25% 25%, rgba(153, 69, 255, 0.05), transparent 25%), radial-gradient(circle at 75% 75%, rgba(20, 241, 149, 0.05), transparent 25%)`
            : `radial-gradient(circle at 25% 25%, rgba(122, 53, 204, 0.03), transparent 25%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.03), transparent 25%)`,
        }}
      >
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

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Título e Navegação */}
          <div className="mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Heading2>{title}</Heading2>
                {subtitle && (
                  <p className="text-xl mt-2 text-hub-primary dark:text-hub-primary">
                    {subtitle}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-4"
              >
                <Link
                  href="/projects"
                  className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 text-black dark:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("projects.back")}
                </Link>
              </motion.div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(20, 241, 149, 0.1)"
                        : "rgba(14, 166, 107, 0.1)",
                      color: isDark ? "#14F195" : "#0EA66B",
                      border: `1px solid ${
                        isDark
                          ? "rgba(20, 241, 149, 0.3)"
                          : "rgba(14, 166, 107, 0.3)"
                      }`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Barra decorativa */}
            <motion.div
              className="h-1 w-24 mt-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: isDark
                  ? "linear-gradient(90deg, #14F195 0%, #9945FF 100%)"
                  : "linear-gradient(90deg, #14F195 0%, #9945FF 100%)",
              }}
            />
          </div>

          {/* Conteúdo Principal */}
          <div className="flex flex-col-reverse lg:flex-row gap-12">
            {/* Lado Esquerdo - Texto e Informações */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Descrição */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
                    {t("projects.description")}
                  </h3>
                  {typeof description === "string" ? (
                    <Body 
                      dangerouslySetInnerHTML={{ 
                        __html: description.replace(
                          /<em>(.*?)<\/em>/g, 
                          '<em class="text-hub-primary dark:text-hub-primary" style="font-family: inherit; font-size: inherit; font-weight: inherit; font-style: normal;">$1</em>'
                        ) 
                      }} 
                    />
                  ) : (
                    description
                  )}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(153, 69, 255, 0.1)"
                          : "rgba(122, 53, 204, 0.1)",
                        color: isDark ? "#9945FF" : "#7A35CC",
                        border: `1px solid ${
                          isDark
                            ? "rgba(153, 69, 255, 0.3)"
                            : "rgba(122, 53, 204, 0.3)"
                        }`,
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}

                  {demoUrl && (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(20, 241, 149, 0.1)"
                          : "rgba(14, 166, 107, 0.1)",
                        color: isDark ? "#14F195" : "#0EA66B",
                        border: `1px solid ${
                          isDark
                            ? "rgba(20, 241, 149, 0.3)"
                            : "rgba(14, 166, 107, 0.3)"
                        }`,
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Lado Direito - Imagem */}
            <div className="w-full lg:w-1/2 lg:pt-4" >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow: isDark
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(153, 69, 255, 0.2)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 15px rgba(122, 53, 204, 0.1)",
                }}
              >
                <div className="relative w-full overflow-hidden rounded-lg bg-[#1a1b26]">
                  <Zoom
                    classDialog="bg-transparent"
                    zoomMargin={40}
                  >
                    <Image
                      src={imagePath}
                      alt={title}
                      width={1920}
                      height={1080}
                      priority
                      className="w-full h-auto transition-transform duration-700 hover:scale-105"
                    />
                  </Zoom>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tech Stack - Agora fora do container de duas colunas */}
          {techStack.length > 0 && (
            <div className="mt-12 space-y-4 w-full">
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
                {t("projects.technologies")}
              </h3>
              <div className="flex flex-wrap gap-3 w-full">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg text-sm bg-black dark:bg-white text-white dark:text-black font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Conteúdo Detalhado */}
          <div className="mt-20 mb-16">{children}</div>

          {/* Navegação para outros projetos */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mt-16">
            <div className="flex flex-row justify-between items-center gap-2 max-sm:px-2">
              {prevProject && (
                <Link
                  href={prevProject.url}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-colors max-sm:flex-1 max-sm:justify-center max-sm:text-sm max-sm:px-2"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(153, 69, 255, 0.1)"
                      : "rgba(122, 53, 204, 0.1)",
                    color: isDark ? "#9945FF" : "#7A35CC",
                    border: `1px solid ${
                      isDark
                        ? "rgba(153, 69, 255, 0.3)"
                        : "rgba(122, 53, 204, 0.3)"
                    }`,
                  }}
                >
                  <svg
                    className="w-5 h-5 max-sm:w-4 max-sm:h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="max-sm:line-clamp-1">{prevProject.name}</span>
                </Link>
              )}

              {nextProject && (
                <Link
                  href={nextProject.url}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-colors max-sm:flex-1 max-sm:justify-center max-sm:text-sm max-sm:px-2"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(20, 241, 149, 0.1)"
                      : "rgba(14, 166, 107, 0.1)",
                    color: isDark ? "#14F195" : "#0EA66B",
                    border: `1px solid ${
                      isDark
                        ? "rgba(20, 241, 149, 0.3)"
                        : "rgba(14, 166, 107, 0.3)"
                    }`,
                  }}
                >
                  <span className="max-sm:line-clamp-1">{nextProject.name}</span>
                  <svg
                    className="w-5 h-5 max-sm:w-4 max-sm:h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </RenderContainer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { RenderContainer } from "@/shared/components/RenderContainer";

type ProjectCategory = 'all' | 'cbdc' | 'tokenization' | 'defi' | 'loyalty' | 'nft' | 'explorer';

interface Project {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  categories: ProjectCategory[];
  tags: string[];
  techStack: string[];
  url: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { isDark } = useThemeColors();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulating a data loading delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Define projects
    const projectsData: Project[] = [
      {
        id: "drex",
        title: t("projects.drex.title"),
        description: t("projects.drex.description"),
        imagePath: "/images/projects/drex/drex.png",
        categories: ['cbdc', 'tokenization'],
        tags: [t("projects.drex.tag"), "Sandbox", "Central Bank"],
        techStack: ["Hyperledger Besu", "Solidity", "Java", "React"],
        url: "/projects/drex",
        githubUrl: "https://github.com/hubweb3/drex-sandbox",
        demoUrl: "https://drex.hubweb3.com",
        featured: true
      },
      {
        id: "loyahub",
        title: t("projects.loyahub.title"),
        description: t("projects.loyahub.description"),
        imagePath: "/images/projects/loyahub/screen/app.png",
        categories: ['loyalty', 'tokenization'],
        tags: [t("projects.loyahub.tag"), "Rewards", "Mobile"],
        techStack: ["Solidity", "React Native", "Node.js", "Polygon"],
        url: "/projects/loyahub",
        githubUrl: "https://github.com/renancorreadev/loyahub",
        demoUrl: "https://github.com/renancorreadev/loyahub"
      },
      {
        id: "asset-tokenization",
        title: t("projects.assetTokenization.title"),
        description: t("projects.assetTokenization.description"),
        imagePath: "/images/projects/rwahub/rwa.png",
        categories: ['tokenization', 'defi'],
        tags: [t("projects.assetTokenization.tag"), "DeFi", "NFT"],
        techStack: ["Solidity", "ERC-1155", "React", "Node.js", "AWS"],
        url: "/projects/asset-tokenization",
        githubUrl: "https://github.com/rwa-hub",
        demoUrl: "https://github.com/rwa-hub"
      },
      {
        id: "creator-pro",
        title: t("projects.creatorPro.title"),
        description: t("projects.creatorPro.description"),
        imagePath: "/images/projects/CreatorPro.png",
        categories: ['nft', 'defi'],
        tags: [t("projects.creatorPro.tag"), "NFT", "Marketplace"],
        techStack: ["React", "Solidity", "IPFS", "Ethereum"],
        url: "/projects/creator-pro",
        githubUrl: "https://github.com/hubweb3/creator-pro",
        demoUrl: "https://creator-pro.hubweb3.com"
      },
      {
        id: "besuscan",
        title: t("projects.besuscan.title"),
        description: t("projects.besuscan.description"),
        imagePath: "/images/projects/besuscan/home.png",
        categories: ['explorer', 'tokenization'],
        tags: [t("projects.besuscan.tag"), "Block Explorer", "Enterprise", "Microservices"],
        techStack: ["Go", "TypeScript", "React", "PostgreSQL", "Redis", "RabbitMQ", "Hyperledger Besu", "Docker"],
        url: "/projects/besuscan",
        githubUrl: "https://github.com/renancorreadev/besuscan",
        demoUrl: "https://besuscan.hubweb3.com",
        featured: true
      },
    ];

    setProjects(projectsData);
  }, [t]);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.categories.includes(selectedCategory));

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t("projects.list.all") },
    { id: 'cbdc', label: t("projects.list.filters.cbdc") },
    { id: 'tokenization', label: t("projects.list.filters.tokenization") },
    { id: 'defi', label: t("projects.list.filters.defi") },
    { id: 'loyalty', label: t("projects.list.filters.loyalty") },
    { id: 'nft', label: t("projects.list.filters.nft") },
    { id: 'explorer', label: t("projects.list.filters.explorer") }
  ];

  // Container animation
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <RenderContainer>
      <section
        className="py-12 md:py-20 px-4 relative overflow-hidden"
        style={{
          backgroundColor: isDark ? "#000508" : "#ffffff",
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
              background: `radial-gradient(circle, ${isDark ? "#14F195" : "#14F195"
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
              background: `radial-gradient(circle, ${isDark ? "#9945FF" : "#9945FF"
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

        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 dark:text-white text-black"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("projects.list.title")}
            </motion.h1>
            <motion.h2
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("projects.list.subtitle")}
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("projects.list.description")}
            </motion.p>
          </div>

          {/* Filter Categories */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${selectedCategory === category.id
                  ? isDark
                    ? "bg-hub-primary text-black font-medium"
                    : "bg-hub-primary-light text-white font-medium"
                  : isDark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-black/5 text-black hover:bg-black/10"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="flex flex-col rounded-xl overflow-hidden group"
                  style={{
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Image */}
                  <div className="relative w-full pt-[56.25%] overflow-hidden bg-gray-900">
                    <Image
                      src={project.imagePath}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: "center" }}
                    />

                    {/* Featured badge */}
                    {project.featured && (
                      <div
                        className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: isDark ? "rgba(153, 69, 255, 0.8)" : "rgba(122, 53, 204, 0.8)",
                          color: "white",
                          borderRadius: "20px",
                        }}
                      >
                        {t("projects.list.featured")}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-xl font-bold mb-2 dark:text-white text-black">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: isDark
                              ? "rgba(20, 241, 149, 0.1)"
                              : "rgba(14, 166, 107, 0.1)",
                            color: isDark ? "#14F195" : "#0EA66B",
                            border: `1px solid ${isDark
                              ? "rgba(20, 241, 149, 0.3)"
                              : "rgba(14, 166, 107, 0.3)"
                              }`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-md text-gray-800 dark:text-gray-200 bg-black/5 dark:bg-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-1 text-xs rounded-md text-gray-800 dark:text-gray-200 bg-black/5 dark:bg-white/10">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      <Link
                        href={project.url}
                        className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-full text-center text-sm transition-colors"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(153, 69, 255, 0.1)"
                            : "rgba(122, 53, 204, 0.1)",
                          color: isDark ? "#9945FF" : "#7A35CC",
                          border: `1px solid ${isDark
                            ? "rgba(153, 69, 255, 0.3)"
                            : "rgba(122, 53, 204, 0.3)"
                            }`,
                        }}
                      >
                        {t("projects.list.viewDetails")}
                      </Link>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 rounded-full transition-colors"
                          style={{
                            backgroundColor: isDark
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.05)",
                            color: isDark ? "white" : "black",
                          }}
                          title={t("projects.list.viewGithub")}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 rounded-full transition-colors"
                          style={{
                            backgroundColor: isDark
                              ? "rgba(20, 241, 149, 0.1)"
                              : "rgba(14, 166, 107, 0.1)",
                            color: isDark ? "#14F195" : "#0EA66B",
                          }}
                          title={t("projects.list.viewDemo")}
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
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No projects message if needed */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum projeto encontrado nesta categoria.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </RenderContainer>
  );
}

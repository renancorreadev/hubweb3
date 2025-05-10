"use client";

import { ProjectLayout } from "@/components/ProjectLayout";
import { Heading2, Body } from "@/components/Typography";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { MediaRenderer, MediaItem } from "@/components/MediaRenderer";
import { useTranslation } from "@/shared/hooks/useTranslation";
import Image from "next/image";

export interface Feature {
  title: string;
  description: string;
  icon: string;
  color: "purple" | "green";
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

export interface BenefitGroup {
  title: string;
  benefits: string[];
  color: "primary" | "secondary";
}

export interface DiagramItem {
  url: string;
  alt?: string;
  diagramType: 'flowchart' | 'sequence' | 'architecture' | 'component' | 'deployment';
  description: string;
}

export interface ArchitectureSection {
  title: string;
  description: string;
  diagrams: DiagramItem[];
}

export interface ArchitectureDetails {
  title: string;
  description: string;
  overview: string;
  sections: ArchitectureSection[];
  heroArchitecture?: MediaItem;
  content?: React.ReactNode;
  highlights: {
    title: string;
    description: string;
    icon: string;
  }[];
  technicalSpecs?: {
    stack: string[];
    apis: string[];
    databases: string[];
    infrastructure: string[];
  };
}

export interface ProjectPageTemplateProps {
  // Layout props
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  techStack: string[];
  imagePath: string;
  githubUrl: string;
  demoUrl: string;
  nextProject: {
    name: string;
    url: string;
  };
  prevProject: {
    name: string;
    url: string;
  };
  
  // Media props
  mediaItems?: MediaItem[];
  
  // Content props
  features: Feature[];
  processTitle: string;
  processSteps: ProcessStep[];
  benefitsTitle: string;
  benefitGroups: BenefitGroup[];
  
  // Architecture props
  hasArchitecture?: boolean;
  architectureDetails?: ArchitectureDetails;
}

export function ProjectPageTemplate({
  // Layout props
  title,
  subtitle,
  description,
  tags,
  techStack,
  imagePath,
  githubUrl,
  demoUrl,
  nextProject,
  prevProject,
  
  // Media props
  mediaItems = [],
  
  // Content props
  features,
  processTitle,
  processSteps,
  benefitsTitle,
  benefitGroups,
  
  // Architecture props
  hasArchitecture = false,
  architectureDetails,
}: ProjectPageTemplateProps) {
  const containerRef = useRef(null);
  const architectureRef = useRef(null);
  const { t } = useTranslation();
  
  // Scroll progress para o container principal
  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll progress específico para a seção de arquitetura
  const { scrollYProgress: architectureScrollProgress } = useScroll({
    target: architectureRef,
    offset: ["start end", "end start"]
  });

  // Efeitos de parallax e animação para a seção principal
  const mainScale = useTransform(mainScrollProgress, [0, 0.5], [0.95, 1]);
  const mainOpacity = useTransform(mainScrollProgress, [0, 0.2], [0.8, 1]);

  // Efeitos específicos para a seção de arquitetura
  const architectureY = useTransform(architectureScrollProgress, [0, 1], ["0%", "20%"]);
  const architectureOpacity = useTransform(architectureScrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const highlightScale = useTransform(architectureScrollProgress, [0, 0.5], [0.95, 1]);

  // Spring animations para movimento mais suave
  const springConfig = { stiffness: 100, damping: 30 };
  const mainScaleSpring = useSpring(mainScale, springConfig);
  const architectureYSpring = useSpring(architectureY, springConfig);
  const highlightScaleSpring = useSpring(highlightScale, springConfig);

  // Adiciona a imagem principal aos itens de mídia se não houver nenhum
  const allMediaItems = mediaItems.length > 0 
    ? mediaItems 
    : [{ type: "image" as const, url: imagePath, alt: title }];

  return (
    <ProjectLayout
      title={title}
      subtitle={subtitle}
      description={description}
      tags={tags}
      techStack={techStack}
      imagePath={imagePath}
      githubUrl={githubUrl}
      demoUrl={demoUrl}
      nextProject={nextProject}
      prevProject={prevProject}
    >
      <div ref={containerRef} className="space-y-32">
        {/* Media Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-black"
          style={{ scale: mainScaleSpring, opacity: mainOpacity }}
        >
          <MediaRenderer media={allMediaItems} />
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heading2 className="text-gray-900 dark:text-white">Features</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`relative p-6 rounded-xl overflow-hidden group
                  ${feature.color === "purple" 
                    ? "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/30" 
                    : "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/30"
                  } border`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Architecture Section */}
        {hasArchitecture && architectureDetails && (
          <motion.section
            ref={architectureRef}
            className="relative py-24 lg:px-10 overflow-hidden"
            style={{ opacity: architectureOpacity }}
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hub-primary/[0.04] to-transparent" />
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--hub-secondary-rgb),0.04)_0%,transparent_70%)]"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.04, 0.06, 0.04]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <div className="container mx-auto px-4 relative">
              {/* Overview Section */}
              <motion.div 
                className="text-center mb-16"
                style={{ y: architectureYSpring }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Heading2 className="text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-hub-primary to-hub-secondary">
                    {architectureDetails.title}
                  </Heading2>
                  <Body className="max-w-3xl mx-auto mt-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {architectureDetails.overview}
                  </Body>
                </motion.div>
              </motion.div>

              {/* Hero Architecture Image (if provided) */}
              {architectureDetails.heroArchitecture && (
                <motion.div 
                  className="mb-24"
                  style={{ y: architectureYSpring }}
                >
                  <motion.div
                    className="relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Image
                      src={architectureDetails.heroArchitecture.url}
                      alt={architectureDetails.heroArchitecture.alt || "Architecture Overview"}
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                      priority
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Architecture Sections */}
              {architectureDetails.sections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  className="mb-24"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    {section.description}
                  </p>
                  
                  {/* Diagrams Grid */}
                  <div className={`grid gap-8 ${
                    section.diagrams.length === 1 
                      ? 'grid-cols-1' 
                      : section.diagrams.length === 2 
                        ? 'grid-cols-1 md:grid-cols-2' 
                        : section.diagrams.length === 3 
                          ? 'grid-cols-1 md:grid-cols-2 [&>*:last-child]:md:col-span-2'
                          : 'grid-cols-1 md:grid-cols-2'
                  }`}>
                    {section.diagrams.map((diagram, diagramIndex) => (
                      <motion.div
                        key={diagramIndex}
                        className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <Image
                          src={diagram.url}
                          alt={diagram.alt || ""}
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg mb-4"
                        />
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-sm bg-hub-primary/10 text-hub-primary">
                              {diagram.diagramType}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {diagram.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Existing Highlights Section */}
              <motion.div 
                className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                style={{ scale: highlightScaleSpring }}
              >
                {architectureDetails.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-hub-primary/20 to-hub-secondary/20 rounded-2xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      initial={false}
                    />
                    <motion.div
                      className="relative h-full p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      <div className="text-5xl mb-6 bg-gradient-to-br from-hub-primary to-hub-secondary text-transparent bg-clip-text">
                        {highlight.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white bg-gradient-to-r from-hub-primary to-hub-secondary bg-clip-text text-transparent">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {highlight.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Process Section */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heading2>{processTitle}</Heading2>
            <div className="mt-8 relative">
              <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-hub-primary to-hub-secondary" />
              
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-1">
                    <motion.div
                      className="p-6 rounded-xl"
                      style={{
                        backgroundColor: index % 2 === 0 
                          ? "rgba(153, 69, 255, 0.05)"
                          : "rgba(20, 241, 149, 0.05)",
                        border: index % 2 === 0
                          ? "1px solid rgba(153, 69, 255, 0.2)"
                          : "1px solid rgba(20, 241, 149, 0.2)"
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-3xl mb-4">{step.icon}</div>
                      <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  <div className="relative">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-hub-primary flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </motion.div>
                  </div>
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Heading2>{benefitsTitle}</Heading2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefitGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: groupIndex === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <svg 
                        className={`w-5 h-5 text-hub-${group.color}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </ProjectLayout>
  );
} 
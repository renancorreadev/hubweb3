"use client";

import { Card } from "@/components/Card";
import { Heading2 } from "@/components/Typography";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { motion } from "framer-motion";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

export const Projects = () => {
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();

  const projects = [
    {
      id: 1,
      title: t("developer.projects.creatorPro.title"),
      description: t("developer.projects.creatorPro.description"),
      tag: t("developer.projects.creatorPro.tag"),
      href: "/projects/creator-pro",
      backgroundImage: "/images/solids/neonSolid.png",
      gradientColor: "green",
    },
    {
      id: 2,
      title: t("developer.projects.drex.title"),
      description: t("developer.projects.drex.description"),
      tag: t("developer.projects.drex.tag"),
      href: "/projects/drex",
      backgroundImage: "/images/solids/geometric.png",
      gradientColor: "default",
    },
    {
      id: 3,
      title: t("developer.projects.assetToken.title"),
      description: t("developer.projects.assetToken.description"),
      tag: t("developer.projects.assetToken.tag"),
      href: "/projects/asset-tokenization",
      backgroundImage: "/images/solids/neonSolid.png",
      gradientColor: "green",
    },
    {
      id: 4,
      title: t("developer.projects.explorer.title"),
      description: t("developer.projects.explorer.description"),
      tag: t("developer.projects.explorer.tag"),
      href: "/projects/block-explorer",
      backgroundImage: "/images/solids/geometric.png",
      gradientColor: "default",
    },
  ];

  return (
    <section
      className="max-sm:py-0 md:py-24"
      style={{
        backgroundColor: isDark ? getColor("background") : "#ffffff",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex justify-between items-center ${mobileOnly.flex.col} ${mobileOnly.gap.gap6}`}
        >
          <Heading2>{t("developer.projects.title")}</Heading2>
        </motion.div>
      </div>

      {/* Container para o Card principal - ocupa 100% em todos tamanhos de tela */}
      <div className={`${desktopOnly.container} ${mobileOnly.container}`}>
        <div className="col-span-12">
          <Card
            backgroundImage={projects[0].backgroundImage}
            tag={projects[0].tag}
            title={projects[0].title}
            description={projects[0].description}
            href={projects[0].href}
            neonEffect={false}
            gradientColor="green"
            className="mb-8 p-2"
            topBorder={false}
          />
        </div>
      </div>

      {/* Grid de 3 cards menores */}
      <div className={`${desktopOnly.container} ${mobileOnly.container}`}>
        {projects.slice(1).map((project, index) => (
          <div
            key={project.id}
            className={`${mobileOnly.colSpan.cols12} ${desktopOnly.colSpan.cols4}`}
          >
            <Card
              backgroundImage={project.backgroundImage}
              tag={project.tag}
              className="p-2"
              title={project.title}
              description={project.description}
              href={project.href}
              gradientColor={
                project.gradientColor === "green" ? "green" : "default"
              }
              topBorder={false}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

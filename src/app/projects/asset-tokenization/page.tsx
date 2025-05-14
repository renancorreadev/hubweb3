"use client";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { MediaItem } from "@/components/MediaRenderer";

export default function AssetTokenization() {
  const { t } = useTranslation();

  const techStack = [
    "Solidity",
    "ERC-1155",
    "OpenZeppelin",
    "MythX",
    "Slither",
    "Securify",
    "Echidna",
    "Foundryup",
    "MongoDB",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AWS",
    "Docker",
    'Go'
  ];

  // Mídia do projeto
  const mediaItems: MediaItem[] = [
    {
      type: "video",
      url: "/images/projects/rwahub/RegisterNew.mp4",
      thumbnail: "/images/projects/rwahub/thumb.png",
      title: "Demo da Plataforma",
      description: "Demonstração das principais funcionalidades da plataforma"
    }
  ];

  return (
    <ProjectPageTemplate
      // Layout props
      title={t("projects.assetTokenization.title")}
      subtitle={t("projects.assetTokenization.subtitle")}
      description={t("projects.assetTokenization.description")}
      tags={[t("projects.assetTokenization.tag"), "DeFi", "NFT"]}
      techStack={techStack}
      mediaItems={mediaItems}
      imagePath="/images/projects/rwahub/rwa.png"
      githubUrl="https://github.com/rwa-hub"
      demoUrl="https://github.com/rwa-hub"
      nextProject={{
        name: t("projects.drex.title"),
        url: "/projects/drex"
      }}
      prevProject={{
        name: t("projects.drex.title"),
        url: "/projects/drex"
      }}
      
      // Architecture Section
      hasArchitecture={true}
      architectureDetails={{
        title: t("projects.architecture"),
        description: t("projects.architecture.description"),
        overview: t("projects.assetTokenization.architecture.overview"),
        sections: [
          {
            title: "",
            description: "",
            diagrams: [
              {
                url: "/images/projects/rwahub/fluxes/monitor.png",
                alt: "Asset Tokenization Architecture",
                diagramType: "architecture",
                description: t("projects.assetTokenization.architecture.diagrams.operations")
              },   
            ]
          },
        ],
        highlights: [
          {
            title: t("projects.assetTokenization.architecture.highlights.layers.title"),
            description: t("projects.assetTokenization.architecture.highlights.layers.description"),
            icon: "🏗️"
          },
          {
            title: t("projects.assetTokenization.architecture.highlights.blockchain.title"),
            description: t("projects.assetTokenization.architecture.highlights.blockchain.description"),
            icon: "⛓️"
          },
          {
            title: t("projects.assetTokenization.architecture.highlights.data.title"),
            description: t("projects.assetTokenization.architecture.highlights.data.description"),
            icon: "📊"
          }
        ]
      }}
      
      // Features Section
      features={[
        {
          title: t("projects.assetTokenization.features.multiAsset.title"),
          description: t("projects.assetTokenization.features.multiAsset.description"),
          icon: "🏢",
          color: "purple"
        },
        {
          title: t("projects.assetTokenization.features.compliance.title"),
          description: t("projects.assetTokenization.features.compliance.description"),
          icon: "⚖️",
          color: "green"
        },
        {
          title: t("projects.assetTokenization.features.fractionalization.title"),
          description: t("projects.assetTokenization.features.fractionalization.description"),
          icon: "📊",
          color: "purple"
        },
        {
          title: t("projects.assetTokenization.features.market.title"),
          description: t("projects.assetTokenization.features.market.description"),
          icon: "💱",
          color: "green"
        }
      ]}
      
      processTitle={t("projects.assetTokenization.process.title")}
      processSteps={[
        {
          title: t("projects.assetTokenization.process.steps.dueDiligence.title"),
          description: t("projects.assetTokenization.process.steps.dueDiligence.description"),
          icon: "📋"
        },
        {
          title: t("projects.assetTokenization.process.steps.structuring.title"),
          description: t("projects.assetTokenization.process.steps.structuring.description"),
          icon: "⚙️"
        },
        {
          title: t("projects.assetTokenization.process.steps.issuance.title"),
          description: t("projects.assetTokenization.process.steps.issuance.description"),
          icon: "🚀"
        },
        {
          title: t("projects.assetTokenization.process.steps.management.title"),
          description: t("projects.assetTokenization.process.steps.management.description"),
          icon: "🔄"
        }
      ]}
      
      benefitsTitle={t("projects.assetTokenization.benefits.title")}
      benefitGroups={[
        {
          title: t("projects.assetTokenization.benefits.issuers.title"),
          benefits: (t("projects.assetTokenization.benefits.issuers.list") as unknown) as string[],
          color: "primary"
        },
        {
          title: t("projects.assetTokenization.benefits.investors.title"),
          benefits: (t("projects.assetTokenization.benefits.investors.list") as unknown) as string[],
          color: "secondary"
        }
      ]}
    />
  );
} 
"use client";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { MediaItem } from "@/components/MediaRenderer";

export default function LoyaHub() {
  const { t } = useTranslation();

  const techStack = [
    "Solidity",
    "ERC-20",
    "Hyperledger Besu",
    "React Native",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "AWS"
  ];

  const mediaItems: MediaItem[] = [
    {
      type: "video",
      url: "/images/projects/loyahub/screen/Recovery",
      thumbnail: "/images/projects/loyahub/screen/Transferir.png",
      title: "Demo do App",
      description: "Demonstração das principais funcionalidades do aplicativo"
    }
  ];

  const galleryItems = [
    {
      url: "/images/projects/loyahub/screen/adminI.png",
      alt: t("projects.loyahub.gallery.adminI.title"),
      title: t("projects.loyahub.gallery.adminI.title"),
      description: t("projects.loyahub.gallery.adminI.description"),
      size: "large" as const
    },
    {
      url: "/images/projects/loyahub/screen/adminII.png",
      alt: t("projects.loyahub.gallery.adminII.title"),
      title: t("projects.loyahub.gallery.adminII.title"),
      description: t("projects.loyahub.gallery.adminII.description"),
      size: "medium" as const
    },
    {
      url: "/images/projects/loyahub/screen/adminIII.png",
      alt: t("projects.loyahub.gallery.adminIII.title"),
      title: t("projects.loyahub.gallery.adminIII.title"),
      description: t("projects.loyahub.gallery.adminIII.description"),
      size: "medium" as const
    },
    {
      url: "/images/projects/loyahub/screen/adminIV.png",
      alt: t("projects.loyahub.gallery.adminIV.title"),
      title: t("projects.loyahub.gallery.adminIV.title"),
      description: t("projects.loyahub.gallery.adminIV.description"),
      size: "medium" as const
    },

    {
      url: "/images/projects/loyahub/screen/CardPontos.png",
      alt: t("projects.loyahub.gallery.cardPontos.title"),
      title: t("projects.loyahub.gallery.cardPontos.title"),
      description: t("projects.loyahub.gallery.cardPontos.description"),
      size: "medium" as const
    },
    {
      url: "/images/projects/loyahub/screen/ProfileI.png",
      alt: t("projects.loyahub.gallery.profileI.title"),
      title: t("projects.loyahub.gallery.profileI.title"),
      description: t("projects.loyahub.gallery.profileI.description"),
      size: "medium" as const
    },
    {
      url: "/images/projects/loyahub/screen/ProfileII.png",
      alt: t("projects.loyahub.gallery.profileII.title"),
      title: t("projects.loyahub.gallery.profileII.title"),
      description: t("projects.loyahub.gallery.profileII.description"),
      size: "small" as const
    },
    {
      url: "/images/projects/loyahub/screen/ProfileIII.png",
      alt: t("projects.loyahub.gallery.profileIII.title"),
      title: t("projects.loyahub.gallery.profileIII.title"),
      description: t("projects.loyahub.gallery.profileIII.description"),
      size: "medium" as const
    },
    {
      url: "/images/projects/loyahub/screen/ProfileUpadted.png",
      alt: t("projects.loyahub.gallery.profileUpdated.title"),
      title: t("projects.loyahub.gallery.profileUpdated.title"),
      description: t("projects.loyahub.gallery.profileUpdated.description"),
      size: "medium" as const
    },
    {
      url: "/images/projects/loyahub/screen/Registro.png",
      alt: t("projects.loyahub.gallery.registro.title"),
      title: t("projects.loyahub.gallery.registro.title"),
      description: t("projects.loyahub.gallery.registro.description"),
      size: "small" as const
    },
    {
      url: "/images/projects/loyahub/screen/Transferir.png",
      alt: t("projects.loyahub.gallery.transferir.title"),
      title: t("projects.loyahub.gallery.transferir.title"),
      description: t("projects.loyahub.gallery.transferir.description"),
      size: "small" as const
    }
  ];

  return (
    <ProjectPageTemplate
      title={t("projects.loyahub.title")}
      subtitle={t("projects.loyahub.subtitle")}
      description={t("projects.loyahub.description")}
      tags={[t("projects.loyahub.tag"), "Rewards", "Mobile"]}
      techStack={techStack}
      mediaItems={mediaItems}
      imagePath="/images/projects/loyahub/screen/app.png"
      githubUrl="https://github.com/renancorreadev/loyahub"
      demoUrl="https://github.com/renancorreadev/loyahub"
      nextProject={{
        name: t("projects.rwa.title"),
        url: "/projects/rwa"
      }}
      prevProject={{
        name: t("projects.drex.title"),
        url: "/projects/drex"
      }}
      
      // Gallery Section
      hasGallery={true}
      galleryTitle={t("projects.loyahub.gallery.title")}
      galleryItems={galleryItems}
      useSlider={true}
      
      // Architecture Section
      hasArchitecture={true}
      architectureDetails={{
        title: t("projects.architecture"),
        description: t("projects.loyahub.architecture.description"),
        overview: t("projects.loyahub.architecture.overview"),
        sections: [
          {
            title: t("projects.loyahub.architecture.section.title"),
            description: t("projects.loyahub.architecture.section.description"),
            diagrams: [
              {
                url: "/images/projects/loyahub/screen/Diagram.png",
                alt: "LoyaHub Architecture",
                diagramType: "architecture",
                description: "Visão geral da arquitetura do sistema"
              }
            ]
          }
        ],
        highlights: [
          {
            title: t("projects.loyahub.architecture.highlight.blockchain.title"),
            description: t("projects.loyahub.architecture.highlight.blockchain.description"),
            icon: "🔗"
          },
          {
            title: t("projects.loyahub.architecture.highlight.api.title"),
            description: t("projects.loyahub.architecture.highlight.api.description"),
            icon: "🔌"
          },
          {
            title: t("projects.loyahub.architecture.highlight.client.title"),
            description: t("projects.loyahub.architecture.highlight.client.description"),
            icon: "📱"
          }
        ]
      }}
      
      // Features Section
      features={[
        {
          title: t("projects.loyahub.features.tokenization.title"),
          description: t("projects.loyahub.features.tokenization.description"),
          icon: "🔄",
          color: "purple"
        },
        {
          title: t("projects.loyahub.features.interoperability.title"),
          description: t("projects.loyahub.features.interoperability.description"),
          icon: "🤝",
          color: "green"
        },
        {
          title: t("projects.loyahub.features.mobileapp.title"),
          description: t("projects.loyahub.features.mobileapp.description"),
          icon: "📱",
          color: "purple"
        },
        {
          title: t("projects.loyahub.features.dashboard.title"),
          description: t("projects.loyahub.features.dashboard.description"),
          icon: "📊",
          color: "green"
        }
      ]}
      
      processTitle={t("projects.loyahub.process.title")}
      processSteps={[
        {
          title: t("projects.loyahub.process.purchasepoints.title"),
          description: t("projects.loyahub.process.purchasepoints.description"),
          icon: "🛍️"
        },
        {
          title: t("projects.loyahub.process.engagement.title"),
          description: t("projects.loyahub.process.engagement.description"),
          icon: "🎯"
        },
        {
          title: t("projects.loyahub.process.exclusive.title"),
          description: t("projects.loyahub.process.exclusive.description"),
          icon: "🎁"
        },
        {
          title: t("projects.loyahub.process.cashback.title"),
          description: t("projects.loyahub.process.cashback.description"),
          icon: "💰"
        }
      ]}
      
      benefitsTitle={t("projects.loyahub.benefits.title")}
      benefitGroups={[
        {
          title: t("projects.loyahub.benefits.companies.title"),
          benefits: (t("projects.loyahub.benefits.companies.list") as unknown) as string[],
          color: "primary"
        },
        {
          title: t("projects.loyahub.benefits.customers.title"),
          benefits: (t("projects.loyahub.benefits.customers.list") as unknown) as string[],
          color: "secondary"
        }
      ]}
    />
  );
} 
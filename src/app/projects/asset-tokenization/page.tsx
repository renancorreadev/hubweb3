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
        name: t("projects.besuScope.title"),
        url: "/projects/besu-scope"
      }}
      
      // Architecture Section
      hasArchitecture={true}
      architectureDetails={{
        title: t("projects.architecture"),
        description: t("projects.architecture.description"),
        overview: "Plataforma de tokenização de ativos construída com foco em segurança e escalabilidade",
        // heroArchitecture: {
        //   type: "image",
        //   url: "/images/projects/loyahub/API_Infra.png",
        //   alt: "Asset Tokenization Architecture Overview"
        // },
        sections: [
          {
            title: "",
            description: "",
            diagrams: [
              {
                url: "/images/projects/rwahub/fluxes/monitor.png",
                alt: "Asset Tokenization Architecture",
                diagramType: "architecture",
                description: "Diagrama de Operações da RWA Hub"
              },   
            ]
          },
          
        ],
        highlights: [
          {
            title: "Arquitetura em Camadas",
            description: "Uma arquitetura moderna e escalável para tokenização de ativos",
            icon: "🏗️"
          },
          {
            title: "Integração Blockchain",
            description: "Conexão segura com smart contracts e serviços blockchain",
            icon: "⛓️"
          },
          {
            title: "Gestão de Dados",
            description: "Sistema robusto para gerenciamento de metadados e eventos",
            icon: "📊"
          }
        ]
      }}
      
      // Features Section
      features={[
        {
          title: "Tokenização Multi-Ativo",
          description: "Plataforma flexível para tokenização de diferentes classes de ativos como imóveis, arte, commodities e títulos.",
          icon: "🏢",
          color: "purple"
        },
        {
          title: "Conformidade Regulatória",
          description: "Sistema integrado de KYC/AML e conformidade com regulamentações locais e globais para tokenização de ativos.",
          icon: "⚖️",
          color: "green"
        },
        {
          title: "Fracionamento Inteligente",
          description: "Mecanismo avançado para fracionamento de ativos com gestão automática de direitos e dividendos.",
          icon: "📊",
          color: "purple"
        },
        {
          title: "Mercado Secundário",
          description: "Ambiente de negociação integrado para tokens de ativos com liquidez e descoberta de preços.",
          icon: "💱",
          color: "green"
        }
      ]}
      
      processTitle="Processo de Tokenização"
      processSteps={[
        {
          title: "Avaliação e Due Diligence",
          description: "Análise completa do ativo, documentação legal e avaliação de viabilidade para tokenização.",
          icon: "📋"
        },
        {
          title: "Estruturação do Token",
          description: "Definição das características do token, direitos, governança e mecanismos de distribuição.",
          icon: "⚙️"
        },
        {
          title: "Emissão e Distribuição",
          description: "Deploy dos smart contracts, mint dos tokens e distribuição inicial para investidores.",
          icon: "🚀"
        },
        {
          title: "Gestão e Governança",
          description: "Administração contínua do ativo tokenizado, distribuição de rendimentos e governança.",
          icon: "🔄"
        }
      ]}
      
      benefitsTitle="Benefícios da Tokenização"
      benefitGroups={[
        {
          title: "Para Emissores",
          benefits: [
            "Acesso a um pool global de investidores",
            "Redução de custos operacionais",
            "Maior liquidez para ativos ilíquidos",
            "Automação de processos administrativos"
          ],
          color: "primary"
        },
        {
          title: "Para Investidores",
          benefits: [
            "Investimento fracionado em ativos premium",
            "Maior transparência e rastreabilidade",
            "Negociação 24/7 em mercado secundário",
            "Gestão simplificada de portfolio"
          ],
          color: "secondary"
        }
      ]}
    />
  );
} 
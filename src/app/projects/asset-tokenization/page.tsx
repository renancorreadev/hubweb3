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
    "Hardhat",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AWS"
  ];

  // Mídia do projeto
  const mediaItems: MediaItem[] = [
    {
      type: "image",
      url: "/images/projects/loyahub/API_Infra.png",
      alt: "Asset Tokenization Platform",
      title: "Plataforma de Tokenização",
      description: "Interface principal da plataforma de tokenização de ativos"
    },
    {
      type: "video",
      url: "/media/docker.mp4",
      thumbnail: "/images/projects/docker-thumb.jpg",
      title: "Demo da Plataforma",
      description: "Demonstração das principais funcionalidades da plataforma"
    }
  ];

  const architectureDetails = {
    title: "Arquitetura da Plataforma",
    description: "A arquitetura da plataforma de tokenização de ativos é projetada para ser modular, escalável e segura. O sistema é construído com base em três principais componentes que trabalham em harmonia para fornecer uma solução completa de tokenização.",
    flowchartImage: {
      type: "image" as const, 
      url: "/images/projects/loyahub/blockmonitor.png",
      alt: "Arquitetura da Plataforma de Tokenização de Ativos",
      title: "Visão Geral da Arquitetura",
      description: "Diagrama detalhado mostrando a interação entre os componentes do sistema"
    },
    highlights: [
      {
        title: "Smart Contracts Layer",
        description: "Camada fundamental que gerencia os tokens, direitos e transações através de contratos inteligentes auditados e seguros.",
        icon: "⚡"
      },
      {
        title: "Middleware & APIs",
        description: "Camada intermediária que processa eventos da blockchain, gerencia dados off-chain e fornece APIs para integrações.",
        icon: "🔄"
      },
      {
        title: "Interface & UX",
        description: "Interface moderna e intuitiva que simplifica a interação com ativos tokenizados e processos complexos.",
        icon: "💻"
      },
      {
        title: "Segurança & Compliance",
        description: "Sistema robusto de segurança com múltiplas camadas de proteção e conformidade regulatória integrada.",
        icon: "🔒"
      },
      {
        title: "Escalabilidade",
        description: "Arquitetura projetada para crescer, suportando múltiplos tipos de ativos e grande volume de transações.",
        icon: "🚀"
      },
      {
        title: "Interoperabilidade",
        description: "Capacidade de integração com diferentes blockchains e sistemas externos através de bridges e oráculos.",
        icon: "🌐"
      }
    ]
  };

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
      githubUrl="https://github.com/hubweb3/asset-tokenization"
      demoUrl="https://asset-tokenization.hubweb3.com"
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
      architectureDetails={architectureDetails}
      
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
      
      architectureTitle="Arquitetura"
      architectureDescription="Nossa plataforma de tokenização de ativos é construída sobre uma arquitetura modular e escalável,
        combinando smart contracts seguros com uma interface moderna e intuitiva. O sistema utiliza
        contratos ERC-1155 para suportar múltiplos tipos de tokens e implementa mecanismos avançados
        de governança e compliance."
      architectureSections={[
        {
          title: "Smart Contracts",
          items: [
            "Contratos ERC-1155 customizados",
            "Sistema de governança on-chain",
            "Gestão de direitos e dividendos",
            "Mecanismos de compliance"
          ]
        },
        {
          title: "Backend & APIs",
          items: [
            "Indexação e cache de eventos",
            "APIs REST e GraphQL",
            "Integração com KYC/AML",
            "Sistema de notificações"
          ]
        },
        {
          title: "Frontend & UX",
          items: [
            "Interface responsiva moderna",
            "Dashboards interativos",
            "Carteira digital integrada",
            "Analytics em tempo real"
          ]
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
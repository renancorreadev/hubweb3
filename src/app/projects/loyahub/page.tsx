"use client";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { MediaItem } from "@/components/MediaRenderer";

export default function LoyaHub() {
  const { t } = useTranslation();

  const techStack = [
    "Solidity",
    "ERC-20",
    "Polygon",
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
      url: "/images/projects/loyahub/demo.mp4",
      thumbnail: "/images/projects/loyahub/thumb.png",
      title: "Demo do App",
      description: "Demonstração das principais funcionalidades do aplicativo"
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
      imagePath="/images/projects/loyahub.jpg"
      githubUrl="https://github.com/hubweb3/loyahub"
      demoUrl="https://loyahub.hubweb3.com"
      nextProject={{
        name: t("projects.rwa.title"),
        url: "/projects/rwa"
      }}
      prevProject={{
        name: t("projects.drex.title"),
        url: "/projects/drex"
      }}
      
      // Architecture Section
      hasArchitecture={true}
      architectureDetails={{
        title: t("projects.architecture"),
        description: "O LoyaHub utiliza uma arquitetura de várias camadas que combina blockchain para registro imutável e transparente de pontos de fidelidade com sistemas tradicionais para desempenho e usabilidade.",
        overview: "Os tokens de fidelidade são implementados como tokens ERC-20 personalizados na rede Polygon, garantindo baixas taxas e alta velocidade de transação.",
        sections: [
          {
            title: "Arquitetura do Sistema",
            description: "Estrutura em camadas do LoyaHub",
            diagrams: [
              {
                url: "/images/projects/loyahub/architecture.png",
                alt: "LoyaHub Architecture",
                diagramType: "architecture",
                description: "Visão geral da arquitetura do sistema"
              }
            ]
          }
        ],
        highlights: [
          {
            title: "Camada Blockchain",
            description: "Contratos para tokens de fidelidade, sistema de conversão entre tokens, regras de governança para coalizões e registros imutáveis de transações",
            icon: "🔗"
          },
          {
            title: "Camada de API",
            description: "Endpoints RESTful e GraphQL, autenticação e autorização, indexação e cache para desempenho, integração com sistemas empresariais",
            icon: "🔌"
          },
          {
            title: "Aplicações Cliente",
            description: "App mobile React Native, painel administrativo React, widgets para integração em sites e SDK para desenvolvedores",
            icon: "📱"
          }
        ]
      }}
      
      // Features Section
      features={[
        {
          title: "Tokenização de Pontos",
          description: "Conversão de programas de fidelidade tradicionais em tokens blockchain, garantindo transparência e portabilidade.",
          icon: "🔄",
          color: "purple"
        },
        {
          title: "Interoperabilidade entre Marcas",
          description: "Sistema de coalizão que permite cooperação entre diferentes empresas e transferência de pontos entre programas.",
          icon: "🤝",
          color: "green"
        },
        {
          title: "App Mobile para Clientes",
          description: "Aplicativo intuitivo para consumidores rastrearem, acumularem e resgatarem pontos de fidelidade de múltiplas marcas.",
          icon: "📱",
          color: "purple"
        },
        {
          title: "Dashboard para Empresas",
          description: "Painel administrativo para empresas gerenciarem seus programas, ofertas e analisarem o comportamento dos clientes.",
          icon: "📊",
          color: "green"
        }
      ]}
      
      processTitle="Tipos de Recompensas"
      processSteps={[
        {
          title: "Pontos de Compra",
          description: "Acúmulo de pontos baseado em valor de compra, com diferentes níveis de multiplicadores por categoria.",
          icon: "🛍️"
        },
        {
          title: "Recompensas por Engajamento",
          description: "Bonificações por ações específicas como avaliações, compartilhamentos e participação em programas.",
          icon: "🎯"
        },
        {
          title: "Benefícios Exclusivos",
          description: "Acesso VIP, experiências únicas e produtos exclusivos desbloqueados com pontos ou níveis específicos.",
          icon: "🎁"
        },
        {
          title: "Cashback e Descontos",
          description: "Sistema de retorno em dinheiro e descontos progressivos baseados em pontuação e nível do usuário.",
          icon: "💰"
        }
      ]}
      
      benefitsTitle="Benefícios do Sistema"
      benefitGroups={[
        {
          title: "Para Empresas",
          benefits: [
            "Aumento significativo na retenção de clientes",
            "Redução nos custos operacionais do programa",
            "Insights valiosos sobre comportamento do consumidor"
          ],
          color: "primary"
        },
        {
          title: "Para Clientes",
          benefits: [
            "Acesso unificado a múltiplos programas de fidelidade",
            "Maior flexibilidade no uso dos pontos",
            "Transparência total sobre pontos e recompensas"
          ],
          color: "secondary"
        }
      ]}
    />
  );
} 
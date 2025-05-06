"use client";

import { ProjectLayout } from "@/components/ProjectLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Heading2, Body } from "@/components/Typography";
import { motion } from "framer-motion";

export default function CreatorPro() {
  const { t } = useTranslation();

  const techStack = [
    "React", 
    "Next.js", 
    "Solidity", 
    "Ethereum", 
    "IPFS", 
    "Node.js",
    "PostgreSQL",
    "TailwindCSS"
  ];

  return (
    <ProjectLayout
      title={t("projects.creatorPro.title")}
      subtitle={t("projects.creatorPro.subtitle")}
      description={t("projects.creatorPro.description")}
      tags={[t("projects.creatorPro.tag"), "NFT", "Marketplace"]}
      techStack={techStack}
      imagePath="/images/projects/creator-pro.jpg"
      githubUrl="https://github.com/hubweb3/creator-pro"
      demoUrl="https://creator-pro.hubweb3.com"
      nextProject={{
        name: t("projects.drex.title"),
        url: "/projects/drex"
      }}
      prevProject={{
        name: t("projects.assetTokenization.title"),
        url: "/projects/asset-tokenization"
      }}
    >
      <div className="space-y-12">
        <section>
          <Heading2>{t("projects.features")}</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                title: "NFT Marketplace",
                description: "Plataforma completa para criação, venda e troca de NFTs com suporte a coleções e royalties para criadores.",
                icon: "🖼️"
              },
              {
                title: "Token de Comunidade",
                description: "Criadores podem lançar seus próprios tokens de comunidade para engajar seus fãs com benefícios exclusivos.",
                icon: "🪙"
              },
              {
                title: "Streaming de Pagamentos",
                description: "Sistema de streaming de pagamentos para acesso contínuo a conteúdo exclusivo e dividendos automáticos.",
                icon: "💸"
              },
              {
                title: "Conteúdo Exclusivo",
                description: "Plataforma para disponibilizar conteúdo exclusivo para detentores de tokens específicos, com verificação on-chain.",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "rgba(20, 241, 149, 0.05)",
                  border: "1px solid rgba(20, 241, 149, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <Heading2>{t("projects.architecture")}</Heading2>
          <Body>
            A plataforma Creator PRO utiliza uma arquitetura distribuída que combina blockchain e armazenamento descentralizado para garantir a propriedade dos criadores sobre seu conteúdo e a integridade das transações. Os metadados dos NFTs são armazenados em IPFS, enquanto contratos inteligentes na blockchain Ethereum gerenciam direitos, royalties e propriedade.
          </Body>
          
          <div className="mt-8 p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Front-end</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Next.js para renderização</li>
                  <li>TailwindCSS para estilos</li>
                  <li>Ethers.js para interação blockchain</li>
                  <li>Sistema de autenticação com wallet</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Back-end</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Node.js com API RESTful</li>
                  <li>PostgreSQL para dados off-chain</li>
                  <li>Serviço de indexação para eventos</li>
                  <li>Microsserviço de gerenciamento de mídia</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Blockchain</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Contratos inteligentes em Solidity</li>
                  <li>Tokens ERC-721 e ERC-1155 para NFTs</li>
                  <li>ERC-20 para tokens de comunidade</li>
                  <li>Sistema de verificação on-chain</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
}

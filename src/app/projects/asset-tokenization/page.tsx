"use client";

import { ProjectLayout } from "@/components/ProjectLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Heading2, Body } from "@/components/Typography";
import { motion } from "framer-motion";

export default function AssetTokenization() {
  const { t } = useTranslation();

  const techStack = [
    "Solidity",
    "ERC-1400",
    "ERC-3643",
    "Polygon",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL"
  ];

  return (
    <ProjectLayout
      title={t("projects.assetTokenization.title")}
      subtitle={t("projects.assetTokenization.subtitle")}
      description={t("projects.assetTokenization.description")}
      tags={[t("projects.assetTokenization.tag"), "DeFi", "RWA"]}
      techStack={techStack}
      imagePath="/images/projects/asset-tokenization.jpg"
      githubUrl="https://github.com/hubweb3/asset-tokenization"
      demoUrl="https://assets.hubweb3.com"
      nextProject={{
        name: t("projects.creatorPro.title"),
        url: "/projects/creator-pro"
      }}
      prevProject={{
        name: t("projects.besuScope.title"),
        url: "/projects/besu-scope"
      }}
    >
      <div className="space-y-12">
        <section>
          <Heading2>{t("projects.features")}</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                title: "Tokenização Compliant",
                description: "Plataforma para tokenização de ativos com conformidade regulatória integrada, suportando KYC, AML e restrições de transferência.",
                icon: "🏢"
              },
              {
                title: "Fracionamento de Ativos",
                description: "Divisão de ativos de alto valor em frações digitais, permitindo investimentos menores e maior liquidez.",
                icon: "✂️"
              },
              {
                title: "Mercado Secundário",
                description: "Marketplace integrado para negociação de tokens de ativos, com liquidez organizada e transparência nas transações.",
                icon: "🔄"
              },
              {
                title: "Gestão de Dividendos",
                description: "Distribuição automática de rendimentos e dividendos para detentores de tokens, com rastreabilidade completa.",
                icon: "💰"
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
            A plataforma de tokenização de ativos utiliza uma arquitetura modular baseada em contratos inteligentes que implementam os padrões ERC-1400 e ERC-3643 para tokens de segurança compliant. O sistema inclui um módulo de identidade digital para KYC/AML, gerenciamento de permissões, e integração com sistemas financeiros tradicionais para liquidação e custódia.
          </Body>
          
          <div className="mt-8 p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Módulo de Tokenização</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Contratos ERC-1400/ERC-3643</li>
                  <li>Sistema de particionamento</li>
                  <li>Controles de transferência</li>
                  <li>Gestão de compliance</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Módulo de Identidade</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Sistema de identidade verificável</li>
                  <li>Integração com provedores KYC</li>
                  <li>Lista de permissões e restrições</li>
                  <li>Monitoramento AML</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Módulo de Mercado</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Livro de ofertas descentralizado</li>
                  <li>Sistema de correspondência</li>
                  <li>Ordens com limite e mercado</li>
                  <li>Liquidação automática</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading2>Casos de Uso</Heading2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(153, 69, 255, 0.05)",
                border: "1px solid rgba(153, 69, 255, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Tokenização Imobiliária</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Conversão de propriedades imobiliárias em tokens digitais, permitindo investimento fracionado e rentabilidade através de aluguel ou valorização do imóvel.
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Retorno médio: 8-12% ao ano</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(153, 69, 255, 0.05)",
                border: "1px solid rgba(153, 69, 255, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Títulos de Dívida</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Tokenização de títulos de crédito corporativo, com pagamento automático de juros, amortização programada e segurança jurídica.
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Redução de custos operacionais: 70%</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(153, 69, 255, 0.05)",
                border: "1px solid rgba(153, 69, 255, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Arte e Colecionáveis</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Fracionamento de obras de arte e itens colecionáveis valiosos, permitindo propriedade compartilhada e valorização do ativo ao longo do tempo.
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Acessibilidade: investimento mínimo de R$ 100</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(153, 69, 255, 0.05)",
                border: "1px solid rgba(153, 69, 255, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Recebíveis e Direitos Creditórios</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Tokenização de recebíveis comerciais e direitos creditórios, criando liquidez imediata para empresas e oportunidades de investimento para investidores.
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Antecipação de recebíveis com custo 40% menor</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
} 
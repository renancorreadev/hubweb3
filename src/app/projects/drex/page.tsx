"use client";

import { ProjectLayout } from "@/components/ProjectLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Heading2, Body } from "@/components/Typography";
import { motion } from "framer-motion";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

export default function DrexProject() {
  const { t } = useTranslation();
  const { isDark } = useThemeColors();

  const techStack = [
    "Hyperledger Besu",
    "Solidity",
    "Java",
    "Spring Boot",
    "Docker",
    "Kubernetes",
    "React",
    "Next.js",
    "PostgreSQL",
    "AWS",
    "Go",
    "Node.js",
    "TypeScript",
    "Hardhat",
    "Web3.js",
    "Ethers.js"
  ];

  return (
    <ProjectLayout
      title={t("projects.drex.title")}
      subtitle={t("projects.drex.subtitle")}
      description={t("projects.drex.description")}
      tags={[t("projects.drex.tag"), "Sandbox", "Central Bank", "Blockchain"]}
      techStack={techStack}
      imagePath="/images/projects/drex/drex.png"
      githubUrl="https://github.com/hubweb3/drex-sandbox"
      demoUrl="https://drex.hubweb3.com"
      nextProject={{
        name: t("projects.loyahub.title"),
        url: "/projects/loyahub"
      }}
      prevProject={{
        name: t("projects.creatorPro.title"),
        url: "/projects/creator-pro"
      }}
    >
      <div className="space-y-12">
        <section>
          <Heading2>{t("projects.drex.experience.title")}</Heading2>
          <Body>
            {t("projects.drex.experience.description")}
          </Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                Avanade
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Desenvolvimento core do DREX, implementando contratos RealDigital-Token e infraestrutura base.
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                GFT
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Sistema de tokenização de CCBs com integração ao SNG e B3.
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                Opea
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Tokenização de recebíveis com sistema de distribuição de rendimentos automatizado.
              </p>
            </motion.div>
          </div>
        </section>

        <section>
          <Heading2>{t("projects.features")}</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                title: t("projects.drex.features.sandbox.title"),
                description: t("projects.drex.features.sandbox.description"),
                icon: "🧪"
              },
              {
                title: t("projects.drex.features.interop.title"),
                description: t("projects.drex.features.interop.description"),
                icon: "🔄"
              },
              {
                title: t("projects.drex.features.contracts.title"),
                description: t("projects.drex.features.contracts.description"),
                icon: "📝"
              },
              {
                title: t("projects.drex.features.dashboard.title"),
                description: t("projects.drex.features.dashboard.description"),
                icon: "📊"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: isDark ? "rgba(153, 69, 255, 0.05)" : "rgba(122, 53, 204, 0.05)",
                  border: isDark ? "1px solid rgba(153, 69, 255, 0.2)" : "1px solid rgba(122, 53, 204, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <Heading2>{t("projects.drex.architecture.title")}</Heading2>
          <Body>
            {t("projects.drex.architecture.description")}
          </Body>

          <div className="mt-8 p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">
                  {t("projects.drex.infrastructure.title")}
                </h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {(t("projects.drex.infrastructure.items") as unknown as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">
                  {t("projects.drex.middleware.title")}
                </h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {(t("projects.drex.middleware.items") as unknown as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">
                  {t("projects.drex.applications.title")}
                </h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {(t("projects.drex.applications.items") as unknown as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading2>{t("projects.drex.implementations.title")}</Heading2>
          <div className="mt-8 space-y-8">
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: isDark ? "rgba(20, 241, 149, 0.05)" : "rgba(14, 166, 107, 0.05)",
                border: isDark ? "1px solid rgba(20, 241, 149, 0.2)" : "1px solid rgba(14, 166, 107, 0.2)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {t("projects.drex.implementations.avanade")}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Implementação de contratos seguindo especificações RealDigital-Token, incluindo RealTokenizado (RDT) com padrão ERC-20, RealDigital (RD) com mecanismos de controle do BACEN, e contratos de DVP com atomicidade garantida.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Arquitetura de permissionamento hierárquico</li>
                  <li>Padrões de endereçamento determinístico</li>
                  <li>Estruturas de dados padronizadas para interoperabilidade</li>
                  <li>Implementação de eventos padronizados</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: isDark ? "rgba(20, 241, 149, 0.05)" : "rgba(14, 166, 107, 0.05)",
                border: isDark ? "1px solid rgba(20, 241, 149, 0.2)" : "1px solid rgba(14, 166, 107, 0.2)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {t("projects.drex.implementations.gft")}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Sistema de tokenização de CCBs com integração ao Sistema Nacional de Gravames (SNG), orquestração de fluxos com B3 e DETRAN, e sistema de liquidação automática de financiamentos.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Implementação de contratos core para operações financeiras</li>
                  <li>Sistema de privacidade em camadas com Ralys</li>
                  <li>Integração com Parfin para custódia institucional</li>
                  <li>Sistema de assinaturas múltiplas e gestão de chaves empresarial</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: isDark ? "rgba(20, 241, 149, 0.05)" : "rgba(14, 166, 107, 0.05)",
                border: isDark ? "1px solid rgba(20, 241, 149, 0.2)" : "1px solid rgba(14, 166, 107, 0.2)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {t("projects.drex.implementations.opea")}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Sistema de tokenização de recebíveis com fracionamento de ativos financeiros, sistema de distribuição de rendimentos e gestão de garantias on-chain.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Processamento inteligente com IA/LLM para análise de contratos</li>
                  <li>Sistema de waterfall de pagamentos automatizado</li>
                  <li>Distribuição automática de juros</li>
                  <li>Gestão de inadimplência e execução de garantias</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        <section>
          <Heading2>{t("projects.drex.highlights.title")}</Heading2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {t("projects.drex.highlights.security.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("projects.drex.highlights.security.description")}
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {t("projects.drex.highlights.performance.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("projects.drex.highlights.performance.description")}
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {t("projects.drex.highlights.interop.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("projects.drex.highlights.interop.description")}
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {t("projects.drex.highlights.monitoring.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("projects.drex.highlights.monitoring.description")}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
} 
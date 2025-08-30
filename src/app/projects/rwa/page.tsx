"use client";

import { ProjectLayout } from "@/components/ProjectLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Heading2, Body } from "@/components/Typography";
import { motion } from "framer-motion";
import { RenderContainer } from "@/shared/components/RenderContainer";

export default function RwaConnect() {
  const { t } = useTranslation();

  const techStack = [
    "Solidity",
    "ERC-1155",
    "Chainlink",
    "The Graph",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
  ];

  return (
    <RenderContainer>
      <ProjectLayout
        title={t("projects.rwa.title")}
        subtitle={t("projects.rwa.subtitle")}
        description={t("projects.rwa.description")}
        tags={[t("projects.rwa.tag"), "RWA", "DeFi"]}
        techStack={techStack}
        imagePath="/images/projects/CreatorPro.png"
        githubUrl="https://github.com/hubweb3/rwa-connect"
        demoUrl="https://rwa.hubweb3.com"
        nextProject={{
          name: t("projects.assetTokenization.title"),
          url: "/projects/asset-tokenization",
        }}
        prevProject={{
          name: t("projects.loyahub.title"),
          url: "/projects/loyahub",
        }}
      >
        <div className="space-y-12">
          <section>
            <Heading2>{t("projects.features")}</Heading2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {[
                {
                  title: "Infraestrutura para Tokenização",
                  description:
                    "Framework completo para emissão, gestão e negociação de tokens que representam ativos do mundo real.",
                  icon: "🏗️",
                },
                {
                  title: "Oráculos para Precificação",
                  description:
                    "Sistema de oráculos para conectar dados do mundo real à blockchain, assegurando precificação justa e transparente.",
                  icon: "🔮",
                },
                {
                  title: "Protocolos de Conformidade",
                  description:
                    "Camada de compliance integrada para garantir que todas as transações sigam regulamentações locais e globais.",
                  icon: "📋",
                },
                {
                  title: "Soluções de Liquidez",
                  description:
                    "Provedores de liquidez e mecanismos para mercado secundário de ativos tokenizados com baixo atrito.",
                  icon: "💧",
                },
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
            <Heading2>{t("projects.architecture")}</Heading2>
            <Body>
              O RWA Connect é construído como uma infraestrutura modular que
              conecta sistemas financeiros tradicionais com blockchain,
              oferecendo todos os componentes necessários para tokenizar,
              transacionar e gerenciar ativos do mundo real. A plataforma
              utiliza uma arquitetura multi-camada que combina contratos
              inteligentes, serviços de oráculos e interfaces APIs padronizadas.
            </Body>

            <div className="mt-8 p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                  <h4 className="font-bold mb-2 text-black dark:text-white">
                    Camada de Tokenização
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>Contratos inteligentes ERC-1155</li>
                    <li>Sistemas de emissão e custódia</li>
                    <li>Fracionamento e agrupamento</li>
                    <li>Conformidade normativa on-chain</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                  <h4 className="font-bold mb-2 text-black dark:text-white">
                    Camada de Oráculos
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>Integração com Chainlink</li>
                    <li>Fontes de dados verificadas</li>
                    <li>Avaliação de ativos em tempo real</li>
                    <li>Gatilhos para eventos externos</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                  <h4 className="font-bold mb-2 text-black dark:text-white">
                    Camada de Integração
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>APIs para sistemas financeiros</li>
                    <li>Conectores para custódia tradicional</li>
                    <li>Interfaces para compliance KYC/AML</li>
                    <li>Webhooks para processos de negócio</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <Heading2>Classes de Ativos Suportadas</Heading2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  Imóveis
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Tokenização de propriedades residenciais, comerciais e
                  terrenos, permitindo fracionamento e negociação simplificada.
                </p>
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
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  Ativos Financeiros
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Títulos, recebíveis, empréstimos e direitos creditórios
                  tokenizados com pagamento automático de juros e principal.
                </p>
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
                <div className="text-4xl mb-4">🌾</div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  Commodities
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Tokens lastreados em commodities físicas como ouro, petróleo,
                  produtos agrícolas e recursos naturais.
                </p>
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
                <div className="text-4xl mb-4">🏭</div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  Ativos Alternativos
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Arte, colecionáveis, propriedade intelectual e outros ativos
                  não convencionais com validação e custódia segura.
                </p>
              </motion.div>
            </div>
          </section>

          <section>
            <Heading2>Benefícios do Sistema</Heading2>
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bloco 1 */}
                <motion.div
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 to-green-900/30 p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-black/5 dark:bg-white/5"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-6 text-black dark:text-white">
                      Para Emissores
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-purple-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Redução de até 65% nos custos de emissão e gestão
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-purple-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Acesso a uma base mais ampla de investidores globais
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-purple-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Automatização de distribuição de dividendos e
                          rendimentos
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Bloco 2 */}
                <motion.div
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/30 to-purple-900/30 p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-black/5 dark:bg-white/5"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-6 text-black dark:text-white">
                      Para Investidores
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Acesso a ativos tradicionalmente inacessíveis ou
                          ilíquidos
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Investimento fracionado a partir de pequenos valores
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Maior transparência e rastreabilidade das operações
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Estatísticas */}
              <motion.div
                className="mt-10 p-6 rounded-xl"
                style={{
                  backgroundColor: "rgba(20, 241, 149, 0.05)",
                  border: "1px solid rgba(20, 241, 149, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-6 text-black dark:text-white">
                  Impacto no Mercado
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-black/5 dark:bg-white/5">
                    <div className="text-4xl font-bold mb-2 text-hub-primary dark:text-hub-primary">
                      3.2T
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Potencial de mercado para tokenização de ativos até 2030
                      (USD)
                    </p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-black/5 dark:bg-white/5">
                    <div className="text-4xl font-bold mb-2 text-hub-primary dark:text-hub-primary">
                      87%
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Redução no tempo de liquidação de transações com ativos
                      tokenizados
                    </p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-black/5 dark:bg-white/5">
                    <div className="text-4xl font-bold mb-2 text-hub-primary dark:text-hub-primary">
                      65%
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Redução em custos operacionais para emissores e gestores
                      de ativos
                    </p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-black/5 dark:bg-white/5">
                    <div className="text-4xl font-bold mb-2 text-hub-primary dark:text-hub-primary">
                      24/7
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Disponibilidade do mercado para negociação de ativos
                      tokenizados
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </ProjectLayout>
    </RenderContainer>
  );
}

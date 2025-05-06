"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Body, Heading2, Heading4, Typography } from "@/components/Typography";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { motion } from "framer-motion";
import { BlockchainNode } from "./BlockchainNode";
import { BlockchainParticles } from "./BlockchainParticles";

interface ExperienceData {
  company: string;
  position: string;
  period: string;
  description: string[];
  hash: string;
}

/**
 * Componente de experiência profissional com visualização blockchain
 * Versão otimizada que inicia mineração ao clicar para expandir
 */
export const Experience = () => {
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();

  // State mínimo apenas para SSR e montagem inicial
  const [mounted, setMounted] = useState(false);

  // Todos os dados pré-processados e isolados em refs para evitar re-renderizações
  const timelineRef = useRef<HTMLDivElement>(null);
  const chainInitializedRef = useRef(false);
  const minedNodesRef = useRef<Record<number, boolean>>({});
  const visibleNodesRef = useRef<Record<number, boolean>>({});
  const nodeRefsMap = useRef<Map<number, HTMLDivElement>>(new Map());

  // Força re-renderização apenas quando absolutamente necessário
  const forceUpdateRef = useRef<() => void>(() => {});
  const [forceUpdateCounter, setForceUpdateCounter] = useState(0);
  forceUpdateRef.current = () => setForceUpdateCounter((prev) => prev + 1);

  // Dados imutáveis memo-izados para evitar recriações
  const experienceData = useMemo<ExperienceData[]>(() => {
    // Função para gerar hash aleatório (simulação)
    const generateHash = () => {
      const characters = "0123456789abcdef";
      let result = "0x";
      for (let i = 0; i < 12; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    return [
      {
        company: "Opea",
        position: "Senior Blockchain Architect Engineer",
        period: "2024 - 2025",
        description: [
          "Especialista e arquiteto em tokenização de imóveis e recebíveis em securitização com contratos inteligentes",
          "Desenvolvimento de APIs, automações e integração com Front-end em redes EVM",
          "Estruturação de ambientes privados com Kubernetes e Hyperledger Besu",
          "Implantação de IA/LLM para parsing de dados e fluxos automatizados de securitização",
          "Foco em rastreabilidade de ativos, governança corporativa e compliance regulatório",
        ],
        hash: generateHash(),
      },
      {
        company: "GFT Technologies",
        position: "Senior Blockchain Engineer",
        period: "2023 - 2024",
        description: [
          "Desenvolvimento de soluções blockchain em redes permissionadas e privadas",
          "Contratos inteligentes auditados e protocolos compatíveis com EVM",
          "Infraestrutura blockchain com Docker, Kubernetes e nuvens públicas",
          "Desenvolvimento de APIs robustas e arquitetura escalável para ecossistemas blockchain",
        ],
        hash: generateHash(),
      },
      {
        company: "Avanade",
        position: "Software Engineer — Back-End Blockchain",
        period: "2022 - 2023",
        description: [
          "Aplicações blockchain com Hyperledger, Hardhat e Solidity",
          "APIs e microsserviços com Node.js, NestJS e Rust",
          "Práticas com DDD, TDD e Design Patterns em arquitetura backend",
        ],
        hash: generateHash(),
      },
      {
        company: "MusicPRO",
        position: "Software Engineer — Blockchain",
        period: "2021 - 2022",
        description: [
          "Arquiteturas blockchain com Hyperledger Fabric e Ethereum",
          "Desenvolvimento da plataforma NFT Music PRO",
        ],
        hash: generateHash(),
      },
      {
        company: "CodeBy",
        position: "Full Stack Developer",
        period: "2019 - 2021",
        description: [
          "Desenvolvimento de e-commerces com VTEX e Shopify",
          "APIs, componentes customizados, testes e integrações com gateways",
        ],
        hash: generateHash(),
      },
      {
        company: "Omnes Blockchain.tech",
        position: "Fullstack Blockchain Developer",
        period: "2018 - 2019",
        description: [
          "Arquiteturas limpas com blockchain, SOLID, TDD e DDD",
          "Smart contracts com Solidity e integração front-end com React",
        ],
        hash: generateHash(),
      },
      {
        company: "Santuário Nacional de Aparecida",
        position: "Assistente de Suporte de TI",
        period: "2014 - 2018",
        description: ["Suporte técnico e infraestrutura de TI"],
        hash: generateHash(),
      },
    ];
  }, []);

  // Dados imutáveis
  const certifications = [
    "Full Cycle 3 (2023)",
    "NodeJS React - Rocketseat (2022)",
    "Hyperledger Besu (2025)",
  ];

  // Estatísticas blockchain (elementos decorativos)
  const blockchainStats = [
    { label: "Smart Contracts", value: "47+", icon: "📝" },
    { label: "Redes Blockchain", value: "8+", icon: "🔗" },
    { label: "Projetos DeFi", value: "12+", icon: "💰" },
    { label: "Tokens Criados", value: "23+", icon: "🪙" },
  ];

  // Callback quando mineração é completada - imperativo sem alterar estado
  const handleMiningComplete = (index: number) => {
    // Registra como minerado
    minedNodesRef.current[index] = true;
    // Força re-renderização para atualizar o contador de blocos minerados
    forceUpdateRef.current();
  };

  // Gerencia registro de referências DOM para cada nó
  const handleNodeRef = (index: number, ref: HTMLDivElement | null) => {
    if (ref) {
      nodeRefsMap.current.set(index, ref);
    } else {
      nodeRefsMap.current.delete(index);
    }
  };

  // Setup do Intersection Observer - apenas uma vez - agora apenas marca como visível
  useEffect(() => {
    if (!mounted || !timelineRef.current) return;

    // Configuração do observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0",
            10
          );

          if (entry.isIntersecting) {
            // Marca como visível
            if (!visibleNodesRef.current[index]) {
              visibleNodesRef.current[index] = true;
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "50px 0px",
        threshold: 0.2,
      }
    );

    // Observa todos os nós blockchain
    const nodeElements =
      timelineRef.current.querySelectorAll(".blockchain-node");
    nodeElements.forEach((node) => observer.observe(node));

    // Inicializa a cadeia após um breve delay
    const initTimer = setTimeout(() => {
      chainInitializedRef.current = true;
      forceUpdateRef.current();
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(initTimer);
    };
  }, [mounted, experienceData.length]);

  // Apenas para SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calcula quantidade total de blocos minerados
  const minedBlocksCount = useMemo(() => {
    return Object.values(minedNodesRef.current).filter(Boolean).length;
  }, [forceUpdateCounter]);

  if (!mounted) return null;

  return (
    <section
      className={`py-16 md:py-24 relative overflow-hidden ${
        isDark ? "dark" : "light"
      }`}
      style={{
        backgroundColor: isDark
          ? "rgba(8, 8, 12, 0.97)"
          : "rgba(248, 250, 252, 0.95)",
        backgroundImage: isDark
          ? `radial-gradient(circle at 25% 25%, rgba(153, 69, 255, 0.05), transparent 25%), radial-gradient(circle at 75% 75%, rgba(20, 241, 149, 0.05), transparent 25%)`
          : `radial-gradient(circle at 25% 25%, rgba(122, 53, 204, 0.03), transparent 25%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.03), transparent 25%)`,
      }}
    >
      {/* Background decorativo - representação de blockchain */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, ${
              isDark ? "rgba(153, 69, 255, 0.07)" : "rgba(122, 53, 204, 0.05)"
            }, transparent 25%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 70%, ${
              isDark ? "rgba(20, 241, 149, 0.05)" : "rgba(16, 185, 129, 0.03)"
            }, transparent 25%)`,
          }}
        />

        {/* Partículas de fundo */}
        <BlockchainParticles
          active={true}
          intensity={0.5}
          className="opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="relative inline-block">
            <div className="relative">
              <Heading2>{t("developer.experience.title")}</Heading2>
            </div>
          </div>

          <motion.div
            className="mx-auto py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Body>
              Minha trajetória desenvolvendo soluções blockchain, desde
              contratos inteligentes até infraestruturas completas para
              aplicações descentralizadas.
            </Body>
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-2/3">
            {/* Decorativo - Linha do tempo com indicadores de hash */}
            <div className="mb-6 flex flex-col md:flex-row">
              {/* Cabeçalho Mobile */}
              <div
                className="mb-3 md:mb-0 w-full md:w-auto flex items-center px-3 py-2 rounded-md md:mr-3 text-xs font-mono"
                style={{
                  backgroundColor: isDark
                    ? "rgba(30, 30, 35, 0.7)"
                    : "rgba(245, 245, 250, 0.9)",
                  borderLeft: `3px solid ${isDark ? "#14F195" : "#10B981"}`,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  className="mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 6.5H14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 17.5H14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.5 10V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17.5 10V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Latest blocks</span>
              </div>

              {/* Blocos rolável - otimizado para toque em mobile */}
              <div className="flex overflow-x-auto pb-2 scrollbar-hide touch-pan-x">
                {experienceData.slice(0, 5).map((exp, i) => (
                  <motion.div
                    key={`block-nav-${i}`}
                    className="flex-shrink-0 px-3 py-1.5 rounded-md mr-2 text-xs font-mono"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(30, 30, 35, 0.7)"
                        : "rgba(245, 245, 250, 0.9)",
                      border: `1px solid ${
                        minedNodesRef.current[i]
                          ? isDark
                            ? "#14F195"
                            : "#10B981"
                          : isDark
                          ? "rgba(153, 69, 255, 0.3)"
                          : "rgba(122, 53, 204, 0.2)"
                      }`,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          minedNodesRef.current[i]
                            ? "bg-green-400"
                            : "bg-gray-400"
                        }`}
                      />
                      #{i + 1}: {exp.hash.substring(0, 8)}
                    </div>
                  </motion.div>
                ))}
                {experienceData.length > 5 && (
                  <div className="flex items-center text-xs font-mono opacity-50 px-2">
                    +{experienceData.length - 5} more
                  </div>
                )}
              </div>
            </div>

            <div
              ref={timelineRef}
              className="relative blockchain-timeline blockchain-stats"
            >
              {/* Decorativo - Bloco Gênesis */}
              <motion.div
                className="absolute -top-8 left-16 z-30 px-3 py-1 rounded-lg -ml-12 font-mono text-xs"
                style={{
                  backgroundColor: isDark
                    ? "rgba(40, 40, 40, 0.9)"
                    : "rgba(240, 240, 240, 0.9)",
                  border: `1px solid ${isDark ? "#9945FF" : "#7A35CC"}`,
                  color: isDark ? "#9945FF" : "#7A35CC",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: chainInitializedRef.current ? 1 : 0,
                  y: chainInitializedRef.current ? 0 : -10,
                }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                GENESIS BLOCK
              </motion.div>

              {/* Timeline com nós blockchain - usando key estável */}
              {experienceData.map((exp, index) => (
                <div
                  key={`blockchain-node-${exp.hash}`}
                  className="blockchain-node"
                  data-index={index}
                  ref={(ref) => handleNodeRef(index, ref)}
                >
                  <BlockchainNode
                    company={exp.company}
                    position={exp.position}
                    period={exp.period}
                    description={exp.description}
                    hash={exp.hash}
                    index={index}
                    totalItems={experienceData.length}
                    active={false} // Não inicia ativo - usuário precisa clicar
                    mined={minedNodesRef.current[index] || false}
                    onMiningComplete={() => handleMiningComplete(index)}
                    stableKey={`node-${exp.hash}`}
                  />
                </div>
              ))}

              {/* Decorativo - Indicação de fim da blockchain */}
              <motion.div
                className="mt-6 mx-auto max-w-xs text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <div className="p-2 rounded-lg bg-black bg-opacity-20 text-xs font-mono">
                  <span className="opacity-70">End of blockchain reached</span>
                  <br />
                  <span>Total blocks: {experienceData.length}</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="space-y-8">
              {/* Instruções para interação */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-2xl border border-opacity-10 dark:border-opacity-20 p-4"
                style={{
                  borderColor: isDark ? getColor("border") : "#E5E5E5",
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.01)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="text-sm p-3 rounded-lg mb-0"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, rgba(153, 69, 255, 0.1), rgba(20, 241, 149, 0.05))"
                      : "linear-gradient(135deg, rgba(122, 53, 204, 0.05), rgba(16, 185, 129, 0.02))",
                    border: isDark
                      ? "1px dashed rgba(153, 69, 255, 0.3)"
                      : "1px dashed rgba(122, 53, 204, 0.2)",
                  }}
                >
                  <div className="font-bold mb-2">
                    <span className="mr-2">💡</span>
                    Como funciona esta visualização:
                  </div>
                  <ul className="space-y-2 opacity-90 text-xs">
                    <li>
                      • Clique na <b>seta circular</b> em qualquer bloco para
                      expandir detalhes
                    </li>
                    <li>
                      • Ao expandir, o bloco inicia a <b>mineração</b>{" "}
                      (simulando uma blockchain real)
                    </li>
                    <li>
                      • Os <b>dados hash</b> e campos de bloco mostram detalhes
                      técnicos da blockchain
                    </li>
                    <li>
                      • Cada bloco representa uma{" "}
                      <b>experiência profissional</b> na cadeia
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Painel de Certificações - Estilo Solana */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-2xl border border-opacity-10 dark:border-opacity-20"
                style={{
                  borderColor: isDark
                    ? "rgba(153, 69, 255, 0.2)"
                    : "rgba(122, 53, 204, 0.1)",
                  background: isDark
                    ? "linear-gradient(135deg, rgba(25, 25, 30, 0.95), rgba(20, 20, 25, 0.9))"
                    : "linear-gradient(135deg, white, rgba(250, 250, 255, 0.9))",
                  boxShadow: isDark
                    ? "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(153, 69, 255, 0.1)"
                    : "0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(122, 53, 204, 0.05)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: isDark
                          ? "linear-gradient(135deg, #9945FF, #14F195)"
                          : "linear-gradient(135deg, #7A35CC, #10B981)",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 15L8.5 11.5L9.91 10.09L12 12.17L18.18 6L19.59 7.41L12 15Z"
                          fill="white"
                        />
                        <path
                          d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V5H19V19Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <Typography variant="h3">
                      {t("developer.certifications.title")}
                    </Typography>
                  </div>

                  <ul className="space-y-4">
                    {certifications.map((cert, idx) => (
                      <motion.li
                        key={`cert-${idx}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(30, 30, 35, 0.5)"
                            : "rgba(245, 245, 250, 0.8)",
                          border: `1px solid ${
                            isDark
                              ? "rgba(153, 69, 255, 0.2)"
                              : "rgba(122, 53, 204, 0.1)"
                          }`,
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{
                            background: isDark
                              ? "linear-gradient(135deg, rgba(153, 69, 255, 0.2), rgba(20, 241, 149, 0.2))"
                              : "linear-gradient(135deg, rgba(122, 53, 204, 0.1), rgba(16, 185, 129, 0.1))",
                            border: `1px solid ${
                              isDark
                                ? "rgba(153, 69, 255, 0.3)"
                                : "rgba(122, 53, 204, 0.2)"
                            }`,
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              background: isDark
                                ? "linear-gradient(135deg, #9945FF, #14F195)"
                                : "linear-gradient(135deg, #7A35CC, #10B981)",
                            }}
                          />
                        </div>
                        <Typography variant="body">{cert}</Typography>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Painel de estatísticas blockchain - Estilo Solana */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-2xl border border-opacity-10 dark:border-opacity-20"
                style={{
                  borderColor: isDark
                    ? "rgba(153, 69, 255, 0.2)"
                    : "rgba(122, 53, 204, 0.1)",
                  background: isDark
                    ? "linear-gradient(135deg, rgba(25, 25, 30, 0.95), rgba(20, 20, 25, 0.9))"
                    : "linear-gradient(135deg, white, rgba(250, 250, 255, 0.9))",
                  boxShadow: isDark
                    ? "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(153, 69, 255, 0.1)"
                    : "0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(122, 53, 204, 0.05)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: isDark
                          ? "linear-gradient(135deg, #9945FF, #14F195)"
                          : "linear-gradient(135deg, #7A35CC, #10B981)",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 5H20V7H4V5Z" fill="white" />
                        <path d="M4 9H20V11H4V9Z" fill="white" />
                        <path d="M4 13H20V15H4V13Z" fill="white" />
                        <path d="M4 17H14V19H4V17Z" fill="white" />
                      </svg>
                    </div>
                    <Typography variant="h3">Blockchain Stats</Typography>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {blockchainStats.map((stat, idx) => (
                      <motion.div
                        key={`stat-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                        className="p-4 rounded-lg text-center"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(30, 30, 35, 0.5)"
                            : "rgba(245, 245, 250, 0.8)",
                          border: `1px solid ${
                            isDark
                              ? "rgba(153, 69, 255, 0.2)"
                              : "rgba(122, 53, 204, 0.1)"
                          }`,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <Typography variant="h4" className="mb-1">
                          {stat.value}
                        </Typography>
                        <Typography variant="small" className="opacity-70">
                          {stat.label}
                        </Typography>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Informações técnicas da blockchain (decorativo) - Estilo Solana */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-2xl border border-opacity-10 dark:border-opacity-20"
                style={{
                  borderColor: isDark
                    ? "rgba(153, 69, 255, 0.2)"
                    : "rgba(122, 53, 204, 0.1)",
                  background: isDark
                    ? "linear-gradient(135deg, rgba(25, 25, 30, 0.95), rgba(20, 20, 25, 0.9))"
                    : "linear-gradient(135deg, white, rgba(250, 250, 255, 0.9))",
                  boxShadow: isDark
                    ? "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(153, 69, 255, 0.1)"
                    : "0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(122, 53, 204, 0.05)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: isDark
                          ? "linear-gradient(135deg, #9945FF, #14F195)"
                          : "linear-gradient(135deg, #7A35CC, #10B981)",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L2 7L12 12L22 7L12 2Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 17L12 22L22 17"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 12L12 17L22 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Typography variant="h3">Experience Chain</Typography>
                  </div>

                  <div className="space-y-2 font-mono text-sm">
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(30, 30, 35, 0.5)"
                          : "rgba(245, 245, 250, 0.8)",
                        borderLeft: `3px solid ${
                          isDark ? "#9945FF" : "#7A35CC"
                        }`,
                      }}
                    >
                      <span className="opacity-60">Network:</span>{" "}
                      <span className="font-bold">
                        Career Blockchain (EXPR)
                      </span>
                    </div>
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(30, 30, 35, 0.5)"
                          : "rgba(245, 245, 250, 0.8)",
                        borderLeft: `3px solid ${
                          isDark ? "#9945FF" : "#7A35CC"
                        }`,
                      }}
                    >
                      <span className="opacity-60">Consensus:</span>{" "}
                      <span className="font-bold">
                        Proof of Work Experience
                      </span>
                    </div>
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(30, 30, 35, 0.5)"
                          : "rgba(245, 245, 250, 0.8)",
                        borderLeft: `3px solid ${
                          isDark ? "#14F195" : "#10B981"
                        }`,
                      }}
                    >
                      <span className="opacity-60">Mining difficulty:</span>{" "}
                      <span className="font-bold">
                        {(minedBlocksCount + 1) * 12.73}.5 TH/s
                      </span>
                    </div>
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(30, 30, 35, 0.5)"
                          : "rgba(245, 245, 250, 0.8)",
                        borderLeft: `3px solid ${
                          isDark ? "#14F195" : "#10B981"
                        }`,
                      }}
                    >
                      <span className="opacity-60">Mined blocks:</span>{" "}
                      <span className="font-bold flex items-center">
                        <span className="mr-2">
                          {minedBlocksCount} / {experienceData.length}
                        </span>
                        {minedBlocksCount > 0 && (
                          <span
                            className="px-2 py-0.5 text-xs rounded-full bg-green-500 text-white animate-pulse"
                            style={{ fontSize: "10px" }}
                          >
                            LIVE
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar de blocos minerados */}
                  <div className="mt-4">
                    <div className="text-xs mb-1 flex justify-between">
                      <span>Mining Progress</span>
                      <span>
                        {Math.round(
                          (minedBlocksCount / experienceData.length) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div
                      className="h-2 w-full rounded-full overflow-hidden"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(40, 40, 45, 0.5)"
                          : "rgba(230, 230, 235, 0.8)",
                      }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: isDark
                            ? "linear-gradient(90deg, #9945FF, #14F195)"
                            : "linear-gradient(90deg, #7A35CC, #10B981)",
                        }}
                        initial={{
                          width: `${
                            (minedBlocksCount / experienceData.length) * 100
                          }%`,
                        }}
                        animate={{
                          width: `${
                            (minedBlocksCount / experienceData.length) * 100
                          }%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Typography } from "@/components/Typography";
import { BlockchainCube } from "./BlockchainCube";
import { BlockchainParticles } from "./BlockchainParticles";
import Image from "next/image";

interface BlockchainNodeProps {
  company: string;
  position: string;
  period: string;
  description: string[];
  hash: string;
  index: number;
  totalItems: number;
  active: boolean;
  mined?: boolean;
  onMiningComplete?: () => void;
  stableKey?: string;
}

export const BlockchainNode = ({
  company,
  position,
  period,
  description,
  hash,
  index,
  totalItems,
  active,
  mined: externalMined = false,
  onMiningComplete,
  stableKey,
}: BlockchainNodeProps) => {
  const { isDark, getColor } = useThemeColors();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [mining, setMining] = useState(false);
  const [mined, setMined] = useState(externalMined);
  const [showDetails, setShowDetails] = useState(false);
  const [showVerified, setShowVerified] = useState(externalMined);
  const nodeRef = useRef<HTMLDivElement>(null);
  const callbackFiredRef = useRef(false);

  // Escuta eventos customizados para iniciar mineração de forma imperativa
  useEffect(() => {
    const currentNode = nodeRef.current;
    if (!currentNode) return;

    const handleStartMining = () => {
      if (!mined && !mining) {
        setMining(true);
      }
    };

    // Adiciona event listener para comando imperativo
    currentNode.addEventListener("startMining", handleStartMining);

    return () => {
      currentNode.removeEventListener("startMining", handleStartMining);
    };
  }, [mined, mining]);

  // Sincroniza com o estado externo
  useEffect(() => {
    if (externalMined && !mined) {
      setMined(true);
      setMining(false);
      setShowDetails(true);
      setShowVerified(true);
    }
  }, [externalMined, mined]);

  // Agora, a mineração começa apenas quando o nó está expandido e não minerado
  useEffect(() => {
    if (expanded && !mined && !mining) {
      const timer = setTimeout(() => {
        setMining(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [expanded, mined, mining]);

  // Quando a mineração é concluída
  const handleMiningComplete = () => {
    // Evita chamar o callback novamente se já estiver minerado
    if (mined || callbackFiredRef.current) return;

    callbackFiredRef.current = true;
    setMined(true);

    // Imediatamente define como minerado
    setMining(false);
    setShowVerified(true);
    setShowDetails(true);

    // Notifica o componente pai usando microtask para evitar loops de renderização
    if (onMiningComplete) {
      queueMicrotask(() => {
        onMiningComplete();
      });
    }
  };

  // Efeito para garantir que a mineração termine após um tempo máximo
  useEffect(() => {
    if (mining && !mined) {
      // Força a conclusão da mineração após 5 segundos no máximo
      const forceCompleteTimer = setTimeout(() => {
        if (!mined && mining) {
          console.log("Forçando conclusão da mineração por timeout");
          handleMiningComplete();
        }
      }, 5000);
      
      return () => clearTimeout(forceCompleteTimer);
    }
  }, [mining, mined]);

  // Expandir/contrair o nó e iniciar mineração
  const toggleExpand = () => {
    setExpanded(!expanded);
    
    // Se expandir e não estiver minerado, inicia mineração imediatamente
    if (!expanded && !mined) {
      setMining(true);
    }
  };

  // Criar dados nonce e timestamp - elementos decorativos para blockchain
  const nonce = useRef(Math.floor(Math.random() * 1000000) + 10000).current;
  const timestamp = useRef(Date.now() - index * 1500000).current;
  const formattedTimestamp = new Date(timestamp).toISOString();

  return (
    <motion.div
      ref={nodeRef}
      className="relative mb-16 md:mb-24 last:mb-8 last:md:mb-12 blockchain-node"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      {/* Conexão blockchain entre os nós - estilo Solana - visível apenas em desktop */}
      {index < totalItems - 1 && (
        <>
          <motion.div
            className="absolute left-16 top-32 w-1 bottom-0 z-0 hidden md:block"
            style={{
              background: isDark
                ? `linear-gradient(to bottom, #9945FF, rgba(20, 241, 149, 0.2))`
                : `linear-gradient(to bottom, #7A35CC, rgba(16, 185, 129, 0.2))`,
            }}
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
          />
          {/* Conectores horizontais para parecer mais com diagrama blockchain */}
          <motion.div
            className="absolute left-16 top-[32px] h-2 w-8 z-0 hidden md:block"
            style={{
              background: isDark
                ? "linear-gradient(90deg, rgba(153, 69, 255, 0.8), rgba(20, 241, 149, 0.5))"
                : "linear-gradient(90deg, rgba(122, 53, 204, 0.8), rgba(16, 185, 129, 0.5))",
              transform: "translateX(-100%)",
            }}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.7 + index * 0.2 }}
          />
          <motion.div
            className="absolute left-16 bottom-0 h-2 w-8 z-0 hidden md:block"
            style={{
              background: isDark
                ? "linear-gradient(90deg, rgba(153, 69, 255, 0.8), rgba(20, 241, 149, 0.5))"
                : "linear-gradient(90deg, rgba(122, 53, 204, 0.8), rgba(16, 185, 129, 0.5))",
              transform: "translateX(-100%)",
            }}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.9 + index * 0.2 }}
          />
        </>
      )}

      {/* Contêiner principal adaptado para mobile */}
      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* Cube 3D representando o nó/bloco - menor no mobile */}
        <motion.div
          className="relative w-32 h-32 shrink-0 z-20 mx-auto md:mx-0 mb-4 md:mb-0 md:block"
          whileHover={{ scale: 1.05 }}
        >
          {/* Anel em torno do nó, simulando blockchain - Estilo Solana */}
          <motion.div
            className="absolute inset-0 rounded-full z-10"
            style={{
              background: isDark
                ? `conic-gradient(
                    from ${index * 45}deg, 
                    #9945FF 0deg, 
                    transparent 60deg, 
                    #14F195 120deg,
                    transparent 180deg,
                    #9945FF 240deg,
                    transparent 300deg,
                    #14F195 360deg
                  )`
                : `conic-gradient(
                    from ${index * 45}deg, 
                    #7A35CC 0deg, 
                    transparent 60deg, 
                    #10B981 120deg,
                    transparent 180deg,
                    #7A35CC 240deg,
                    transparent 300deg,
                    #10B981 360deg
                  )`,
              padding: "1px",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute inset-0.5 rounded-full bg-black dark:bg-gray-900" />
          </motion.div>

          {/* Partículas em torno durante mineração */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <BlockchainParticles
              active={mining}
              intensity={mining ? 2 : 0.5}
              className={`transition-opacity duration-500 ${
                mining ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Cubo 3D representando o bloco */}
          <div className="absolute inset-0 z-30">
            {/* <BlockchainCube 
              active={expanded || active}
              mining={mining}
              hash={hash}
              onMiningComplete={handleMiningComplete}
              mined={mined}
            /> */}
            <Image
              src="/images/block.png"
              alt="Blockchain Cube"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Índice de bloco (visualização blockchain) - Estilo Solana */}
          <div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-mono z-30"
            style={{
              backgroundColor: isDark
                ? "rgba(30, 30, 35, 0.8)"
                : "rgba(245, 245, 250, 0.9)",
              border: `1px solid ${
                mined
                  ? isDark
                    ? "#14F195"
                    : "#10B981"
                  : isDark
                  ? "#9945FF"
                  : "#7A35CC"
              }`,
              boxShadow: `0 0 10px ${
                mined
                  ? isDark
                    ? "rgba(20, 241, 149, 0.3)"
                    : "rgba(16, 185, 129, 0.2)"
                  : isDark
                  ? "rgba(153, 69, 255, 0.3)"
                  : "rgba(122, 53, 204, 0.2)"
              }`,
            }}
          >
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-1.5 ${
                  mined ? "bg-green-400" : "bg-gray-400"
                }`}
              />
              Block #{index + 1}
            </div>
          </div>
        </motion.div>

        {/* Cartão de informações - Estilo Solana - adaptado para mobile */}
        <motion.div
          className={`ml-0 md:ml-8 grow rounded-xl p-4 md:p-6 relative overflow-hidden flex flex-col blockchain-node-card ${
            expanded ? "max-h-[800px]" : "max-h-none md:max-h-[180px]"
          }`}
          style={{
            backgroundColor: isDark
              ? "rgba(26, 26, 26, 0.85)"
              : "rgba(255, 255, 255, 0.95)",
            boxShadow: isDark
              ? "0 8px 32px rgba(0, 0, 0, 0.35), 0 0 15px rgba(153, 69, 255, 0.2)"
              : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 15px rgba(122, 53, 204, 0.1)",
            borderLeft: mined
              ? `3px solid ${isDark ? "#14F195" : "#10B981"}`
              : `3px solid ${isDark ? "#9945FF" : "#7A35CC"}`,
            borderTop: `3px solid ${
              mined
                ? isDark
                  ? "#14F195"
                  : "#10B981"
                : isDark
                ? "#9945FF"
                : "#7A35CC"
            }`,
            transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: "blur(20px)",
          }}
          whileHover={{
            boxShadow: isDark
              ? "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(153, 69, 255, 0.3)"
              : "0 12px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(122, 53, 204, 0.15)",
          }}
        >
          {/* Partículas de fundo (sutis) - sempre presentes */}
          <div className="absolute inset-0 opacity-5 pointer-events-none z-10">
            <BlockchainParticles
              active={true}
              intensity={0.3}
              className="opacity-30"
            />
          </div>

          {/* Background hexagonal pattern - representação blockchain */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(circle at 50% 50%, rgba(153, 69, 255, 0.15), transparent 70%)"
                : "radial-gradient(circle at 50% 50%, rgba(122, 53, 204, 0.08), transparent 70%)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Status de mineração e hash - Estilo Solana */}
          {(active || expanded) && (
            <motion.div
              className="absolute top-3 right-3 flex md:flex-row flex-col items-end md:items-center space-y-1 md:space-y-0 md:space-x-2 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {mining ? (
                <div className="flex flex-col md:flex-row items-end md:items-center">
                  <div
                    className="mb-1 md:mb-0 md:mr-2 text-xs font-mono px-2 py-1 rounded-md text-white dark:text-white animate-pulse"
                    style={{
                      background: isDark
                        ? "linear-gradient(90deg, #e43f5a, #fd735a)"
                        : "linear-gradient(90deg, #e43f5a, #fd735a)",
                      color: isDark ? "white" : "white",
                      boxShadow: "0 0 15px rgba(228, 63, 90, 0.5)",
                      fontWeight: "bold",
                      minWidth: "70px",
                      textAlign: "center"
                    }}
                  >
                    {t("developer.blockchain.status.mining")}
                  </div>
                  <div className="text-xs font-mono opacity-70 hidden md:block">
                    {hash.substring(0, 6)}...
                  </div>
                </div>
              ) : showVerified ? (
                <div className="flex flex-col md:flex-row items-end md:items-center">
                  <div
                    className="mb-1 md:mb-0 md:mr-2 text-xs font-mono px-2 py-1 rounded-md dark:text-white"
                    style={{
                      background: isDark
                        ? "linear-gradient(90deg, #14F195, #43aa8b)"
                        : "linear-gradient(90deg, #10B981, #38a169)",
                      color: isDark ? "white" : "white",
                      boxShadow: "0 0 15px rgba(20, 241, 149, 0.3)",
                      fontWeight: "bold",
                      minWidth: "70px",
                      textAlign: "center"
                    }}
                  >
                    {t("developer.blockchain.status.verified")}
                  </div>
                  <div className="text-xs font-mono opacity-70 hidden md:block">
                    {hash}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-end md:items-center">
                  <div
                    className="mb-1 md:mb-0 md:mr-2 text-xs font-mono px-2 py-1 rounded-md dark:text-white"
                    style={{
                      background: isDark
                        ? "linear-gradient(90deg, #9945FF, #7b61ff)"
                        : "linear-gradient(90deg, #7A35CC, #6646b5)",
                      color: isDark ? "white" : "white",
                      boxShadow: "0 0 15px rgba(153, 69, 255, 0.3)",
                      fontWeight: "bold",
                      minWidth: "70px",
                      textAlign: "center"
                    }}
                  >
                    {t("developer.blockchain.status.pending")}
                  </div>
                  <div className="text-xs font-mono opacity-70 hidden md:block">
                    {hash.substring(0, 6)}...
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Conteúdo - Estilo Solana */}
          <div className="relative z-30 flex-grow blockchain-node-content">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
              <Typography
                variant="h3"
                className={`mb-2 md:mb-0 font-bold text-base md:text-xl text-black dark:text-white ${
                  mining
                    ? isDark
                      ? "text-[#9945FF]"
                      : "text-[#7A35CC]"
                    : mined
                    ? isDark
                      ? "text-[#14F195]"
                      : "text-[#10B981]"
                    : ""
                }`}
              >
                {company}
              </Typography>

              <div
                className="px-3 py-1 rounded-full inline-block text-xs md:text-sm w-fit text-black dark:text-white"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(153, 69, 255, 0.2), rgba(20, 241, 149, 0.1))"
                    : "linear-gradient(90deg, rgba(122, 53, 204, 0.1), rgba(16, 185, 129, 0.05))",
                  border: `1px solid ${
                    isDark
                      ? "rgba(153, 69, 255, 0.3)"
                      : "rgba(122, 53, 204, 0.2)"
                  }`,
                  color: isDark ? "#9945FF" : "#7A35CC",
                }}
              >
                {period}
              </div>
            </div>

            <Typography
              variant="h4"
              className="mb-3 md:mb-4 opacity-90 text-sm md:text-base text-black dark:text-white"
            >
              {position}
            </Typography>

            {/* Hash e informações técnicas - Estilo Solana otimizado para mobile */}
            <div className="mb-3 md:mb-4">
              <div className="flex flex-wrap gap-2 text-xs font-mono opacity-70 text-black dark:text-white">
                <span
                  className="px-2 py-1 rounded text-[10px] md:text-xs"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(30, 30, 35, 0.5)"
                      : "rgba(245, 245, 250, 0.7)",
                    border: `1px solid ${
                      isDark
                        ? "rgba(153, 69, 255, 0.2)"
                        : "rgba(122, 53, 204, 0.1)"
                    }`,
                  }}
                >
                  prev: {index > 0 ? `${hash.substring(0, 6)}...` : t("developer.blockchain.technical.genesis")}
                </span>
                <span
                  className="px-2 py-1 rounded text-[10px] md:text-xs"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(30, 30, 35, 0.5)"
                      : "rgba(245, 245, 250, 0.7)",
                    border: `1px solid ${
                      isDark
                        ? "rgba(153, 69, 255, 0.2)"
                        : "rgba(122, 53, 204, 0.1)"
                    }`,
                  }}
                >
                  {t("developer.blockchain.technical.nonce")}: {nonce}
                </span>
              </div>
            </div>

            {/* Botão expandir/contrair maior e mais acessível em mobile */}
            <motion.div
              className="absolute bottom-2 right-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer z-40"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              onClick={toggleExpand}
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(153, 69, 255, 0.2), rgba(20, 241, 149, 0.1))"
                  : "linear-gradient(135deg, rgba(122, 53, 204, 0.1), rgba(16, 185, 129, 0.05))",
                border: `1px solid ${
                  mined
                    ? isDark
                      ? "#14F195"
                      : "#10B981"
                    : isDark
                    ? "#9945FF"
                    : "#7A35CC"
                }`,
                boxShadow: `0 0 10px ${
                  mined
                    ? isDark
                      ? "rgba(20, 241, 149, 0.3)"
                      : "rgba(16, 185, 129, 0.2)"
                    : isDark
                    ? "rgba(153, 69, 255, 0.3)"
                    : "rgba(122, 53, 204, 0.2)"
                }`,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Descrições (visíveis quando expandido) - Estilo Solana */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="mb-4 pt-4"
                  style={{
                    borderTop: `1px solid ${
                      isDark
                        ? "rgba(153, 69, 255, 0.2)"
                        : "rgba(122, 53, 204, 0.1)"
                    }`,
                  }}
                >
                  <div
                    className="text-xs font-mono px-2 py-1 rounded mb-2 text-black dark:text-white"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(30, 30, 35, 0.5)"
                        : "rgba(245, 245, 250, 0.7)",
                      border: `1px solid ${
                        isDark
                          ? "rgba(153, 69, 255, 0.2)"
                          : "rgba(122, 53, 204, 0.1)"
                      }`,
                    }}
                  >
                    {t("developer.blockchain.technical.timestamp")}: {formattedTimestamp}
                  </div>
                </div>

                <ul className="space-y-2">
                  {description.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
                    >
                      <div
                        className="mr-2 mt-1.5 h-2 w-2 rounded-full shrink-0"
                        style={{
                          background: isDark
                            ? `linear-gradient(135deg, #9945FF, #14F195)`
                            : `linear-gradient(135deg, #7A35CC, #10B981)`,
                        }}
                      />
                      <Typography variant="body" className="text-black dark:text-white">{item}</Typography>
                    </motion.li>
                  ))}
                </ul>

                {/* Métricas de blockchain (detalhes decorativos) - Estilo Solana */}
                <motion.div
                  className="mt-6 grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + description.length * 0.1,
                  }}
                >
                  {[
                    {
                      label: t("developer.blockchain.technical.blockHeight"),
                      value: (1000000 + index * 1000).toLocaleString(),
                    },
                    {
                      label: t("developer.blockchain.technical.gasUsed"),
                      value: (
                        Math.floor(Math.random() * 8000000) + 2000000
                      ).toLocaleString(),
                    },
                    {
                      label: t("developer.blockchain.technical.transactions"),
                      value: Math.floor(Math.random() * 200) + 20,
                    },
                    { label: t("developer.blockchain.technical.confirmations"), value: totalItems - index },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-md text-center"
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
                        className="text-xs opacity-70 mb-1"
                        style={{
                          color: isDark ? "#9945FF" : "#7A35CC",
                        }}
                      >
                        {stat.label}
                      </div>
                      <div className="font-mono font-bold">{stat.value}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Representação JSON do bloco (elemento decorativo) - Estilo Solana */}
                <motion.div
                  className="mt-4 overflow-hidden rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <div
                    className="p-3 text-xs font-mono overflow-x-auto"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(20, 20, 25, 0.8)"
                        : "rgba(230, 230, 235, 0.8)",
                      border: `1px solid ${
                        isDark
                          ? "rgba(153, 69, 255, 0.2)"
                          : "rgba(122, 53, 204, 0.1)"
                      }`,
                    }}
                  >
                    <pre
                      style={{
                        color: mined
                          ? isDark
                            ? "#14F195"
                            : "#10B981"
                          : isDark
                          ? "#9945FF"
                          : "#7A35CC",
                      }}
                    >{`{
  "index": ${index},
  "timestamp": ${timestamp},
  "company": "${company}",
  "position": "${position}",
  "nonce": ${nonce},
  "previousHash": "${index > 0 ? "0x..." : "null"}",
  "hash": "${hash}"
}`}</pre>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

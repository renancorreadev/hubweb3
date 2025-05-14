"use client";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { motion, useAnimation, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heading1, Heading2, Heading3, Body } from "@/components/Typography";
import { Card } from "@/components/Card";
import { RenderContainer } from "@/shared/components/RenderContainer";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

// Componente de vantagem do blockchain com ícone e descrição
const BlockchainAdvantage = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <motion.div
    className="flex flex-col items-center p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:shadow-lg transition-all duration-300"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-center text-gray-700 dark:text-gray-300">
      {description}
    </p>
  </motion.div>
);

// Componente de tópico da arquitetura blockchain
const ArchitectureTopic = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <motion.div
    className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </motion.div>
);

// Componente de benefício do DREX
const DrexBenefit = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-6 rounded-xl border border-purple-100 dark:border-purple-800/20"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </motion.div>
);

// Componente de animação da arquitetura blockchain
const BlockchainAnimation = () => {
  const controls = useAnimation();
  const { t } = useTranslation();
  const { isDark } = useThemeColors();

  // Animação sequencial para camadas de blockchain
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.7
      }
    }
  };

  // Variantes para as camadas
  const layerVariants = {
    hidden: (custom: any) => ({
      opacity: 0,
      y: custom.fromBottom ? 50 : -50,
      scale: 0.9,
      filter: "blur(10px)"
    }),
    visible: (custom: any) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: custom.delay,
        duration: 0.7,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(20, 241, 149, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  // Variantes para os itens dentro das camadas
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: delay,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  // Animação de fluxo de dados
  const dataFlowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 0.7,
      transition: {
        delay: delay,
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeIn" }
      }
    })
  };

  // Partículas de dados fluindo
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: any) => ({
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      x: custom.path,
      y: custom.yPath || 0,
      transition: {
        delay: custom.delay,
        duration: custom.duration || 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.8, 1],
        repeat: Infinity,
        repeatDelay: custom.repeatDelay || 3
      }
    })
  };

  // Iniciar animação quando o componente estiver visível
  const handleViewportEnter = () => {
    controls.start("visible");
  };

  // Cores do tema
  const primaryColor = isDark ? "#14F195" : "#0EA66B";
  const secondaryColor = isDark ? "#9945FF" : "#7435CC";
  const backgroundColor = isDark ? "rgba(0, 5, 8, 0.8)" : "rgba(255, 255, 255, 0.8)";
  const textColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const textSecondaryColor = isDark ? "#A1A1A1" : "#666666";
  const borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "#E5E5E5";
  const glowColor = isDark ? "rgba(20, 241, 149, 0.2)" : "rgba(14, 166, 107, 0.2)";
  
  // Cores para gradientes
  const appGradient = {
    start: isDark ? "#1A1A1A" : "#F5F5F5",
    end: isDark ? "#222222" : "#FFFFFF"
  };
  
  const protocolGradient = {
    start: isDark ? "#14F195" : "#0EA66B",
    end: isDark ? "rgba(20, 241, 149, 0.7)" : "rgba(14, 166, 107, 0.7)"
  };
  
  const networkGradient = {
    start: isDark ? "#9945FF" : "#7435CC",
    end: isDark ? "rgba(153, 69, 255, 0.7)" : "rgba(116, 53, 204, 0.7)"
  };
  
  const blockchainGradient = {
    start: isDark ? "rgba(0, 5, 8, 0.9)" : "rgba(240, 240, 240, 0.9)",
    end: isDark ? "rgba(10, 15, 20, 0.9)" : "rgba(245, 245, 245, 0.9)"
  };

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center p-0 rounded-xl overflow-hidden font-grotesk"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        background: isDark 
          ? "radial-gradient(circle at 25% 25%, rgba(153, 69, 255, 0.05), transparent 25%), radial-gradient(circle at 75% 75%, rgba(20, 241, 149, 0.05), transparent 25%)"
          : "radial-gradient(circle at 25% 25%, rgba(116, 53, 204, 0.03), transparent 25%), radial-gradient(circle at 75% 75%, rgba(14, 166, 107, 0.03), transparent 25%)"
      }}
    >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="-10 -10 820 620" 
          preserveAspectRatio="xMidYMid meet"
          className="max-w-full max-h-full p-12"
        >
          <defs>
            {/* Gradientes */}
            <linearGradient id="appGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={appGradient.start} stopOpacity="1" />
              <stop offset="100%" stopColor={appGradient.end} stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.1" />
              <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
            </linearGradient>
            
            <linearGradient id="protocolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={protocolGradient.start} stopOpacity="0.2" />
              <stop offset="100%" stopColor={protocolGradient.end} stopOpacity="0.2" />
            </linearGradient>
            
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={networkGradient.start} stopOpacity="0.2" />
              <stop offset="100%" stopColor={networkGradient.end} stopOpacity="0.2" />
            </linearGradient>
            
            <linearGradient id="blockchainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={blockchainGradient.start} stopOpacity="1" />
              <stop offset="100%" stopColor={blockchainGradient.end} stopOpacity="1" />
            </linearGradient>
            
            {/* Filtros para glow */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Marcador de seta para fluxo de dados */}
            <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0,0 L 10,5 L 0,10 z" fill={primaryColor} />
            </marker>
          </defs>
          
          {/* Container externo */}
          <motion.rect
            x="0" y="0" width="800" height="600" rx="16" ry="16"
            fill="transparent"
            stroke={borderColor}
            strokeWidth="1"
            variants={layerVariants}
            custom={{ delay: 0, fromBottom: false }}
            whileHover="hover"
          />
          
          {/* Título principal - ajustado para ficar no topo */}
          <motion.g variants={itemVariants} custom={0.2}>
            <rect
              x="240" y="30" width="320" height="40" rx="12" ry="12"
              fill="url(#titleGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="400" y="55"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="16"
              className="font-grotesk"
            >
              Arquitetura Blockchain em Camadas
            </text>
          </motion.g>
          
          {/* Camada de descrição - ajustada */}
          <motion.text
            x="400" y="80"
            textAnchor="middle"
            fill={textSecondaryColor}
            fontSize="12"
            variants={itemVariants}
            custom={0.3}
          >
            Camada de Aplicações: Interface com usuários finais
          </motion.text>
          
          {/* Camada de Aplicações (APPs) */}
          <motion.g variants={itemVariants} custom={0.4}>
            <rect
              x="130" y="120" width="100" height="50" rx="12" ry="12"
              fill="url(#appGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="180" y="145"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="14"
            >
              DeFi
            </text>
            <text
              x="180" y="165"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (Finanças)
            </text>
          </motion.g>
          
          <motion.g variants={itemVariants} custom={0.5}>
            <rect
              x="240" y="120" width="100" height="50" rx="12" ry="12"
              fill="url(#appGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="290" y="145"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="14"
            >
              NFTs
            </text>
            <text
              x="290" y="165"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (Digital Arts)
            </text>
          </motion.g>
          
          <motion.g variants={itemVariants} custom={0.6}>
            <rect
              x="350" y="120" width="100" height="50" rx="12" ry="12"
              fill="url(#appGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="400" y="145"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="14"
            >
              DREX
            </text>
            <text
              x="400" y="165"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (Real Digital)
            </text>
          </motion.g>
          
          <motion.g variants={itemVariants} custom={0.7}>
            <rect
              x="460" y="120" width="100" height="50" rx="12" ry="12"
              fill="url(#appGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="510" y="145"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="14"
            >
              RWA
            </text>
            <text
              x="510" y="165"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (Tokenização)
            </text>
          </motion.g>
          
          <motion.g variants={itemVariants} custom={0.8}>
            <rect
              x="570" y="120" width="100" height="50" rx="12" ry="12"
              fill="url(#appGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="620" y="145"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="14"
            >
              DAO
            </text>
            <text
              x="620" y="165"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (Governança)
            </text>
          </motion.g>
          
          {/* Camada de APIs */}
          <motion.g variants={itemVariants} custom={1.0}>
            <rect
              x="130" y="200" width="270" height="50" rx="12" ry="12"
              fill="url(#appGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="265" y="230"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="16"
            >
              APIs Comerciais
            </text>
          </motion.g>
          
          <motion.g variants={itemVariants} custom={1.1}>
            <rect
              x="410" y="200" width="260" height="50" rx="12" ry="12"
              fill="url(#appGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="540" y="230"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="16"
            >
              APIs Open Source
            </text>
          </motion.g>
          
          {/* Descrição das APIs */}
          <motion.text
            x="400" y="185"
            textAnchor="middle"
            fill={textSecondaryColor}
            fontSize="12"
            variants={itemVariants}
            custom={0.9}
          >
            Camada de Integração: Conecta aplicações aos protocolos blockchain
          </motion.text>
          
          {/* Container para o Shared Protocol Layer */}
          <motion.rect
            x="130" y="270" width="540" height="140" rx="12" ry="12"
            fill={backgroundColor}
            stroke={borderColor}
            strokeWidth="1"
            variants={layerVariants}
            custom={{ delay: 1.2, fromBottom: false }}
            whileHover="hover"
          />
          
          {/* Texto do Shared Protocol Layer */}
          <motion.text
            x="400" y="260"
            textAnchor="middle"
            fill={textSecondaryColor}
            fontSize="12"
            variants={itemVariants}
            custom={1.3}
          >
            Camada de Protocolos: Regras e lógica de negócios
          </motion.text>
          
          {/* Decentralized Protocols */}
          <motion.g variants={itemVariants} custom={1.4}>
            <rect
              x="150" y="290" width="150" height="80" rx="12" ry="12"
              fill="url(#protocolGradient)"
              stroke={primaryColor}
              strokeWidth="1"
              style={{ backdropFilter: "blur(8px)" }}
            />
            <text
              x="225" y="320"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="14"
            >
              Smart Contracts
            </text>
            <text
              x="225" y="340"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (Ethereum/Solidity)
            </text>
            <text
              x="225" y="360"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="10"
            >
              Contratos autoexecutáveis
            </text>
          </motion.g>
          
          <motion.g variants={itemVariants} custom={1.5}>
            <rect
              x="325" y="290" width="150" height="80" rx="12" ry="12"
              fill="url(#protocolGradient)"
              stroke={primaryColor}
              strokeWidth="1"
              style={{ backdropFilter: "blur(8px)" }}
            />
            <text
              x="400" y="320"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="14"
            >
              Tokens & NFTs
            </text>
            <text
              x="400" y="340"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (ERC-20/ERC-721)
            </text>
            <text
              x="400" y="360"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="10"
            >
              Padrões de ativos digitais
            </text>
          </motion.g>
          
          <motion.g variants={itemVariants} custom={1.6}>
            <rect
              x="500" y="290" width="150" height="80" rx="12" ry="12"
              fill="url(#protocolGradient)"
              stroke={primaryColor}
              strokeWidth="1"
              style={{ backdropFilter: "blur(8px)" }}
            />
            <text
              x="575" y="320"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="14"
            >
              Protocolos DeFi
            </text>
            <text
              x="575" y="340"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (AMMs/Lending)
            </text>
            <text
              x="575" y="360"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="10"
            >
              Financiamento descentralizado
            </text>
          </motion.g>
          
          {/* Descrição do Protocol Layer */}
          <motion.text
            x="400" y="395"
            textAnchor="middle"
            fill={textSecondaryColor}
            fontSize="12"
            variants={itemVariants}
            custom={1.7}
          >
            Camada de Protocolos Compartilhados
          </motion.text>
          
          {/* Overlay Network */}
          <motion.g variants={itemVariants} custom={1.8}>
            <rect
              x="150" y="430" width="240" height="70" rx="12" ry="12"
              fill="url(#networkGradient)"
              stroke={secondaryColor}
              strokeWidth="1"
              style={{ backdropFilter: "blur(8px)" }}
            />
            <text
              x="270" y="455"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="15"
            >
              Rede Privada
            </text>
            <text
              x="270" y="475"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (Hyperledger/Besu)
            </text>
            <text
              x="270" y="490"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="10"
            >
              Permissionada com controle de acesso
            </text>
          </motion.g>
          
          <motion.g variants={itemVariants} custom={1.9}>
            <rect
              x="410" y="430" width="240" height="70" rx="12" ry="12"
              fill="url(#networkGradient)"
              stroke={secondaryColor}
              strokeWidth="1"
              style={{ backdropFilter: "blur(8px)" }}
            />
            <text
              x="530" y="455"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="15"
            >
              Rede Pública
            </text>
            <text
              x="530" y="475"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="12"
            >
              (Ethereum/Polygon/Solana)
            </text>
            <text
              x="530" y="490"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="10"
            >
              Aberta e sem permissão
            </text>
          </motion.g>
          
          {/* Descrição da Network Layer */}
          <motion.text
            x="400" y="415"
            textAnchor="middle"
            fill={textSecondaryColor}
            fontSize="12"
            variants={itemVariants}
            custom={1.7}
          >
            Camada de Rede: Estrutura de comunicação entre nós
          </motion.text>
          
          {/* Blockchain Layer */}
          <motion.g variants={layerVariants} custom={{ delay: 2.1, fromBottom: true }}>
            <rect
              x="130" y="520" width="540" height="50" rx="8" ry="8"
              fill="url(#blockchainGradient)"
              stroke={borderColor}
              strokeWidth="1"
            />
            <text
              x="400" y="545"
              textAnchor="middle"
              fill={textColor}
              fontWeight="bold"
              fontSize="18"
            >
              Consenso Blockchain
            </text>
            <text
              x="400" y="562"
              textAnchor="middle"
              fill={textSecondaryColor}
              fontSize="11"
            >
              (PoW, PoS, PoA, PBFT, Raft)
            </text>
          </motion.g>
          
          {/* Descrição da Blockchain Layer */}
          <motion.text
            x="400" y="510"
            textAnchor="middle"
            fill={textSecondaryColor}
            fontSize="12"
            variants={itemVariants}
            custom={2.0}
          >
            Camada de Consenso: Mecanismos de validação de transações
          </motion.text>
          
          {/* Shared Data Layer */}
          <motion.text
            x="400" y="585"
            textAnchor="middle"
            fill={textSecondaryColor}
            fontSize="12"
            variants={itemVariants}
            custom={2.3}
          >
            Camada de Dados Compartilhados: Registro imutável distribuído
          </motion.text>
          
          {/* Fluxos de dados animados */}
          {/* Fluxo de App para API */}
          <motion.path
            d="M290 170 L290 200"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="0"
            variants={dataFlowVariants}
            custom={2.4}
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          />
          
          {/* Fluxo de API para Protocol */}
          <motion.path
            d="M400 250 L400 290"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="0"
            variants={dataFlowVariants}
            custom={2.6}
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          />
          
          {/* Fluxo de Protocol para Network */}
          <motion.path
            d="M400 370 L400 430"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="0"
            variants={dataFlowVariants}
            custom={2.8}
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          />
          
          {/* Fluxo de Network para Blockchain */}
          <motion.path
            d="M400 500 L400 520"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="0"
            variants={dataFlowVariants}
            custom={3.0}
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          />
          
          {/* Fluxos laterais entre protocolos e redes */}
          <motion.path
            d="M300 330 L325 330"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="0"
            variants={dataFlowVariants}
            custom={3.1}
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          />
          
          <motion.path
            d="M475 330 L500 330"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="0"
            variants={dataFlowVariants}
            custom={3.2}
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          />
          
          <motion.path
            d="M390 465 L410 465"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="0"
            variants={dataFlowVariants}
            custom={3.3}
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          />
          
          {/* Partículas de dados */}
          <motion.circle
            cx="290"
            cy="170"
            r="4"
            fill={primaryColor}
            variants={particleVariants}
            custom={{ path: [0, 0, 0], yPath: [0, 30, 120, 250, 320], delay: 3.2, duration: 5, repeatDelay: 1 }}
            filter="url(#glow)"
          />
          
          <motion.circle
            cx="400"
            cy="240"
            r="4"
            fill={primaryColor}
            variants={particleVariants}
            custom={{ path: [0, 0, 0], yPath: [0, 50, 190, 280], delay: 3.5, duration: 4, repeatDelay: 2 }}
            filter="url(#glow)"
          />
          
          <motion.circle
            cx="575"
            cy="360"
            r="4"
            fill={primaryColor}
            variants={particleVariants}
            custom={{ path: [-175, 0, 0], yPath: [0, 70, 160], delay: 3.8, duration: 3, repeatDelay: 3 }}
            filter="url(#glow)"
          />
          
          <motion.circle
            cx="300"
            cy="330"
            r="3"
            fill={primaryColor}
            variants={particleVariants}
            custom={{ path: [25, 0, 0], yPath: [0, 0, 0], delay: 4.0, duration: 1.5, repeatDelay: 4 }}
            filter="url(#glow)"
          />
          
          <motion.circle
            cx="475"
            cy="330"
            r="3"
            fill={primaryColor}
            variants={particleVariants}
            custom={{ path: [25, 0, 0], yPath: [0, 0, 0], delay: 4.1, duration: 1.5, repeatDelay: 5 }}
            filter="url(#glow)"
          />
          
          <motion.circle
            cx="390"
            cy="465"
            r="3"
            fill={primaryColor}
            variants={particleVariants}
            custom={{ path: [20, 0, 0], yPath: [0, 0, 0], delay: 4.2, duration: 1.5, repeatDelay: 3 }}
            filter="url(#glow)"
          />
        </svg>
    </motion.div>
  );
};

export default function Blockchain() {
  const { t } = useTranslation();

  // Projetos relacionados a blockchain
  const blockchainProjects = [
    {
      title: t("projects.assetTokenization.title"),
      description: t("projects.assetTokenization.description"),
      image: "/images/projects/RWA.png",
      tags: [t("projects.assetTokenization.tag"), "DeFi", "Tokenização"],
      url: "/projects/asset-tokenization",
    },
    {
      title: t("projects.drex.title"),
      description: t("projects.drex.description"),
      image: "/images/projects/DREX.png",
      tags: [t("projects.drex.tag"), "Finanças", "Governo"],
      url: "/projects/drex",
    },
    {
      title: t("projects.loyahub.title"),
      description: t("projects.loyahub.description"),
      image: "/images/projects/LoyaHub.png",
      tags: ["NFT", "Loyalty", "DeFi"],
      url: "/projects/loyahub",
    },
  ];

  return (
    <RenderContainer>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Heading1 className="mb-6 text-gray-900 dark:text-white">
                  {t("projects.blockchain.title")}
                </Heading1>

                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-8 rounded-full"></div>

                <Heading2 className="mb-8 text-gray-700 dark:text-gray-300">
                  {t("projects.blockchain.intro.title")}
                </Heading2>

                <Body className="text-gray-600 dark:text-gray-400 text-lg mb-12">
                  {t("projects.blockchain.intro.description")}
                </Body>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto w-full max-w-3xl h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/blockchain.png"
                  alt="Blockchain Technology"
                  fill
                  className="object-contain w-full h-full"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vantagens Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Heading2 className="mb-6 text-gray-900 dark:text-white">
                {t("projects.blockchain.advantages.title")}
              </Heading2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BlockchainAdvantage
                icon="🔒"
                title={t("projects.blockchain.advantages.security")}
                description={t(
                  "projects.blockchain.advantages.security.description"
                )}
              />
              <BlockchainAdvantage
                icon="👁️"
                title={t("projects.blockchain.advantages.transparency")}
                description={t(
                  "projects.blockchain.advantages.transparency.description"
                )}
              />
              <BlockchainAdvantage
                icon="📜"
                title={t("projects.blockchain.advantages.immutability")}
                description={t(
                  "projects.blockchain.advantages.immutability.description"
                )}
              />
              <BlockchainAdvantage
                icon="🌐"
                title={t("projects.blockchain.advantages.decentralization")}
                description={t(
                  "projects.blockchain.advantages.decentralization.description"
                )}
              />
            </div>
          </div>
        </section>

        {/* Arquitetura Section */}
        <section className="py-16 ">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Heading2 className="mb-6 text-gray-900 dark:text-white">
                  {t("projects.blockchain.architecture.title")}
                </Heading2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-8"></div>
                <Body className="text-gray-600 dark:text-gray-400">
                  {t("projects.blockchain.architecture.description")}
                </Body>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 relative hidden md:block">
                  <BlockchainAnimation />
                </div>

                <ArchitectureTopic
                  title={t("projects.blockchain.architecture.consensus")}
                  description={t(
                    "projects.blockchain.architecture.consensus.description"
                  )}
                />
                <ArchitectureTopic
                  title={t("projects.blockchain.architecture.smart_contracts")}
                  description={t(
                    "projects.blockchain.architecture.smart_contracts.description"
                  )}
                />
                <ArchitectureTopic
                  title={t("projects.blockchain.architecture.networks")}
                  description={t(
                    "projects.blockchain.architecture.networks.description"
                  )}
                />
                <ArchitectureTopic
                  title="API & Integrations"
                  description="Interfaces e conectores que permitem a comunicação entre aplicações convencionais e a blockchain."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projetos Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Heading2 className="mb-6 text-gray-900 dark:text-white">
                {t("projects.blockchain.projects.title")}
              </Heading2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-8"></div>
              <Body className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t("projects.blockchain.projects.description")}
              </Body>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blockchainProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-[400px]"
                >
                  <Card
                    title={project.title}
                    description={project.description}
                    backgroundImage={project.image}
                    tag={project.tags[0]}
                    href={project.url}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DREX Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <Heading2 className="mb-6 text-gray-900 dark:text-white">
                  {t("projects.blockchain.drex.title")}
                </Heading2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-8"></div>
                <Body className="text-gray-600 dark:text-gray-400">
                  {t("projects.blockchain.drex.description")}
                </Body>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-8 mb-8">
                  <div className="flex-1">
                    <motion.div
                      className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src="/images/projects/drex/drex.png"
                        alt="DREX Market Impact"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"></div>
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <motion.div
                      className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 h-full flex flex-col justify-center"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Heading3 className="mb-4 text-gray-900 dark:text-white">
                        Impacto no Mercado Financeiro
                      </Heading3>
                      <p className="text-gray-700 dark:text-gray-300">
                        O DREX tem o potencial de transformar profundamente o
                        sistema financeiro brasileiro, reduzindo custos de
                        transação, aumentando a velocidade de liquidação e
                        criando novas oportunidades para inovação financeira.
                        Sua implementação deve gerar um novo ecossistema de
                        serviços e produtos financeiros baseados em tecnologia
                        blockchain.
                      </p>
                    </motion.div>
                  </div>
                </div>

                <DrexBenefit
                  title={t("projects.blockchain.drex.benefits.inclusion")}
                  description={t(
                    "projects.blockchain.drex.benefits.inclusion.description"
                  )}
                  index={0}
                />
                <DrexBenefit
                  title={t("projects.blockchain.drex.benefits.efficiency")}
                  description={t(
                    "projects.blockchain.drex.benefits.efficiency.description"
                  )}
                  index={1}
                />
                <DrexBenefit
                  title={t("projects.blockchain.drex.benefits.innovation")}
                  description={t(
                    "projects.blockchain.drex.benefits.innovation.description"
                  )}
                  index={2}
                />
                <DrexBenefit
                  title={t("projects.blockchain.drex.benefits.integration")}
                  description={t(
                    "projects.blockchain.drex.benefits.integration.description"
                  )}
                  index={3}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Heading2 className="mb-6">
                {t("blockchain.cta.title")}
              </Heading2>
              <p className="text-lg mb-8 text-purple-100">
                {t("blockchain.cta.description")}
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {t("blockchain.cta.button")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </RenderContainer>
  );
}

"use client";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { Typography } from "@/components/Typography";
import { motion, useAnimation, useInView } from "framer-motion";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface SkillCardProps {
  title: string;
  content: string;
  icon: string;
  index: number;
  category: string;
}

const SkillCard = ({ title, content, icon, index, category }: SkillCardProps) => {
  const { isDark, getColor } = useThemeColors();
  const controls = useAnimation();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const getBorderColor = () => {
    switch (category) {
      case "blockchain":
        return isDark ? "#14F195" : "#0EA66B";
      case "language":
        return isDark ? "#9945FF" : "#7A35CC";
      case "backend":
        return isDark ? "#45BDFF" : "#2A87BE";
      case "devops":
        return isDark ? "#F19514" : "#C77200";
      default:
        return isDark ? getColor('primary') : getColor('primary');
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="rounded-xl p-8 h-full relative"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.6, 
            delay: index * 0.15,
            ease: "easeOut"
          }
        }
      }}
      whileHover={{ 
        y: -12,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        },
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        backgroundColor: isDark ? 'rgba(26, 26, 26, 0.6)' : 'rgba(245, 245, 245, 0.8)',
        borderLeft: `4px solid ${getBorderColor()}`,
        boxShadow: isDark 
          ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-start gap-5">
        <motion.div 
          className="p-4 rounded-lg flex justify-center items-center"
          style={{ 
            backgroundColor: isDark ? `${getBorderColor()}20` : `${getBorderColor()}15`,
            color: isDark ? getBorderColor() : getBorderColor(),
            height: 64,
            width: 64
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0
          }}
          transition={{
            rotate: {
              duration: 0.5,
              ease: "easeInOut"
            },
            scale: {
              duration: 0.3,
              ease: "easeOut"
            }
          }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image 
              src={`/images/techs/${icon}`} 
              alt={title} 
              fill
              className="object-contain"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </motion.div>
        
        <div>
          <Typography 
            variant="h4" 
            className="mb-3 text-xl md:text-2xl font-bold text-gray-100 dark:text-gray-100"
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body"
            className="text-base md:text-lg leading-relaxed text-gray-300 dark:text-gray-300"
          >
            {content}
          </Typography>
        </div>
      </div>
      
      {/* Partículas de fundo animadas */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                backgroundColor: `${getBorderColor()}${Math.floor(Math.random() * 50 + 20)}`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50 - (Math.random() * 50)],
                x: [0, Math.random() * 40 - 20],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.8]
              }}
              transition={{
                duration: Math.random() * 1.5 + 1,
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: Math.random() * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// Componente de exibição de tecnologias
interface TechBadgeProps {
  tech: {
    name: string;
    icon: string;
    category: string;
    description?: string;
    level?: number;
  };
  delay: number;
}

const TechBadge = ({ tech, delay }: TechBadgeProps) => {
  const { isDark } = useThemeColors();
  const controls = useAnimation();
  const badgeRef = useRef(null);
  const isInView = useInView(badgeRef, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Função para obter a cor baseada na categoria
  const getColorByCategory = (category: string) => {
    switch (category) {
      case "blockchain":
        return isDark ? "#14F195" : "#0EA66B";
      case "language":
        return isDark ? "#9945FF" : "#7A35CC";
      case "backend":
        return isDark ? "#45BDFF" : "#2A87BE";
      case "frontend":
        return isDark ? "#FF6B6B" : "#CC4545";
      case "devops":
        return isDark ? "#F19514" : "#C77200";
      default:
        return isDark ? "#14F195" : "#0EA66B";
    }
  };
  
  const color = getColorByCategory(tech.category);
  
  return (
    <motion.div
      ref={badgeRef}
      className="flex flex-col items-center justify-between p-3 relative"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: delay * 0.1 
          }
        }
      }}
      whileHover={{ 
        scale: 1.1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div 
          className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-xl mb-4 p-5"
          style={{
            backgroundColor: isDark ? 'rgba(20, 20, 30, 0.5)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: isDark 
              ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${isDark ? 'rgba(40, 40, 60, 0.5)' : 'rgba(230, 230, 230, 1)'}`,
          }}
          animate={{
            y: isHovered ? -8 : 0,
            boxShadow: isHovered 
              ? isDark 
                ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${color}40` 
                : `0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px ${color}40`
              : isDark 
                ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image 
              src={`/images/techs/${tech.icon}`} 
              alt={tech.name} 
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
          
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
        
        {/* Indicador de nível de habilidade */}
        {tech.level && (
          <motion.div 
            className="absolute -bottom-2 -right-2 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ 
              width: 40, 
              height: 40,
              backgroundColor: isDark ? '#FFFFFF' : '#000000',
              color: isDark ? '#000000' : '#FFFFFF',
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              border: `2px solid ${isDark ? '#FFFFFF' : '#000000'}`,
              zIndex: 20
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { delay: delay * 0.1 + 0.5, duration: 0.3 }
            }}
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.2 }
            }}
          >
            {tech.level}
          </motion.div>
        )}
      </div>
      
      <div className="text-center mt-1">
        <Typography 
          variant="small" 
          className="font-semibold text-base md:text-lg text-hub-primary"
        >
          {tech.name}
        </Typography>
        
        {tech.description && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute mt-2 w-64 p-3 rounded-md z-10"
            style={{
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: isDark ? "rgba(20, 20, 30, 0.9)" : "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${isDark ? 'rgba(40, 40, 60, 0.5)' : 'rgba(230, 230, 230, 1)'}`,
            }}
          >
            <Typography variant="small" className="text-sm whitespace-normal">
              {tech.description}
            </Typography>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false, amount: 0.3 });
  const titleControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      titleControls.start("visible");
    }
  }, [titleControls, isInView]);

  const skillsData = [
    {
      title: t('developer.skills.blockchain.title'),
      content: t('developer.skills.blockchain.content'),
      icon: "Ethereum.svg",
      category: "blockchain"
    },
    {
      title: t('developer.skills.languages.title'),
      content: t('developer.skills.languages.content'),
      icon: "Solidity.svg",
      category: "language"
    },
    {
      title: t('developer.skills.devops.title'),
      content: t('developer.skills.devops.content'),
      icon: "Docker.svg",
      category: "devops"
    },
    {
      title: t('developer.skills.security.title'),
      content: t('developer.skills.security.content'),
      icon: "OpenZeppelin.svg",
      category: "blockchain"
    },
    {
      title: t('developer.skills.frontend.title'),
      content: t('developer.skills.frontend.content'),
      icon: "Next.svg",
      category: "frontend"
    },
    {
      title: t('developer.skills.backend.title'),
      content: t('developer.skills.backend.content'),
      icon: "Node.svg",
      category: "backend"
    },
  ];
  
  const techIcons = [
    { 
      name: "Ethereum", 
      icon: "Ethereum.svg", 
      category: "blockchain",
      description: "Desenvolvimento de DApps, contratos inteligentes e tokens (ERC20, ERC721, ERC1155)",
      level: 95
    },
    { 
      name: "Solana", 
      icon: "Solana.svg", 
      category: "blockchain",
      description: "Desenvolvimento de programas em Rust e integração com carteiras e NFTs",
      level: 85
    },
    { 
      name: "Solidity", 
      icon: "Solidity.svg", 
      category: "blockchain",
      description: "Linguagem para contratos inteligentes na EVM com foco em segurança e otimização de gas",
      level: 95
    },
    { 
      name: "Hyperledger", 
      icon: "Hyperledger.svg", 
      category: "blockchain",
      description: "Frameworks para blockchains empresariais e redes permissionadas",
      level: 80
    },
    { 
      name: "Rust", 
      icon: "Rust.svg", 
      category: "language",
      description: "Linguagem de programação de alto desempenho para blockchains como Solana e Polkadot",
      level: 85
    },
    { 
      name: "Go", 
      icon: "Go.svg", 
      category: "language",
      description: "Linguagem de programação para sistemas distribuídos, APIs e microserviços",
      level: 90
    },
    { 
      name: "Node.js", 
      icon: "Node.svg", 
      category: "backend",
      description: "Desenvolvimento de servidores, APIs RESTful e integração com blockchains",
      level: 95
    },
    { 
      name: "TypeScript", 
      icon: "Typescript.svg", 
      category: "language",
      description: "Linguagem tipada para projetos robustos e escaláveis",
      level: 95
    },
    { 
      name: "Python", 
      icon: "python.svg", 
      category: "language",
      description: "Automação, scripts de análise e prototipagem rápida",
      level: 90
    },
    { 
      name: "Docker", 
      icon: "Docker.svg", 
      category: "devops",
      description: "Containerização para ambientes reproduzíveis e escaláveis",
      level: 90
    },
    { 
      name: "The Graph", 
      icon: "theGraph.svg", 
      category: "blockchain",
      description: "Indexação e consulta de dados de blockchain através de GraphQL",
      level: 85
    },
    { 
      name: "Next.js", 
      icon: "Next.svg", 
      category: "frontend",
      description: "Framework React para aplicações web de alta performance",
      level: 90
    },
  ];

  return (
    <section 
      className="py-20 md:py-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? '#000000' : '#FFFFFF',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="text-center mb-20"
        >
          <Typography 
            variant="h2" 
            className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[#000] dark:text-white" 
          >
            {t('developer.skills.title')}
          </Typography>
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-hub-primary to-hub-secondary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: isInView ? 80 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <Typography 
            variant="h2" 
            className=" mx-auto text-base md:text-lg leading-relaxed text-gray-300 dark:text-gray-300"
          >
            {t('developer.skills.description')}
          </Typography>
        </motion.div>

        {/* Tech Stack - Ícones de tecnologias */}
        <motion.div 
          className="mb-24 py-16 px-6 md:px-12 rounded-xl relative"
          style={{
            backgroundColor: isDark ? 'rgba(15, 15, 20, 0.4)' : 'rgba(245, 245, 245, 0.5)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${isDark ? 'rgba(30, 30, 40, 0.3)' : 'rgba(220, 220, 230, 0.8)'}`,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
        
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 md:gap-10 justify-items-center">
            {techIcons.map((tech, index) => (
              <TechBadge key={tech.name} tech={tech} delay={index} />
            ))}
          </div>
        </motion.div>

        <div className={`grid ${mobileOnly.grid.cols1} ${desktopOnly.grid.cols3} ${mobileOnly.gap.gap6} ${desktopOnly.gap.gap8}`}>
          {skillsData.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              content={skill.content}
              icon={skill.icon}
              index={index}
              category={skill.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 
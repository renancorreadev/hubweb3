"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

interface CardProps {
  /** Tag do card (ex: "CASE STUDY", "VIDEO") */
  tag?: string;
  /** Título do card */
  title: string;
  /** Subtítulo ou descrição curta */
  subtitle?: string;
  /** Descrição completa */
  description: string;
  /** URL para onde o botão deve direcionar */
  href: string;
  /** Classes CSS adicionais */
  className?: string;
  /** Imagem de fundo do card */
  backgroundImage?: string;
  /** Cor do gradiente (default: preto, "green" para verde #14F195) */
  gradientColor?: "default" | "green";
  /** Cor da barra superior */
  barColor?: string;
  /** Aplicar efeito neon na borda */
  neonEffect?: boolean;
  /** Cores do efeito neon (padrão: verde para roxo) */
  neonColors?: {
    from: string;
    to: string;
  };
  /** Mostrar ou esconder a barra superior e sua cor */
  topBorder?: boolean | "green" | "purple";
  /** Índice do card para animação sequencial */
  index?: number;
}

export const Card = ({
  tag,
  title,
  subtitle,
  description,
  href,
  className = "",
  backgroundImage,
  gradientColor = "default",
  barColor,
  neonEffect = false,
  neonColors = { from: "#14F195", to: "#9945FF" },
  topBorder = true,
  index = 0,
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { isDark, getColor, getTextColor } = useThemeColors();

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Determinar o gradiente baseado no gradientColor
  const getGradientStyle = () => {
    if (gradientColor === "green") {
      return "from-[#14F195]/20 via-[#14F195]/10 to-black/90";
    }
    return "from-black/0 via-black/30 to-black/90";
  };

  // Cor da barra superior
  const getTopBorderColor = () => {
    if (typeof topBorder === "string") {
      return topBorder === "green" ? "#14F195" : "#9945FF";
    }
    return barColor || (gradientColor === "green" ? "#14F195" : "#9945FF");
  };

  return (
    <motion.div 
      ref={cardRef}
      className={`w-full h-full ${className} ${neonEffect ? 'p-[2px]' : ''} perspective-1000`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container com efeito neon */}
      <motion.div 
        className={`
          relative w-full h-full rounded-[40px] overflow-hidden
          ${neonEffect ? 'before:absolute before:inset-0 before:rounded-[40px] before:p-[2px] before:bg-gradient-to-br before:z-0 before:animate-rotate-gradient' : ''}
        `}
        style={neonEffect ? {
          boxShadow: `0 0 15px 2px ${neonColors.from}80`,
          background: `linear-gradient(to bottom right, ${neonColors.from}, ${neonColors.to})`,
        } : undefined}
        whileHover={{ 
          boxShadow: neonEffect ? `0 0 25px 5px ${neonColors.from}80` : undefined,
          scale: 1.02,
        }}
      >
        {/* Card interno */}
        <div 
          className={`
            relative w-full h-full rounded-[40px] overflow-hidden
            group transition-all duration-300
          `}
          style={{
            backgroundColor: isDark ? getColor('card.background') : getColor('card.background'),
          }}
        >
          {/* Barra superior colorida */}
          {topBorder && (
            <motion.div 
              className="absolute top-0 left-0 right-0 h-1 z-10" 
              style={{ 
                backgroundColor: getTopBorderColor(),
                opacity: 0.8
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )}

          {/* Background image */}
          {backgroundImage && (
            <motion.div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left center',
                backgroundRepeat: 'no-repeat',
                transform: 'scale(1.1)',
                transformOrigin: 'left center',
                opacity: 0.6
              }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Overlay gradiente horizontal (esquerda para direita) */}
          <div className={`absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20 z-[1]`} />
          
          {/* Overlay gradiente vertical (complementar) */}
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-[1]`} />

          {/* Conteúdo */}
          <div className="relative z-[2] p-8 h-full flex flex-col">
            {/* Tag */}
            {tag && (
              <motion.span 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium max-w-fit backdrop-blur-sm"
                style={{ 
                  backgroundColor: gradientColor === "green" ? "#14F195" : "#8A46FF",
                  color: isDark ? getColor('card.text.primary') : '#ffffff'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            )}

            {/* Área de texto e botão */}
            <div className="mt-auto">
              {/* Título */}
              <motion.h3 
                className="text-3xl font-bold mb-2 py-4 leading-tight"
                style={{
                  color: isDark ? getColor('card.text.primary') : '#ffffff'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 5 }}
              >
                {title}
              </motion.h3>
              
              {/* Subtítulo (opcional) */}
              {subtitle && (
                <motion.p 
                  className="text-xl mb-2 font-medium"
                  style={{
                    color: isDark ? getColor('card.text.secondary') : '#ffffff'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {subtitle}
                </motion.p>
              )}
              
              {/* Descrição */}
              <motion.p 
                className="text-lg mb-6 leading-relaxed"
                style={{
                  color: isDark ? getColor('card.text.secondary') : '#ffffff'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {description}
              </motion.p>

              {/* Botão circular */}
              <Link
                href={href}
                className="inline-block"
              >
                <motion.div 
                  className="
                    flex items-center justify-center w-12 h-12
                    rounded-full border
                    transition-all duration-300
                    backdrop-blur-sm
                  "
                  style={{ 
                    borderColor: gradientColor === "green" ? "#14F195" : isDark ? getColor('card.border') : getColor('card.border'),
                    color: gradientColor === "green" ? "#14F195" : isDark ? getColor('card.text.primary') : getColor('card.text.primary')
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <svg
                    className="w-6 h-6 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
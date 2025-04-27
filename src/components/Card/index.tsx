"use client";

import Link from "next/link";

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
}: CardProps) => {
  // Determinar o gradiente baseado no gradientColor
  const getGradientStyle = () => {
    if (gradientColor === "green") {
      return "from-[#14F195]/20 via-[#14F195]/10 to-black/90";
    }
    return "from-black/0 via-black/30 to-black/90";
  };

  // Cor da barra superior
  const barColorStyle = barColor || (gradientColor === "green" ? "#14F195" : "#8A46FF");

  return (
    <div className={`w-full h-full ${className} ${neonEffect ? 'p-[2px]' : ''}`}>
      {/* Container com efeito neon */}
      <div 
        className={`
          relative w-full h-full rounded-[40px] overflow-hidden
          ${neonEffect ? 'before:absolute before:inset-0 before:rounded-[40px] before:p-[2px] before:bg-gradient-to-br before:z-0 before:animate-rotate-gradient' : ''}
        `}
        style={neonEffect ? {
          boxShadow: `0 0 15px 2px ${neonColors.from}80`,
          background: `linear-gradient(to bottom right, ${neonColors.from}, ${neonColors.to})`,
        } : undefined}
      >
        {/* Card interno */}
        <div 
          className={`
            relative w-full h-full rounded-[40px] bg-[#151515] overflow-hidden
            group transition-all duration-300
          `}
        >
          {/* Barra superior colorida */}
          {!neonEffect && (
            <div 
              className="absolute top-0 left-0 right-0 h-1 z-10" 
              style={{ backgroundColor: barColorStyle }}
            />
          )}

          {/* Background image */}
          {backgroundImage && (
            <div 
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
              <div 
                className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-medium max-w-fit"
                style={{ backgroundColor: gradientColor === "green" ? "#14F195" : "#8A46FF" }}
              >
                {tag}
              </div>
            )}

            {/* Área de texto e botão */}
            <div className="mt-auto">
              {/* Título */}
              <h3 className="text-3xl font-bold text-white mb-2 py-4">
                {title}
              </h3>
              
              {/* Subtítulo (opcional) */}
              {subtitle && (
                <p className="text-xl text-gray-300 mb-2">
                  {subtitle}
                </p>
              )}
              
              {/* Descrição */}
              <p className="text-[#848484] text-lg mb-6">
                {description}
              </p>

              {/* Botão circular */}
              <Link
                href={href}
                className="inline-block"
              >
                <div 
                  className="
                    flex items-center justify-center w-12 h-12
                    rounded-full border text-white
                    transition-all duration-300
                    group-hover:bg-white group-hover:text-black
                  "
                  style={{ 
                    borderColor: gradientColor === "green" ? "#14F195" : "#333333",
                    color: gradientColor === "green" ? "#14F195" : "white"
                  }}
                >
                  <svg
                    className="w-6 h-6 transition-colors duration-300 group-hover:stroke-black"
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
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
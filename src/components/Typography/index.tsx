"use client";

import React, { PropsWithChildren, ElementType } from "react";
import { ColorPath, ThemeFontSize, ThemeFontWeight } from "@/shared/styles/theme";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

type FontFamily = "diatype" | "dsemi" | "monument" | "grotesk" | "abcm";
type TextAlign = "left" | "center" | "right" | "justify";
type TextTransform = "uppercase" | "lowercase" | "capitalize" | "normal-case";
type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle" | "body" | "small" | "caption" | "button";

export interface TypographyProps extends PropsWithChildren {
  /** Variante de texto (define tamanho, peso e estilo padrão) */
  variant?: Variant;
  /** Família de fonte personalizada */
  font?: FontFamily;
  /** Cor do texto, usando cores do tema */
  color?: ColorPath;
  /** Tamanho da fonte personalizado */
  size?: ThemeFontSize;
  /** Tamanho da fonte para dispositivos móveis */
  mobileSize?: ThemeFontSize;
  /** Peso da fonte personalizado */
  weight?: ThemeFontWeight;
  /** Tag HTML a ser renderizada */
  as?: ElementType;
  /** Classes CSS adicionais */
  className?: string;
  /** Alinhamento do texto */
  align?: TextAlign;
  /** Transformação do texto */
  transform?: TextTransform;
  /** Modo de exibição (block, inline, etc) */
  display?: string;
  /** Se o texto deve ser truncado com ellipsis */
  truncate?: boolean;
  /** Número de linhas antes de truncar (requer truncate=true) */
  lines?: number;
  /** Se deve aplicar gradient ao texto */
  gradient?: boolean;
  /** Se deve ser responsivo (ajustar tamanho automaticamente) */
  responsive?: boolean;
  /** Estilos CSS inline */
  style?: React.CSSProperties;
}

/**
 * Componente Typography para padronização de estilos de texto em toda a aplicação.
 * Suporta todas as variações de texto do design system, com adaptação automática para temas claro/escuro.
 */
export function Typography({
  children,
  variant = "body",
  font,
  color,
  size,
  mobileSize,
  weight,
  as,
  className = "",
  align,
  transform,
  display,
  truncate = false,
  lines,
  gradient = false,
  responsive = true,
  style,
  ...props
}: TypographyProps) {
  const { getColor, isDark } = useThemeColors();
  const isMobile = useIsMobile();

  // Configurações padrão baseadas na variante
  const variantConfig = {
    h1: {
      tag: "h1",
      size: "2xl",
      mobileSize: "xl",
      weight: "bold",
      font: "monument",
    },
    h2: {
      tag: "h2",
      size: "xl",
      mobileSize: "lg",
      weight: "bold",
      font: "monument",
    },
    h3: {
      tag: "h3",
      size: "lg",
      mobileSize: "md",
      weight: "bold",
      font: "monument",
    },
    h4: {
      tag: "h4",
      size: "md",
      mobileSize: "sm",
      weight: "bold",
      font: "monument",
    },
    h5: {
      tag: "h5",
      size: "sm",
      mobileSize: "xs",
      weight: "bold",
      font: "monument",
    },
    h6: {
      tag: "h6",
      size: "xs",
      mobileSize: "xs",
      weight: "semibold",
      font: "monument",
    },
    subtitle: {
      tag: "p",
      size: "lg",
      mobileSize: "md",
      weight: "medium",
      font: "grotesk",
    },
    body: {
      tag: "p",
      size: "md",
      mobileSize: "sm",
      weight: "normal",
      font: "diatype",
    },
    small: {
      tag: "p",
      size: "sm",
      mobileSize: "xs",
      weight: "normal",
      font: "diatype",
    },
    caption: {
      tag: "span",
      size: "xs",
      mobileSize: "xs",
      weight: "normal",
      font: "diatype",
    },
    button: {
      tag: "span",
      size: "md",
      mobileSize: "sm",
      weight: "medium",
      font: "monument",
    }
  };

  // Componente HTML a renderizar
  const Component = as || variantConfig[variant].tag as ElementType;
  
  // Família de fonte
  const fontFamily = font || variantConfig[variant].font;
  
  // Tamanho da fonte baseado na responsividade
  const fontSize = responsive && isMobile
    ? mobileSize || variantConfig[variant].mobileSize
    : size || variantConfig[variant].size;
  
  // Peso da fonte
  const fontWeight = weight || variantConfig[variant].weight;
  
  // Cores adaptativas
  const textColor = color ? getColor(color) : (
    variant.startsWith('h') ? getColor('text.primary') : getColor('text.secondary')
  );

  // Determinação das classes de cores do Tailwind
  let colorClasses = '';
  if (!gradient) {
    if (variant.startsWith('h')) {
      // Cabeçalhos: preto no modo claro, branco no modo escuro
      colorClasses = 'text-black dark:text-white';
    } else if (color) {
      // Cores específicas definidas pela prop
      if (color === 'text.primary') {
        colorClasses = 'text-black dark:text-white';
      } else if (color === 'text.secondary') {
        colorClasses = 'text-gray-500 dark:text-gray-300';
      } else if (color === 'primary') {
        colorClasses = 'text-hub-primary';
      } else if (color === 'secondary') {
        colorClasses = 'text-hub-secondary';
      }
      // Poderíamos adicionar mais mapeamentos aqui se necessário
    } else {
      // Texto secundário padrão
      colorClasses = 'text-gray-500 dark:text-gray-300';
    }
  }

  // Classes para truncamento de texto
  const truncateClasses = truncate
    ? lines
      ? `line-clamp-${lines} overflow-hidden`
      : "truncate overflow-hidden text-ellipsis whitespace-nowrap"
    : "";

  // Montando a classe final
  const classes = `
    font-${fontFamily}
    text-${fontSize}
    font-${fontWeight}
    ${colorClasses}
    ${align ? `text-${align}` : ""}
    ${transform || ""}
    ${display ? `${display}` : ""}
    ${truncateClasses}
    ${gradient ? "text-transparent bg-clip-text bg-gradient-to-r from-hub-primary to-hub-secondary" : ""}
    ${className}
  `;

  return React.createElement(
    Component,
    {
      className: classes,
      style: gradient ? {} : style,
      ...props
    },
    children
  );
}

// Componentes pré-configurados para uso comum
export function Heading1(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h1" {...props} />;
}

export function Heading2(props: Omit<TypographyProps, "variant">) {
  const { isDark } = useThemeColors();

  return <Typography variant="h2" {...props} 
    className={` 
      max-sm:text-3xl
      md:text-5xl
      ${
      isDark ? 'text-shadow-purple experience-title-gradient-dark' : 'experience-title-gradient-light'
    }`}
  />;
}

export function Heading3(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h3" {...props} />;
}

export function Heading4(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h4" className="max-sm:text-xl md:text-2xl p-2" {...props} />;
}

export function Heading5(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h5" {...props} />;
}

export function Heading6(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h6" {...props} />;
}

export function Subtitle(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="subtitle" {...props} />;
}

export function Body(props: Omit<TypographyProps, "variant">) {
  const { className = "", style, ...rest } = props;
  return <Typography 
    variant="body" 
    className={`
      max-sm:text-base md:text-2xl p-2 
      text-black dark:text-white 
      ${className}`}
    style={style}
    {...rest} 
  />;
}

export function Small(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="small" {...props} />;
}

export function Caption(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="caption" className="text-xs md:text-[1.2rem]" {...props} />;
}

export function ButtonText(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="button" {...props} />;
}

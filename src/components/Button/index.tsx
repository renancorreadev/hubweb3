import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Button({ 
  href = "#", 
  children, 
  variant = "primary", 
  size = "md", 
  fullWidth = false,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const { isDark } = useThemeColors();

  // Configurações de tamanho
  const sizeClasses = {
    sm: "py-2 px-4 text-xs",
    md: "py-3 px-6 text-sm",
    lg: "py-4 px-8 text-base"
  };

  // Configurações de variante com base no tema
  const variantClasses = {
    // Variante primária (verde)
    primary: isDark 
      ? "bg-hub-primary hover:bg-hub-primary/80 hover:shadow-[0_0_15px_rgba(20,241,149,0.5)]" 
      : "bg-hub-primary-light hover:bg-hub-primary-light/80 hover:shadow-[0_0_15px_rgba(14,166,107,0.5)]",
    
    // Variante secundária (contorno branco)
    secondary: "border border-white hover:bg-white/20 hover:border-white/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    
    // Nova variante terciária (roxo)
    tertiary: isDark 
      ? "bg-hub-secondary hover:bg-hub-secondary/80 hover:shadow-[0_0_15px_rgba(153,69,255,0.5)]" 
      : "bg-hub-secondary-light hover:bg-hub-secondary-light/80 hover:shadow-[0_0_15px_rgba(122,53,204,0.5)]"
  };

  // Cores do texto com base na variante
  const getTextColor = () => {
    if (variant === "primary" && isDark) {
      return "#000000"; // Texto preto para botão verde no modo escuro
    } else if (variant === "secondary") {
      return "#FFFFFF"; // Texto branco para botão secundário (outline)
    } else {
      return "#FFFFFF"; // Texto branco para outros casos
    }
  };

  const baseClasses = `
    rounded-full 
    font-dsemi 
    uppercase 
    tracking-wider 
    transition-all 
    duration-300
    font-bold
    inline-flex
    items-center
    justify-center
    text-center
    shadow-md
    hover:scale-105
    hover:translate-y-[-2px]
    active:scale-95
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  // Função para lidar com o clique quando não há um destino real
  const handleClick = (e: React.MouseEvent) => {
    if (href === "#" && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link 
      href={href} 
      className={baseClasses}
      onClick={handleClick}
      {...props as any}
    >
      <div 
        style={{ 
          color: getTextColor(),
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} 
        className="font-dsemi uppercase tracking-wider"
      >
        {children}
      </div>
    </Link>
  );
}

// Componentes de conveniência para retrocompatibilidade
export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" className="text-sm md:text-base" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="secondary" className="text-sm md:text-base" {...props} />;
}

export function TertiaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="tertiary" className="text-sm md:text-base" {...props} />;
} 
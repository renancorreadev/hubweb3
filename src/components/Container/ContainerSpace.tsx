"use client";

interface ContainerSpaceProps {
  children: React.ReactNode;
  /** Número de colunas que este espaço deve ocupar (1-12) */
  cols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Número de colunas em tablet (768px+), se não informado usa o mesmo de cols */
  tabletCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Número de colunas em mobile (<768px), se não informado usa o mesmo de cols */
  mobileCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Alinhamento horizontal do conteúdo */
  align?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /** Alinhamento vertical do conteúdo */
  valign?: "start" | "center" | "end" | "stretch" | "baseline";
  /** Classes CSS adicionais */
  className?: string;
}

export const ContainerSpace = ({ 
  children, 
  cols = 12,
  tabletCols,
  mobileCols,
  align = "start", 
  valign = "start", 
  className = "" 
}: ContainerSpaceProps) => {
  // Classes para col-span
  const colSpanClass = `col-span-${cols}`;
  
  // Mapeamento para alinhamento horizontal
  const alignClass = {
    "start": "justify-start",
    "center": "justify-center",
    "end": "justify-end",
    "between": "justify-between",
    "around": "justify-around",
    "evenly": "justify-evenly"
  }[align];

  // Mapeamento para alinhamento vertical
  const valignClass = {
    "start": "items-start",
    "center": "items-center",
    "end": "items-end",
    "stretch": "items-stretch",
    "baseline": "items-baseline"
  }[valign];

  return (
    <div className={`${colSpanClass} flex flex-col ${alignClass} ${valignClass} ${className}`}>
      {children}
    </div>
  );
};

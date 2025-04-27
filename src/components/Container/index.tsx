"use client";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Se true, aplicará padding mínimo nas laterais */
  fluid?: boolean;
  /** Número de colunas no grid (1-12) */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Se true, aplica justify-between na grid */
  spaceBetween?: boolean;
  /** Se true, transforma grid em 1 coluna para mobile e tablet, mantendo configuração original apenas para lg+ */
  responsiveGrid?: boolean;
}

export const Container = ({ 
  children, 
  className = "", 
  fluid = false, 
  columns = 12,
  spaceBetween = false,
  responsiveGrid = false
}: ContainerProps) => {
  
  // Criar manualmente o CSS para garantir que o tailwind processe corretamente
  const desktopGridClass = 
    columns === 1 ? "lg:grid-cols-1" :
    columns === 2 ? "lg:grid-cols-2" :
    columns === 3 ? "lg:grid-cols-3" :
    columns === 4 ? "lg:grid-cols-4" :
    columns === 5 ? "lg:grid-cols-5" :
    columns === 6 ? "lg:grid-cols-6" :
    columns === 7 ? "lg:grid-cols-7" :
    columns === 8 ? "lg:grid-cols-8" :
    columns === 9 ? "lg:grid-cols-9" :
    columns === 10 ? "lg:grid-cols-10" :
    columns === 11 ? "lg:grid-cols-11" : "lg:grid-cols-12";

  // Determinar as classes do grid
  let gridClasses = responsiveGrid
    ? `grid grid-cols-1 ${desktopGridClass}`
    : `grid grid-cols-${columns}`;

  return (
    <div className={`mx-auto ${fluid ? 'px-4' : 'container px-4 md:px-6 lg:px-8'} ${className}`}>
      <div className={`${gridClasses} gap-4 md:gap-6 lg:gap-8 ${spaceBetween ? 'justify-between' : ''}`}>
        {children}
      </div>
    </div>
  );
}; 
"use client";

import { useState, useEffect } from 'react';

/**
 * Hook que verifica se a tela atual está em uma largura considerada "mobile"
 * baseado nos breakpoints do Tailwind (menor que 1024px - lg)
 * 
 * @returns {boolean} - true se a tela for considerada mobile, false caso contrário
 */
export function useIsMobile(): boolean {
  // Pré-definir como false para SSR
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Verificar inicialmente
    const checkMobile = () => {
      // Conforme o breakpoint 'lg' no tailwind.config.ts (1024px)
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Verificar no carregamento
    checkMobile();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkMobile);
    
    // Limpar listener quando o componente for desmontado
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

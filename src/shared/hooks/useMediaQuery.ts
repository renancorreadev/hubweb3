"use client";

import { useState, useEffect } from 'react';

/**
 * Hook que verifica se uma determinada consulta de mídia corresponde à janela atual
 * 
 * @param {string} query - A consulta de mídia a ser verificada (ex: "(max-width: 768px)")
 * @returns {boolean} - true se a consulta de mídia corresponder, false caso contrário
 */
export function useMediaQuery(query: string): boolean {
  // Pré-definir como false para SSR
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Criar media query
    const media = window.matchMedia(query);
    
    // Definir status inicial
    setMatches(media.matches);
    
    // Callback para atualizar o estado quando a correspondência de mídia muda
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Adicionar listener
    media.addEventListener('change', listener);
    
    // Limpar listener quando o componente for desmontado
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
} 
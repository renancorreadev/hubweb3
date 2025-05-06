"use client";

import React, { useCallback, useEffect, useRef, useMemo } from "react";
import Particles from "@tsparticles/react";
import { Container, tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

interface BlockchainParticlesProps {
  active?: boolean;
  intensity?: number;
  className?: string;
}

// Inicialização única do engine - compartilhada entre todas as instâncias
let engineInitialized = false;
let containerInstances = new Map();

const initializeEngine = async () => {
  if (!engineInitialized) {
    await loadSlim(tsParticles);
    engineInitialized = true;
  }
  return true;
};

export const BlockchainParticles = ({ 
  active = true,
  intensity = 1,
  className = ""
}: BlockchainParticlesProps) => {
  const { isDark, getColor } = useThemeColors();
  const initializationRef = useRef(false);
  const containerRef = useRef<Container | null>(null);
  const instanceIdRef = useRef<string>(`particles-${Math.random().toString(36).substring(2, 9)}`);
  
  // Inicializa o engine apenas uma vez por aplicação
  useEffect(() => {
    if (!initializationRef.current) {
      initializeEngine().then(() => {
        initializationRef.current = true;
      });
    }
    
    // Cleanup ao desmontar - preserva a instância
    return () => {
      if (containerRef.current) {
        // Apenas armazena a instância, não a destroi
        containerInstances.set(instanceIdRef.current, containerRef.current);
      }
    };
  }, []);
  
  // Atualiza a visibilidade das partículas quando active muda
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      if (active) {
        // Suavemente aumenta a opacidade das partículas
        setTimeout(() => {
          if (!container.destroyed) {
            container.play();
          }
        }, 10);
      } else {
        // Mantém as partículas mas reduz a animação
        setTimeout(() => {
          if (!container.destroyed) {
            container.pause();
          }
        }, 10);
      }
    }
  }, [active]);

  // Configuração base para partículas - memorizada para evitar recriações
  const particlesConfig = useMemo(() => {
    const primaryColor = isDark ? getColor('secondary') : getColor('primary');
    const secondaryColor = isDark ? "#4B0082" : "#8A2BE2";
    
    // Intensidade afeta a quantidade de partículas
    const particleCount = Math.floor(15 * intensity);
    
    return {
      fullScreen: { enable: false },
      pauseOnBlur: false,
      pauseOnOutsideViewport: false,
      fpsLimit: 60,
      smooth: true,
      particles: {
        number: {
          value: particleCount,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: [primaryColor, secondaryColor, "#ffffff"]
        },
        shape: {
          type: ["circle", "triangle", "polygon"],
          polygon: {
            sides: 6
          }
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 6 * intensity },
          animation: {
            enable: true,
            speed: 3,
            minimumValue: 1,
            sync: false
          }
        },
        links: {
          enable: true,
          distance: 150,
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(100, 100, 100, 0.1)",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: {
            default: "bounce" as const
          },
          attract: {
            enable: true,
            x: 600,
            y: 1200
          }
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab"
          },
          onClick: {
            enable: true,
            mode: "push"
          },
          resize: {
            enable: true
          }
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.4
            }
          },
          push: {
            quantity: 3
          }
        }
      },
      detectRetina: true,
      background: {
        color: "transparent",
      }
    };
  }, [isDark, getColor, intensity]);

  // Função para lidar com partículas carregadas
  const handleParticlesLoaded = useCallback(async (container?: Container) => {
    if (container) {
      containerRef.current = container;
      
      // Verifica se temos uma instância anterior para reutilizar
      if (containerInstances.has(instanceIdRef.current)) {
        // Copia configurações se houver uma instância anterior
        const prevContainer = containerInstances.get(instanceIdRef.current);
        if (prevContainer && !prevContainer.destroyed) {
          // Opcional: copiar estados se necessário
        }
        containerInstances.delete(instanceIdRef.current);
      }
    }
  }, []);

  // Renderização com posicionamento absoluto e pointer-events-none para não interferir
  return (
    <div 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{ 
        willChange: 'opacity',
        opacity: active ? 1 : 0.1, 
        transition: 'opacity 400ms ease-in-out'
      }}
    >
      <Particles
        id={instanceIdRef.current}
        options={particlesConfig}
        particlesLoaded={handleParticlesLoaded}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}; 
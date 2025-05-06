"use client";

import React, { useCallback, useEffect, useRef, useMemo } from "react";
import Particles from "@tsparticles/react";
import { Container, tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

interface HeroParticlesProps {
  active?: boolean;
  intensity?: number;
  className?: string;
  interactive?: boolean;
}

// Inicialização única do engine - independente do componente global
const initializeHeroEngine = async () => {
  try {
    // Inicializa uma instância específica para o Hero
    await loadSlim(tsParticles);
    console.log("HeroParticles: Engine initialized successfully");
    return true;
  } catch (error) {
    console.error("HeroParticles: Failed to initialize engine", error);
    return false;
  }
};

export const HeroParticles = ({ 
  active = true,
  intensity = 1,
  className = "",
  interactive = false
}: HeroParticlesProps) => {
  const { isDark, getColor } = useThemeColors();
  const engineInitializedRef = useRef(false);
  const containerRef = useRef<Container | null>(null);
  const instanceIdRef = useRef<string>(`hero-particles-${Math.random().toString(36).substring(2, 9)}`);
  
  // Inicializa o engine especificamente para este componente
  useEffect(() => {
    const initParticles = async () => {
      if (!engineInitializedRef.current) {
        console.log("HeroParticles: Initializing engine...");
        const success = await initializeHeroEngine();
        if (success) {
          engineInitializedRef.current = true;
          console.log("HeroParticles: Engine initialized successfully");
        }
      }
    };
    
    initParticles();
    
    return () => {
      // Cleanup ao desmontar
      if (containerRef.current) {
        console.log("HeroParticles: Cleaning up container");
        containerRef.current.destroy();
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
            console.log("HeroParticles: Container playing");
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
    const particleCount = Math.floor(20 * intensity); // Aumentei o número de partículas
    
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
      console.log("HeroParticles: Container loaded", container.id);
      containerRef.current = container;
    }
  }, []);

  // Aumente a opacidade para debug
  const opacityLevel = active ? (interactive ? 0.8 : 0.5) : 0.1;

  // Renderização com posicionamento absoluto
  return (
    <div 
      className={`absolute inset-0 z-0 ${interactive ? "" : "pointer-events-none"} ${className}`}
      style={{ 
        willChange: 'opacity',
        opacity: opacityLevel, 
        transition: 'opacity 400ms ease-in-out',
        position: 'absolute',
        zIndex: 0
      }}
    >
      <Particles
        id={instanceIdRef.current}
        options={particlesConfig}
        particlesLoaded={handleParticlesLoaded}
        className={`absolute inset-0 ${interactive ? "" : "pointer-events-none"}`}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
    </div>
  );
}; 
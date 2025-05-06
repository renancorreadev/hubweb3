"use client";

import React, { useRef, useState, useEffect, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Text } from "@react-three/drei";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import * as THREE from "three";

interface BlockProps {
  active: boolean;
  mining: boolean;
  hash: string;
  position: [number, number, number];
  size?: [number, number, number];
  color?: string;
  wireframe?: boolean;
  onMiningComplete?: () => void;
  mined?: boolean;
}

// Componente do cubo 3D (bloco de blockchain) com prevenção de re-renderização
const Block = ({ 
  active, 
  mining, 
  hash, 
  position, 
  size = [1, 1, 1], 
  color, 
  wireframe = false,
  onMiningComplete,
  mined: externalMined = false
}: BlockProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isDark, getColor } = useThemeColors();
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [miningProgress, setMiningProgress] = useState(0);
  const [miningComplete, setMiningComplete] = useState(externalMined);
  
  // Refs para evitar loops de renderização
  const callbackFiredRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const miningRef = useRef(mining);
  const activeRef = useRef(active);
  const minedRef = useRef(externalMined);
  
  // Atualiza as refs quando as props mudam, sem causar re-renderização
  useLayoutEffect(() => {
    miningRef.current = mining;
    activeRef.current = active;
    minedRef.current = externalMined;
    
    // Atualiza estado se necesário - causará re-renderização controlada
    if (externalMined && !miningComplete) {
      setMiningComplete(true);
      setMiningProgress(1);
      setRotationSpeed(0.2);
    }
    
    // Atualiza rotação baseado no estado ativo/mineração
    if (active) {
      setRotationSpeed(mining ? 1 : 0.2);
    } else if (rotationSpeed !== 0) {
      setRotationSpeed(0);
    }
  }, [active, mining, externalMined, miningComplete, rotationSpeed]);
  
  // Loop de animação de mineração controlada por RAF
  useEffect(() => {
    // Cancela animação existente ao desmontar
    const cancelAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
    
    // Se não devemos minerar ou já completou, cancela animação
    if (!miningRef.current || miningComplete) {
      cancelAnimation();
      return cancelAnimation;
    }
    
    // Reseta estado para nova animação
    if (miningRef.current && !miningComplete) {
      lastTimeRef.current = 0;
      callbackFiredRef.current = false;
    }
    
    // Função animação usando timestamp para suavidade
    const updateMiningProgress = (time: number) => {
      // Setup inicial do timestamp
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
        animationFrameRef.current = requestAnimationFrame(updateMiningProgress);
        return;
      }
      
      // Cálculo delta de tempo para animação suave
      const deltaTime = Math.min(time - lastTimeRef.current, 32); // max 32ms (protege contra lags)
      lastTimeRef.current = time;
      
      // Evita calcular se já terminou
      if (miningComplete) {
        cancelAnimation();
        return;
      }
      
      // Velocidade fixa para completar exatamente em 5000ms (5 segundos)
      const progressSpeed = deltaTime / 5000;
      
      setMiningProgress(prev => {
        const newProgress = Math.min(prev + progressSpeed, 1);
        
        // Dispara callback para componente parent quando mineração completa
        if (newProgress >= 1 && !callbackFiredRef.current) {
          setMiningComplete(true);
          setRotationSpeed(0.2);
          callbackFiredRef.current = true;
          
          // Usa microtask para evitar problemas no ciclo de renderização
          if (onMiningComplete) {
            queueMicrotask(onMiningComplete);
          }
          
          return 1;
        }
        
        return newProgress;
      });
      
      // Continua loop se ainda estiver minerando
      if (!miningComplete && miningRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateMiningProgress);
      }
    };
    
    // Inicia animação
    if (!animationFrameRef.current && miningRef.current && !miningComplete) {
      animationFrameRef.current = requestAnimationFrame(updateMiningProgress);
    }
    
    return cancelAnimation;
  }, [miningComplete, onMiningComplete]);
  
  // Animação do cubo usando timebase independente
  useFrame(() => {
    if (!meshRef.current) return;
    
    // Rotação constante
    meshRef.current.rotation.x += rotationSpeed * 0.01;
    meshRef.current.rotation.y += rotationSpeed * 0.02;
    
    // Efeito pulsante durante mineração
    if (miningRef.current && !miningComplete) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    } else if (miningComplete && 
              (meshRef.current.scale.x !== 1 || 
               meshRef.current.scale.y !== 1 || 
               meshRef.current.scale.z !== 1)) {
      // Reset scale apenas se necessário
      meshRef.current.scale.set(1, 1, 1);
    }
  });
  
  // Memoização de valores para prevenir recálculos
  const blockColor = useMemo(() => 
    color || (isDark ? getColor('secondary') : getColor('primary')),
    [color, isDark, getColor]
  );
  
  const emissiveIntensity = mining ? 0.5 : (active ? 0.2 : 0);
  
  return (
    <group position={position}>
      <Box 
        ref={meshRef} 
        args={size}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={blockColor}
          wireframe={wireframe}
          emissive={blockColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.5}
          metalness={0.8}
          opacity={active ? 1 : 0.7}
          transparent
        />
      </Box>
      
      {active && (
        <Text
          position={[0, -size[1]/1.5, size[2]/2]}
          fontSize={0.05}
          color={isDark ? "#ffffff" : "#000000"}
          anchorX="center"
          anchorY="middle"
        >
          {hash.substring(0, 8)}
        </Text>
      )}
      
      {mining && !miningComplete && (
        <group position={[0, size[1]/2 + 0.1, 0]}>
          <Box args={[size[0], 0.03, 0.03]} position={[0, 0, 0]}>
            <meshBasicMaterial color="#333333" opacity={0.5} transparent />
          </Box>
          <Box 
            args={[size[0] * miningProgress, 0.02, 0.02]} 
            position={[-size[0]/2 * (1 - miningProgress), 0, 0.01]}
          >
            <meshBasicMaterial color={isDark ? "#9945FF" : "#7A35CC"} />
          </Box>
        </group>
      )}
    </group>
  );
};

interface BlockchainCubeProps {
  active?: boolean;
  mining?: boolean;
  hash?: string;
  onMiningComplete?: () => void;
  className?: string;
  mined?: boolean;
}

export const BlockchainCube = React.memo(({ 
  active = false, 
  mining = false, 
  hash = "0x1a2b3c4d5e6f",
  onMiningComplete,
  className = "",
  mined = false
}: BlockchainCubeProps) => {
  // Valores memorizados para o Canvas
  const cubeProps = useMemo(() => ({
    active,
    mining,
    hash,
    mined,
    onMiningComplete
  }), [active, mining, hash, mined, onMiningComplete]);
  
  // Memoização para evitar re-renderizações do Canvas 3D
  const canvasConfig = useMemo(() => ({
    shadows: true,
    gl: { 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance" as const
    },
    camera: { 
      position: [0, 0, 2.5] as [number, number, number], 
      fov: 50 
    },
    frameloop: "demand" as const
  }), []);
  
  return (
    <div className={`${className} w-full h-full relative overflow-hidden`}>
      <Canvas {...canvasConfig}>
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.8} 
          castShadow 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Bloco principal */}
        <Block 
          position={[0, 0, 0]}
          size={[1.2, 0.6, 0.2]}
          {...cubeProps}
        />
        
        {/* Blocos decorativos - memoizados para performance */}
        <Block 
          active={false}
          mining={false}
          hash=""
          position={[-1.5, 0.8, -1]}
          size={[0.4, 0.4, 0.1]}
          wireframe
        />
        <Block 
          active={false}
          mining={false}
          hash=""
          position={[1.2, -0.6, -0.8]}
          size={[0.3, 0.3, 0.1]}
          wireframe
        />
      </Canvas>
    </div>
  );
}); 
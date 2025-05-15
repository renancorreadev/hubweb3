"use client";

import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { mobileOnly } from "@/shared/configs/responsive";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Prism from 'prismjs';
import 'prismjs/components/prism-solidity';
import 'prismjs/themes/prism-tomorrow.css';
import Particles from "@tsparticles/react";
import { Container, tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export const Hero = () => {
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<Container | null>(null);
  const particlesIdRef = useRef<string>(`hero-particles-${Math.random().toString(36).substring(2, 9)}`);
  
  // Para efeito 3D no mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);
  
  // Para animação de brilho
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  // Terminal output animation
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [compileStep, setCompileStep] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [showEnergyFlow, setShowEnergyFlow] = useState(false);
  
  // Para controle de partículas
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  // Inicializar Prism para syntax highlighting e partículas 
  useEffect(() => {
    Prism.highlightAll();
    
    // Inicializar partículas 
    const initParticles = async () => {
      try {
        console.log("Hero: Inicializando partículas...");
        await loadSlim(tsParticles);
        console.log("Hero: Partículas inicializadas com sucesso");
      } catch (error) {
        console.error("Hero: Erro ao inicializar partículas", error);
      }
    };
    
    initParticles();
    
    return () => {
      // Cleanup ao desmontar
      if (particlesContainerRef.current) {
        console.log("Hero: Limpando container de partículas");
        particlesContainerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  // Configuração das partículas
  const particlesConfig = useMemo(() => {
    const primaryColor = isDark ? getColor('secondary') : getColor('primary');
    const secondaryColor = isDark ? "#4B0082" : "#8A2BE2";
    
    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        number: {
          value: 30,
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
          value: { min: 1, max: 6 },
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
  }, [isDark, getColor]);

  // Função para lidar com partículas carregadas
  const handleParticlesLoaded = useCallback(async (container?: Container) => {
    if (container) {
      console.log("Hero: Container de partículas carregado", container.id);
      particlesContainerRef.current = container;
      setParticlesLoaded(true);
    }
  }, []);

  // Handling mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const xPos = e.clientX - rect.left - rect.width / 2;
      const yPos = e.clientY - rect.top - rect.height / 2;
      x.set(xPos);
      y.set(yPos);
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCursorVisible(false);
  };

  // Função para iniciar a compilação
  const startCompilation = () => {
    setIsCompiling(true);
    setTerminalOutput([]);
    setCompileStep(0);
    setShowEnergyFlow(true);
    
    // Rolar para o terminal no mobile
    if (window.innerWidth < 1024 && terminalRef.current) {
      setTimeout(() => {
        terminalRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    
    // Desativar a animação de energia após um tempo
    setTimeout(() => {
      setShowEnergyFlow(false);
    }, 3000);
  };

  useEffect(() => {
    // Iniciar compilação automática na primeira vez
    startCompilation();
  }, []);

  useEffect(() => {
    if (!isCompiling) return;

    const compilationSteps = [
      { text: "> solc --version", delay: 500 },
      { text: "solc, the solidity compiler commandline interface", delay: 700 },
      { text: "Version: 0.8.17+commit.8df45f5f.Linux.g++", delay: 300 },
      { text: "", delay: 300 },
      { text: "> solc --optimize --bin blockchain_developer.sol", delay: 800 },
      { text: "Processing 'blockchain_developer.sol'...", delay: 1200 },
      { text: "Compiler run successful. Artifact(s) generated.", delay: 1000 },
      { text: "", delay: 500 },
      { text: "> EVM bytecode generated:", delay: 800 },
      { text: "0x60806040523480156200001157600080fd5b506040518060400160405280600c81526020017f52656e616e20436f7272656100000000000000000000000000000000000000008152506000908051906020019062000060929190620001bb", delay: 300 },
      { text: "0x78325682369b5a8362f5de35bc7a2e34aa419dbf0039ab0e50cad9dab9c7b5d95c0f9c22c45a93a05d2678f9b018878802b85e32f37bcd7a62a09aeaed3c23c3", delay: 300 },
      { text: "... truncated for display ...", delay: 500 },
      { text: "", delay: 300 },
      { text: "> Deploying smart contract to EVM...", delay: 1200 },
      { text: "Transaction hash: 0x43a5d6a7b4b9f12bc9dc2eb31321e07d8cfadb8beb6a8de8761abcf21dea31a5", delay: 800 },
      { text: "Contract address: 0x8a28E8bbC45E9873A8a4C611Bc1Fd582fe7bCbb0", delay: 800 },
      { text: "", delay: 300 },
      { text: "> Reading contract data...", delay: 1000 },
      { text: "name() => \"Renan Correa\"", delay: 500 },
      { text: "role() => \"Senior Blockchain Engineer\"", delay: 500 },
      { text: "experience() => 7", delay: 500 },
      { text: "getExpertise() => \"Asset Tokenization & DLT Solutions\"", delay: 700 },
      { text: "skills(0) => { name: \"Ethereum\", level: 95 }", delay: 400 },
      { text: "skills(1) => { name: \"Solana\", level: 90 }", delay: 400 },
      { text: "skills(2) => { name: \"Rust\", level: 85 }", delay: 400 },
      { text: "skills(3) => { name: \"Hyperledger\", level: 90 }", delay: 400 },
      { text: "skills(4) => { name: \"Tokenization\", level: 98 }", delay: 400 },
      { text: "getProjects() => [\"CreatorPRO Platform\", \"DREX Sandbox\", \"Asset Tokenization\", \"Custom Block Explorer\"]", delay: 800 },
      { text: "", delay: 500 },
      { text: "> Contract successfully deployed and verified", delay: 1000 }
    ];

    if (compileStep < compilationSteps.length) {
      const timer = setTimeout(() => {
        setTerminalOutput(prev => [...prev, compilationSteps[compileStep].text]);
        setCompileStep(prev => prev + 1);
      }, compilationSteps[compileStep].delay);
      
      return () => clearTimeout(timer);
    } else {
      setIsCompiling(false);
    }
  }, [compileStep, isCompiling]);

  // Hexágonos flutuantes para o fundo
  const hexagons = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 10,
    duration: Math.random() * 30 + 10,
    delay: Math.random() * 5,
  }));

  // Blockchain nodes para visualização de rede
  const nodes = [
    { id: 1, x: 75, y: 20, connections: [2, 3, 5] },
    { id: 2, x: 85, y: 40, connections: [1, 4, 6] },
    { id: 3, x: 65, y: 35, connections: [1, 4] },
    { id: 4, x: 75, y: 60, connections: [2, 3, 5] },
    { id: 5, x: 60, y: 70, connections: [1, 4, 6] },
    { id: 6, x: 85, y: 75, connections: [2, 5] }
  ];

  const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Developer Profile Smart Contract
 * @author Renan Correa
 * @notice Stores professional skills and experience for blockchain developers
 */
contract DeveloperProfile {
    string public name = "Renan Correa";
    string public role = "Senior Blockchain Engineer";
    uint256 public experience = 7; // years
    
    struct Skill {
        string name;
        uint256 level; // 1-100
    }
    
    Skill[] public skills;
    address public owner;
    
    event SkillAdded(string name, uint256 level);
    event ProjectCompleted(string name, uint256 timestamp);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        
        // Initialize skills
        skills.push(Skill("Ethereum", 95));
        skills.push(Skill("Solana", 90));
        skills.push(Skill("Rust", 85));
        skills.push(Skill("Hyperledger", 90));
        skills.push(Skill("Tokenization", 98));
    }
    
    /**
     * @notice Returns developer's main expertise
     * @return expertise description
     */
    function getExpertise() public pure returns (string memory) {
        return "Asset Tokenization & DLT Solutions";
    }
    
    /**
     * @notice Returns list of completed projects
     * @return array of project names
     */
    function getProjects() public pure returns (string[] memory) {
        string[] memory projects = new string[](4);
        projects[0] = "CreatorPRO Platform";
        projects[1] = "DREX Sandbox";
        projects[2] = "Asset Tokenization";
        projects[3] = "Custom Block Explorer";
        return projects;
    }
    
    /**
     * @notice Add a new skill to developer profile
     * @param _name skill name
     * @param _level proficiency level (1-100)
     */
    function addSkill(string memory _name, uint256 _level) public onlyOwner {
        require(_level > 0 && _level <= 100, "Level must be between 1-100");
        skills.push(Skill(_name, _level));
        emit SkillAdded(_name, _level);
    }
    
    /**
     * @notice Update experience years
     * @param _years new experience value
     */
    function updateExperience(uint256 _years) public onlyOwner {
        experience = _years;
    }
    
    /**
     * @notice Log completion of a new project
     * @param _name project name
     */
    function completeProject(string memory _name) public onlyOwner {
        emit ProjectCompleted(_name, block.timestamp);
    }
}`;

  return (
    <section 
      className={`
        relative w-full min-h-[90vh] flex items-center overflow-hidden
        ${mobileOnly.margin.mt6}
        `}
      style={{
        backgroundColor: isDark ? getColor('background') : '#ffffff',
      }}
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas blockchain direto no componente */}
        {!isMobile && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
              className="absolute inset-0 opacity-70" 
              style={{ 
                willChange: 'opacity',
                transition: 'opacity 400ms ease-in-out'
              }}
            >
              <Particles
                id={particlesIdRef.current}
                options={particlesConfig}
                particlesLoaded={handleParticlesLoaded}
                className="absolute inset-0"
              />
            </div>
          </div>
        )}
        {/* SVG Pattern Background */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "#14F195" : "#0EA66B"} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}
        {/* Floating Hexagons */}
        {!isMobile && (
          <div className="absolute inset-0">
            {hexagons.map((hex) => (
              <motion.div
                key={hex.id}
                className="absolute opacity-10"
                style={{
                  left: `${hex.x}%`,
                  top: `${hex.y}%`,
                  width: `${hex.size}px`,
                  height: `${hex.size}px`,
                }}
                initial={{ y: -20, x: 0, opacity: 0.05 }}
                animate={{ 
                  y: [0, -30, 0], 
                  opacity: [0.05, 0.15, 0.05],
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: hex.duration,
                  delay: hex.delay, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <polygon 
                    points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" 
                    fill={hex.id % 2 === 0 ? (isDark ? "#14F19508" : "#0EA66B08") : (isDark ? "#9945FF08" : "#7A35CC08")}
                    stroke={hex.id % 2 === 0 ? (isDark ? "#14F195" : "#0EA66B") : (isDark ? "#9945FF" : "#7A35CC")}
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
        {/* Blockchain Network */}
        {!isMobile && (
          <div className="absolute bottom-0 right-0 w-full h-full opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Connections between nodes */}
              {nodes.map(node => 
                node.connections.map(connId => {
                  const connectedNode = nodes.find(n => n.id === connId);
                  if (!connectedNode) return null;
                  return (
                    <motion.line 
                      key={`${node.id}-${connId}`}
                      x1={`${node.x}%`} 
                      y1={`${node.y}%`} 
                      x2={`${connectedNode.x}%`} 
                      y2={`${connectedNode.y}%`}
                      stroke={isDark ? "#14F195" : "#0EA66B"}
                      strokeWidth="0.2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1,
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 3 + Math.random() * 2,
                        delay: Math.random() * 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  );
                })
              )}
            </svg>
          </div>
        )}
        {/* Gradient Circle */}
        {!isMobile && (
          <motion.div 
            className="absolute -right-40 -top-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${isDark ? '#14F195' : '#0EA66B'} 0%, transparent 70%)` 
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        )}
        {!isMobile && (
          <motion.div 
            className="absolute -left-20 bottom-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${isDark ? '#9945FF' : '#7A35CC'} 0%, transparent 70%)` 
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          />
        )}
      </div>
      {/* Mouse follow light effect */}
      {cursorVisible && (
        <div 
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? 'rgba(20, 241, 149, 0.05)' : 'rgba(14, 166, 107, 0.05)'}, transparent 40%)`,
          }}
        />
      )}

      <div className="w-full relative z-30">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            {/* Solidity Contract - Left Side */}
            <div className="w-full lg:w-1/2">
              <motion.div
                className="relative h-full"
                style={{
                  perspective: 1000,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)",
                    rotateX,
                    rotateY,
                    backgroundColor: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: isDark 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(20, 241, 149, 0.2)' 
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 15px rgba(14, 166, 107, 0.2)',
                  }}
                >
                  <div className="bg-gradient-to-r from-hub-primary to-hub-secondary p-1">
                    <div className="bg-black p-4 rounded-t-lg flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-white text-xs md:text-sm ml-4 font-mono">blockchain_developer.sol</span>
                      
                      <div className="ml-auto flex items-center gap-2 relative z-50">
                        <motion.button 
                          className="bg-[#14F19520] text-[#14F195] px-2 py-1 rounded text-xs font-mono border border-[#14F19540] hover:bg-[#14F19540]"
                          whileTap={{ scale: 0.95 }}
                          onClick={startCompilation}
                          aria-label="Compile and run the smart contract"
                        >
                          Compile & Run
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="font-mono text-xs md:text-sm code-container text-black dark:text-white"
                    style={{ 
                      transformStyle: "preserve-3d",
                      transform: "translateZ(40px)",
                      maxHeight: "60vh",
                      overflowY: "auto",
                      backgroundColor: isDark ? 'rgba(20, 20, 20, 0.95)' : 'rgba(250, 250, 250, 0.95)',
                    }}
                  >
                    <pre className="language-solidity" style={{ margin: 0 }}>
                      <code className="language-solidity">{solidityCode}</code>
                    </pre>
                  </div>
                  
                  {/* Glowing points */}
                  <motion.div 
                    className="absolute w-3 h-3 rounded-full"
                    style={{ 
                      background: isDark ? '#14F195' : '#0EA66B',
                      top: '30%',
                      right: '5%',
                      boxShadow: `0 0 15px ${isDark ? '#14F195' : '#0EA66B'}`,
                      filter: 'blur(1px)'
                    }}
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatType: 'reverse' 
                    }}
                  />

                  <motion.div 
                    className="absolute w-2 h-2 rounded-full"
                    style={{ 
                      background: isDark ? '#9945FF' : '#7A35CC',
                      bottom: '20%',
                      left: '10%',
                      boxShadow: `0 0 15px ${isDark ? '#9945FF' : '#7A35CC'}`,
                      filter: 'blur(1px)'
                    }}
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatType: 'reverse',
                      delay: 1
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Energy Flow Animation */}
            {showEnergyFlow && (
              <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Desktop animation */}
                <div className="hidden lg:block">
                  <svg width="100%" height="60" viewBox="0 0 100 60">
                    {/* Main energy beam */}
                    <motion.rect
                      x="0" y="28" width="100" height="4"
                      rx="2"
                      fill={isDark ? "rgba(20, 241, 149, 0.3)" : "rgba(14, 166, 107, 0.3)"}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ 
                        scaleX: 1,
                        opacity: [0, 0.8, 0]
                      }}
                      style={{ originX: 0 }}
                      transition={{ 
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Glowing center line */}
                    <motion.path
                      d="M0,30 L100,30"
                      strokeWidth="2"
                      stroke={isDark ? "#14F195" : "#0EA66B"}
                      strokeDasharray="3,3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1,
                        opacity: [0, 1, 0],
                      }}
                      transition={{ 
                        duration: 1.8,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <motion.path
                      d="M0,30 L100,30"
                      strokeWidth="2"
                      stroke={isDark ? "#9945FF" : "#7A35CC"}
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1,
                        opacity: [0, 1, 0],
                      }}
                      transition={{ 
                        delay: 0.3,
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Data packets */}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.rect
                        key={i}
                        x="0" y="26" width="6" height="8"
                        rx="1"
                        fill={i % 2 === 0 ? (isDark ? "#14F195" : "#0EA66B") : (isDark ? "#9945FF" : "#7A35CC")}
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ 
                          x: [0, 100],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                    
                    {/* Binary data flowing */}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.text
                        key={`text-${i}`}
                        x="0"
                        y={i % 3 === 0 ? "20" : (i % 3 === 1 ? "40" : "30")}
                        fontSize="6"
                        fill={i % 2 === 0 ? (isDark ? "#14F195" : "#0EA66B") : (isDark ? "#9945FF" : "#7A35CC")}
                        fontFamily="monospace"
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ 
                          x: [0, 100],
                          opacity: [0, 0.8, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.15,
                          ease: "easeOut"
                        }}
                      >
                        {i % 2 === 0 ? "01" : "10"}
                      </motion.text>
                    ))}
                    
                    {/* Flash effect at target */}
                    <motion.circle
                      cx="100" cy="30" r="10"
                      fill={isDark ? "#14F195" : "#0EA66B"}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 0.7, 0],
                        scale: [0, 1.5, 0]
                      }}
                      transition={{ 
                        delay: 1.2,
                        duration: 0.8
                      }}
                    />
                    
                    <motion.circle
                      cx="100" cy="30" r="15"
                      fill={isDark ? "#9945FF" : "#7A35CC"}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 0.5, 0],
                        scale: [0, 1.8, 0]
                      }}
                      transition={{ 
                        delay: 1.4,
                        duration: 1
                      }}
                    />
                  </svg>
                </div>
                
                {/* Mobile animation */}
                <div className="lg:hidden w-full">
                  <svg width="20" height="100%" viewBox="0 0 20 100" preserveAspectRatio="none">
                    {/* Glowing center line */}
                    <motion.path
                      d="M10,0 L10,100"
                      strokeWidth="2"
                      stroke={isDark ? "#14F195" : "#0EA66B"}
                      strokeDasharray="3,3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1,
                        opacity: [0, 1, 0],
                      }}
                      transition={{ 
                        duration: 1.8,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Data packets */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.rect
                        key={i}
                        x="6" y="0" width="8" height="6"
                        rx="1"
                        fill={i % 2 === 0 ? (isDark ? "#14F195" : "#0EA66B") : (isDark ? "#9945FF" : "#7A35CC")}
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ 
                          y: [0, 100],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.15,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                    
                    {/* Flash effect at target */}
                    <motion.circle
                      cx="10" cy="100" r="8"
                      fill={isDark ? "#14F195" : "#0EA66B"}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 0.7, 0],
                        scale: [0, 1.5, 0]
                      }}
                      transition={{ 
                        delay: 1.2,
                        duration: 0.8
                      }}
                    />
                  </svg>
                </div>
              </motion.div>
            )}
            
            {/* Terminal flash effect on receiving data */}
            {showEnergyFlow && (
              <motion.div 
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.2, 0],
                }}
                transition={{ 
                  delay: 1.5,
                  duration: 0.8
                }}
                style={{
                  background: `radial-gradient(circle at ${window.innerWidth > 1024 ? 'right center' : 'center bottom'}, ${isDark ? 'rgba(20, 241, 149, 0.3)' : 'rgba(14, 166, 107, 0.3)'}, transparent 70%)`,
                }}
              />
            )}
            
            {/* Compilation Terminal - Right Side */}
            <div className="w-full lg:w-1/2" ref={terminalRef}>
              <motion.div
                className="relative h-full"
                style={{
                  perspective: 1000,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl h-full"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)",
                    backgroundColor: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: isDark 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(153, 69, 255, 0.2)' 
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 15px rgba(122, 53, 204, 0.2)',
                  }}
                >
                  {/* Terminal Header */}
                  <div className="bg-gradient-to-r from-hub-secondary to-hub-primary p-1">
                    <div className="bg-black p-4 rounded-t-lg flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-white text-xs md:text-sm ml-4 font-mono">ethereum_vm_terminal</span>
                    </div>
                  </div>
                  
                  {/* EVM Terminal Output */}
                  <div 
                    className="p-6 md:p-8 font-mono text-xs md:text-sm text-black dark:text-white"
                    style={{ 
                      maxHeight: "60vh",
                      height: "60vh",
                      overflowY: "auto",
                      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(30, 30, 40, 0.95)',
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      {terminalOutput.map((line, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.2,
                          }}
                          className={
                            line.includes("Error") ? "text-red-400" : 
                            line.includes(">") ? (isDark ? "text-blue-400" : "text-blue-600") : 
                            line.includes("0x") ? (isDark ? "text-purple-400" : "text-purple-600") :
                            line.includes("=>") ? (isDark ? "text-yellow-300" : "text-yellow-600") :
                            ""
                          }
                        >
                          {line}
                        </motion.div>
                      ))}
                      
                      {isCompiling && (
                        <motion.div
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity 
                          }}
                          className={isDark ? "text-green-400" : "text-green-500"}
                        >
                          _
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  {/* Blockchain Visualization Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      {/* Network nodes */}
                      {nodes.map(node => (
                        <motion.circle
                          key={node.id}
                          cx={`${node.x}%`}
                          cy={`${node.y}%`}
                          r="1.5"
                          fill={node.id % 2 === 0 ? (isDark ? "#14F195" : "#0EA66B") : (isDark ? "#9945FF" : "#7A35CC")}
                          animate={{
                            r: [1.5, 2, 1.5],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      ))}
                    </svg>
                  </div>
                  
                  {/* EVM Execution State - GAS Monitor */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-2 border-t"
                    style={{
                      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(20, 20, 30, 0.9)',
                      borderColor: isDark ? 'rgba(60, 60, 60, 0.5)' : 'rgba(100, 100, 100, 0.5)'
                    }}
                  >
                    <div className="flex justify-between items-center text-xs text-gray-400 font-mono text-black dark:text-white">
                      <div>Gas Used: <span className={isDark ? "text-green-400" : "text-green-600"}>{isCompiling ? 
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {Math.floor(Math.random() * 20000) + 50000}
                        </motion.span> : "134,529"}
                      </span></div>
                      <div>Block: <span className={isDark ? "text-purple-400" : "text-purple-600"}>{isCompiling ? 
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {Math.floor(Math.random() * 1000) + 17000000}
                        </motion.span> : "17284392"}
                      </span></div>
                      <div className="hidden md:block">Network: <span className={isDark ? "text-yellow-400" : "text-yellow-600"}>Ethereum</span></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
"use client";

import {  desktopOnly } from "@/shared/configs/responsive";
import Image from "next/image";
import React from "react";
import { motion, usePresence } from "framer-motion";

const logos = [
  { src: "/images/techs/Typescript.svg", alt: "Typescript", scale: 1.0 },
  { src: "/images/techs/Ethereum.svg", alt: "Ethereum", scale: 1.0 },
  { src: "/images/techs/Besu.svg", alt: "Besu", scale: 1.4 },
  { src: "/images/techs/Next.svg", alt: "Next.js", scale: 1.0 },
  { src: "/images/techs/Solidity.svg", alt: "Solidity", scale: 1.0 },
  { src: "/images/techs/NestJS.svg", alt: "NestJS", scale: 1.0 },
  { src: "/images/techs/Go.svg", alt: "Go", scale: 1.2 },
  { src: "/images/techs/Rust.svg", alt: "Rust", scale: 1.2 },
  { src: "/images/techs/Node.svg", alt: "Node.js", scale: 1.2 },
  { src: "/images/techs/Docker.svg", alt: "Docker", scale: 1.2 },
  { src: "/images/techs/Solana.svg", alt: "Solana", scale: 1.2 },
];

export function TechLogos() {
  const [isPresent] = usePresence();

  return (
    <div 
      className={`w-screen relative mt-16 -mx-[calc((100vw-100%)/2)]`}
    >
      {/* Gradiente esquerdo */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      
      {/* Gradiente direito */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="hidden lg:flex items-center justify-center h-[120px] overflow-hidden">
        <div className="relative flex">
          <motion.div
            className="flex items-center"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{
              animationPlayState: isPresent ? "running" : "paused"
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center"
                style={{ 
                  width: `${80 * logo.scale}px`, 
                  height: `${80 * logo.scale}px`,
                  transform: `scale(${logo.scale})`,
                  marginRight: index < logos.length - 1 ? '48px' : '0'
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="w-auto h-auto object-contain dark:invert opacity-60 hover:opacity-100 transition-all duration-300"
                  style={{ 
                    display: 'block',
                    margin: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto'
                  }}
                />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex items-center absolute left-full"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{
              animationPlayState: isPresent ? "running" : "paused"
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={`${logo.alt}-clone`}
                className="flex items-center justify-center"
                style={{ 
                  width: `${80 * logo.scale}px`, 
                  height: `${80 * logo.scale}px`,
                  transform: `scale(${logo.scale})`,
                  marginRight: index < logos.length - 1 ? '48px' : '0'
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="w-auto h-auto object-contain dark:invert opacity-60 hover:opacity-100 transition-all duration-300"
                  style={{ 
                    display: 'block',
                    margin: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto'
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Versão simplificada para tablet e mobile */}
      <div className="lg:hidden flex items-center justify-center h-[120px] overflow-hidden">
        <div className="relative flex">
          <motion.div
            className="flex items-center"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
            style={{
              animationPlayState: isPresent ? "running" : "paused"
            }}
          >
            {logos.slice(0, 6).map((logo, index) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center"
                style={{ 
                  width: `${60 * logo.scale}px`, 
                  height: `${60 * logo.scale}px`,
                  transform: `scale(${logo.scale})`,
                  marginRight: index < 5 ? '36px' : '0'
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={60}
                  height={60}
                  className="w-auto h-auto object-contain dark:invert opacity-60 hover:opacity-100 transition-all duration-300"
                  style={{ 
                    display: 'block',
                    margin: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto'
                  }}
                />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex items-center absolute left-full"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
            style={{
              animationPlayState: isPresent ? "running" : "paused"
            }}
          >
            {logos.slice(0, 6).map((logo, index) => (
              <div
                key={`${logo.alt}-clone`}
                className="flex items-center justify-center"
                style={{ 
                  width: `${60 * logo.scale}px`, 
                  height: `${60 * logo.scale}px`,
                  transform: `scale(${logo.scale})`,
                  marginRight: index < 5 ? '36px' : '0'
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={60}
                  height={60}
                  className="w-auto h-auto object-contain dark:invert opacity-60 hover:opacity-100 transition-all duration-300"
                  style={{ 
                    display: 'block',
                    margin: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto'
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

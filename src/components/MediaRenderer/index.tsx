"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

interface MediaRendererProps {
  media: MediaItem[];
  className?: string;
  isArchitecture?: boolean;
}

export function MediaRenderer({ media, className = "", isArchitecture = false }: MediaRendererProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedMedia = media[selectedIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse movement tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Spring animations para movimento mais suave
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Hover animation variants
  const hoverVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 30 }
    }
  };

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full space-y-8 perspective-1000 ${className}`}
    >
      {/* Main Display */}
      <motion.div 
        className={`relative w-full ${isArchitecture ? 'aspect-[16/9]' : 'aspect-video'} rounded-2xl overflow-hidden
          bg-gradient-to-br from-gray-100 via-white to-gray-200 
          dark:from-gray-900 dark:via-gray-800 dark:to-gray-950
          shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(255,255,255,0.05)]`}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring
        }}
        initial="idle"
        whileHover="hover"
        variants={hoverVariants}
      >
        {/* Glow Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-hub-primary/20 via-transparent to-hub-secondary/20 opacity-50 mix-blend-overlay"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {selectedMedia.type === "image" ? (
          <Image
            src={selectedMedia.url}
            alt={selectedMedia.alt || "Project media"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        ) : (
          <video
            src={selectedMedia.url}
            poster={selectedMedia.thumbnail}
            controls
            className="w-full h-full object-cover"
            playsInline
          >
            <source src={selectedMedia.url} type="video/mp4" />
            <p className="text-gray-700 dark:text-gray-300">
              Seu navegador não suporta o elemento de vídeo.
            </p>
          </video>
        )}

        {/* Glass Effect Caption */}
        {(selectedMedia.title || selectedMedia.description) && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-white/10 dark:bg-black/10 border-t border-white/20 dark:border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {selectedMedia.title && (
              <h4 className="font-bold text-xl mb-2 text-black dark:text-white">
                {selectedMedia.title}
              </h4>
            )}
            {selectedMedia.description && (
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                {selectedMedia.description}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Thumbnails with Glass Effect */}
      {media.length > 1 && (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {media.map((item, index) => (
            <motion.button
              key={index}
              className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer
                backdrop-blur-lg bg-white/10 dark:bg-black/10 
                border transition-all duration-300
                ${selectedIndex === index 
                  ? "ring-2 ring-hub-primary ring-offset-4 dark:ring-offset-black border-hub-primary" 
                  : "hover:ring-2 hover:ring-hub-secondary hover:ring-offset-2 dark:ring-offset-black border-gray-200/50 dark:border-gray-800/50"
                }`}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={item.type === "video" ? (item.thumbnail || item.url) : item.url}
                alt={item.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40">
                  <motion.svg 
                    className="w-10 h-10 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.2 }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </motion.svg>
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
} 
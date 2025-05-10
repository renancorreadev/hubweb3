"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { RenderContainer } from "@/shared/components/RenderContainer";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import '@/styles/image-zoom.css';

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
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const MediaContent = ({
  media,
  onClose,
}: {
  media: MediaItem;
  onClose?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  if (media.type === "video" && !showVideo) {
    return (
      <div className="relative w-full h-full group cursor-pointer" onClick={() => setShowVideo(true)}>
        <Image
          src={media.thumbnail || media.url}
          alt={media.alt || "Video thumbnail"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
          priority={!onClose}
          quality={100}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-sm font-medium">Play Video</span>
          </div>
        </div>
      </div>
    );
  }

  return media.type === "image" ? (
    <div className="relative w-full h-[600px]">
      <Zoom classDialog="bg-transparent" zoomMargin={40}>
        <Image
          src={media.url}
          alt={media.alt || "Project media"}
          width={1920}
          height={1080}
          className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 ${
            isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"
          }`}
          sizes="100vw"
          priority={!onClose}
          quality={100}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </Zoom>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 animate-pulse"
        />
      )}
    </div>
  ) : (
    <div className="relative w-full h-full group">
      <video
        src={media.url}
        poster={media.thumbnail}
        controls
        className="w-full h-full object-cover"
        playsInline
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        autoPlay
      >
        <source src={media.url} type="video/mp4" />
        <p className="text-gray-700 dark:text-gray-300">
          Seu navegador não suporta o elemento de vídeo.
        </p>
      </video>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 animate-pulse"
        />
      )}
    </div>
  );
};

export function MediaRenderer({
  media,
  className = "",
}: MediaRendererProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedMedia = media[selectedIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking para efeito 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Novo: Efeito de partículas
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; speed: number }>
  >([]);

  useEffect(() => {
    // Gera partículas aleatórias
    const newParticles = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
    }));
    setParticles(newParticles);
  }, []);

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
    <RenderContainer>
      <div
        ref={containerRef}
        className={`w-full space-y-8 perspective-1000 ${className}`}
      >
        {/* Main Display */}
        <Suspense
          fallback={
            <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 animate-pulse">
              <Skeleton className="w-full h-full" />
            </div>
          }
        >
          <motion.div
            className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 
            dark:from-gray-900 dark:via-gray-800 dark:to-gray-950
            shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(255,255,255,0.05)]
            group"
            style={{
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Partículas flutuantes */}
            {particles.map((particle, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-1 rounded-full bg-white/20"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: particle.speed * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Glow Effect Animado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-hub-primary/20 via-transparent to-hub-secondary/20 mix-blend-overlay"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <MediaContent media={selectedMedia} />
          </motion.div>
        </Suspense>

        {/* Thumbnails */}
        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: media.length }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-xl overflow-hidden"
                >
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          }
        >
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
                  className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer group
                  backdrop-blur-lg bg-white/10 dark:bg-black/10 
                  border transition-all duration-300
                  ${
                    selectedIndex === index
                      ? "ring-2 ring-hub-primary ring-offset-4 dark:ring-offset-black border-hub-primary"
                      : "hover:ring-2 hover:ring-hub-secondary hover:ring-offset-2 dark:ring-offset-black border-gray-200/50 dark:border-gray-800/50"
                  }`}
                  onClick={() => setSelectedIndex(index)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={
                      item.type === "video"
                        ? item.thumbnail || item.url
                        : item.url
                    }
                    alt={item.alt || `Thumbnail ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                  />

                  {/* Indicador de tipo de mídia */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300"
                    initial={false}
                  >
                    {item.type === "video" && (
                      <motion.div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="text-xs font-medium text-white">
                          Play
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </Suspense>
      </div>
    </RenderContainer>
  );
}

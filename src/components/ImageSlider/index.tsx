"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Heading2 } from "@/components/Typography";

import "./styles.css";

interface SlideImage {
  url: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface ImageSliderProps {
  /** Título da seção do slider (opcional) */
  title?: string;
  /** Array de imagens a serem exibidas no slider */
  images: SlideImage[];
  /** Altura do slider. Pode ser um valor em px, rem, vh, etc. */
  height?: string;
  /** Largura do slider. Pode ser um valor em px, rem, vw, etc. */
  width?: string;
  /** Classes CSS adicionais para o container */
  className?: string;
  /** Border radius do slider principal em pixels */
  borderRadius?: number;
  /** Mostrar navegação (setas) */
  showNavigation?: boolean;
  /** Mostrar paginação (bolinhas) */
  showPagination?: boolean;
  /** Habilitar autoplay */
  autoplay?: boolean;
  /** Delay entre slides no autoplay (ms) */
  autoplayDelay?: number;
  /** Mostrar legenda */
  showCaption?: boolean;
}

export const ImageSlider = ({
  title,
  images,
  height = "600px",
  width = "100%",
  className = "",
  borderRadius = 12,
  showNavigation = true,
  showPagination = true,
  autoplay = true,
  autoplayDelay = 5000,
  showCaption = true,
}: ImageSliderProps) => {
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isHovered, setIsHovered] = useState(false);

  // Validação do borderRadius
  const safeBorderRadius = Math.max(0, borderRadius);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Não definimos altura fixa para mobile - vamos deixar o CSS controlar
  const sliderHeight = isMobile ? "auto" : height;

  return (
    <div className={`w-full mb-4 ${className}`}>
      {title && (
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading2 className="text-gray-800 dark:text-white">
            {title}
          </Heading2>
        </motion.div>
      )}

      <motion.div
        className="overflow-hidden slider-container"
        style={{
          height: sliderHeight,
          width,
          borderRadius: `${safeBorderRadius}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          speed={800}
          slidesPerView={1}
          loop={true}
          autoplay={autoplay ? {
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          } : false}
          navigation={showNavigation ? {
            enabled: true,
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          } : false}
          pagination={showPagination ? {
            enabled: true,
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
            },
          } : false}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className={`w-full h-full relative ${showCaption ? 'with-caption' : ''}`}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="h-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="slide-image-container">
                <div className="relative w-full h-full">
                  {isMobile ? (
                    // Renderização simplificada para mobile
                    <img
                      src={image.url}
                      alt={image.alt || ""}
                      className="mobile-slide-image"
                    />
                  ) : (
                    // Renderização para desktop usando Next/Image
                    <Image
                      src={image.url}
                      alt={image.alt || ""}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      className="object-cover dark:opacity-95 opacity-100"
                    />
                  )}
                </div>
              </div>

              {/* Informações no canto inferior esquerdo com estilo moderno */}
              {showCaption && (image.title || image.description) && (
                <motion.div
                  className="slide-caption-container absolute left-4 bottom-16 md:left-8 md:bottom-20 right-4 md:right-auto md:max-w-md z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="caption-content p-4 md:p-6 rounded-lg backdrop-blur-md bg-opacity-75 bg-black dark:bg-opacity-85"
                    whileHover={{
                      backgroundColor: "rgba(0, 0, 0, 0.85)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {image.title && (
                      <motion.h3
                        className="text-lg md:text-xl font-semibold text-white mb-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {image.title}
                      </motion.h3>
                    )}
                    {image.description && (
                      <motion.p
                        className="text-sm md:text-base text-gray-200"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {image.description}
                      </motion.p>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </SwiperSlide>
          ))}

          {/* Elementos de navegação */}
          {showNavigation && (
            <>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </>
          )}

          {/* Paginação */}
          {showPagination && <div className="swiper-pagination" />}
        </Swiper>
      </motion.div>
    </div>
  );
};

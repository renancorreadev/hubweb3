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
            <SwiperSlide key={index} className="h-full">
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
                      className="object-contain dark:opacity-95 opacity-100"
                    />
                  )}
                </div>
              </div>
              
              {/* Informações opcionais sobre a imagem com estilo moderno */}
              {showCaption && (image.title || image.description) && (
                <div className="slide-caption absolute left-0 right-0">
                  {image.title && (
                    <h3>{image.title}</h3>
                  )}
                  {image.description && (
                    <p>{image.description}</p>
                  )}
                </div>
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
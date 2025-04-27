"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { PaginationOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";
import "./styles.css";
import { RenderContainer } from "@/shared/components/RenderContainer";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface HeroSliderProps {
  projects: Project[];
  /** Altura do slider. Pode ser um valor em px, rem, vh, etc. Exemplo: '400px', '50vh' */
  height?: string;
  /** Largura do slider. Pode ser um valor em px, rem, vw, etc. Exemplo: '100%', '800px' */
  width?: string;
  /** Classes CSS adicionais para o container */
  className?: string;
  /** Opacidade do overlay escuro sobre a imagem (0-100) */
  overlayOpacity?: number;
  /** Opacidade do container de texto com efeito glass (0-100) */
  textContainerOpacity?: number;
  /** Opacidade do texto (0-100) */
  textOpacity?: number;
  /** Intensidade do efeito blur no container de texto (0-20) */
  blurIntensity?: number;
  /** Border radius do slider principal em pixels */
  borderRadius?: number;
  /** Border radius do container de texto em pixels */
  textContainerRadius?: number;
  /** Border radius da imagem em pixels */
  imageRadius?: number;
}

export const HeroSlider = ({
  projects,
  height = "400px",
  width = "100%",
  className = "",
  overlayOpacity = 100,
  textContainerOpacity = 10,
  textOpacity = 100,
  blurIntensity = 12,
  borderRadius = 0,
  textContainerRadius = 16,
  imageRadius = 0,
}: HeroSliderProps) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<any>(null);

  // Validação e normalização das opacidades e raios
  const safeOverlayOpacity = Math.max(0, Math.min(100, overlayOpacity)) / 100;
  const safeTextContainerOpacity =
    Math.max(0, Math.min(100, textContainerOpacity)) / 100;
  const safeTextOpacity = Math.max(0, Math.min(100, textOpacity)) / 100;
  const safeBlurIntensity = Math.max(0, Math.min(20, blurIntensity));
  const safeBorderRadius = Math.max(0, borderRadius);
  const safeTextContainerRadius = Math.max(0, textContainerRadius);
  const safeImageRadius = Math.max(0, imageRadius);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;



  const textContainerStyle = {
    "--tw-backdrop-blur": `blur(${safeBlurIntensity}px)`,
    backgroundColor: `rgba(255, 255, 255, ${safeTextContainerOpacity})`,
    borderRadius: `${safeTextContainerRadius}px`,
  } as React.CSSProperties;

  const overlayStyle = {
    "--overlay-opacity": safeOverlayOpacity,
    borderRadius: `${safeImageRadius}px`,
  } as React.CSSProperties;

  const imageStyle = {
    borderRadius: `${safeImageRadius}px`,
  } as React.CSSProperties;


  return (
    <RenderContainer>
      <div 
        className={className}
        style={{
          height,
          width,
          borderRadius: `${safeBorderRadius}px`,
        }}
      >
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          speed={800}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            enabled: true,
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{
            enabled: true,
            el: '.swiper-pagination',
            clickable: true,
          }}
          className="w-full relative overflow-hidden"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="relative w-full h-full overflow-hidden">
                <div
                  className="hero-image absolute inset-0 bg-cover bg-center"
                  style={{
                    ...imageStyle,
                    backgroundImage: `url(${project.imageUrl})`,
                  }}
                >
                  <div
                    className="hero-overlay absolute inset-0"
                    style={overlayStyle}
                  />
                </div>

                <div
                  className={`relative h-full flex flex-col justify-center items-start
                  ${desktopOnly.padding.px16} ${mobileOnly.padding.px4}
                  ${desktopOnly.padding.py8} ${mobileOnly.padding.py4}`}
                >
                  <div
                    className="text-container p-6 md:p-8 max-w-2xl w-full md:w-auto"
                    style={textContainerStyle}
                  >
                    <h1
                      className={`hero-title font-bold mb-4
                    ${desktopOnly.text["3xl"]} ${mobileOnly.text.xl}`}
                      style={{
                        color: `rgba(255, 255, 255, ${safeTextOpacity})`,
                      }}
                    >
                      {project.title}
                    </h1>
                    <p
                      className={`hero-subtitle
                    ${desktopOnly.text.lg} ${mobileOnly.text.sm}`}
                      style={{
                        color: `rgba(255, 255, 255, ${safeTextOpacity * 0.9})`,
                      }}
                    >
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Elementos de navegação */}
          {!isMobile && (
            <div className="navigation-controls">
              <button className="swiper-button-prev" />
              <button className="swiper-button-next" />
            </div>
          )}
          <div className="swiper-pagination" />
        </Swiper>
      </div>
    </RenderContainer>
  );
};

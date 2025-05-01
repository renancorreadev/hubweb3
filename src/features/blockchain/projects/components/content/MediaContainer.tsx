"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { mobileOnly, desktopOnly } from '@/shared/configs/responsive';

interface MediaContainerProps {
  title?: string;
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function ImageContainer({ 
  src, 
  alt, 
  caption, 
  className = "", 
  align = 'center' 
}: MediaContainerProps) {
  const [imageError, setImageError] = useState(false);

  // Handle different types of image sources
  const getImageSrc = () => {
    // If it's a remote URL
    if (src.startsWith('http')) {
      return src;
    }
    // If it's a local path starting with /images
    if (src.startsWith('/images')) {
      return src;
    }
    // If it's a local path without /images prefix
    return `/images/loyahub/${src.startsWith('/') ? src : `/${src}`}`;
  };

  const imageSrc = getImageSrc();

  const getAlignmentClass = () => {
    switch (align) {
      case 'start':
        return 'ml-0';
      case 'end':
        return 'mr-0';
      case 'center':
      default:
        return '';
    }
  };

  return (
    <motion.figure 
      className={`w-full not-prose !m-0  ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative w-full rounded-lg overflow-hidden ${getAlignmentClass()}`}>
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark text-center p-4">
              Image not available
            </p>
          </div>
        ) : (
          <div className="relative w-full flex items-center justify-center bg-transparent">
            <Image
              src={imageSrc}
              alt={alt}
              width={800}
              height={600}
              className="w-full h-auto object-contain my-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              onError={() => {
                console.error(`Failed to load image: ${imageSrc}`);
                setImageError(true);
              }}
            />
          </div>
        )}
      </div>
      {caption && (
        <figcaption className={`text-center text-hub-text-secondary-light dark:text-hub-text-secondary-dark ${mobileOnly.text.lg} ${desktopOnly.text.xl} font-diatype`}>
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

export function VideoContainer({ 
  src, 
  title, 
  caption, 
  className = "", 
  align = 'center' 
}: MediaContainerProps) {
  const getAlignmentClass = () => {
    switch (align) {
      case 'start':
        return 'ml-0';
      case 'end':
        return 'mr-0';
      case 'center':
      default:
        return '';
    }
  };

  return (
    <motion.figure 
      className={`w-full not-prose ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative w-full aspect-video rounded-lg overflow-hidden ${getAlignmentClass()}`}>
        <iframe
          src={src}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {(caption || title) && (
        <figcaption className={`text-center text-hub-text-secondary-light dark:text-hub-text-secondary-dark ${mobileOnly.text.lg} ${desktopOnly.text.xl} font-diatype`}>
          {caption || title}
        </figcaption>
      )}
    </motion.figure>
  );
} 
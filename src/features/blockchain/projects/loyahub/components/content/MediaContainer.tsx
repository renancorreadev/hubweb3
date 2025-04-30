import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { mobileOnly, desktopOnly } from '@/shared/configs/responsive';

interface ImageContainerProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

interface VideoContainerProps {
  src: string;
  title?: string;
  className?: string;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({ 
  src, 
  alt, 
  caption,
  className = '' 
}) => {
  return (
    <motion.figure 
      className={`my-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-hub-border-light dark:border-hub-border-dark">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className={`mt-4 text-center text-hub-text-secondary-light dark:text-hub-text-secondary-dark ${mobileOnly.text.lg} ${desktopOnly.text.xl} font-diatype`}>
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
};

export const VideoContainer: React.FC<VideoContainerProps> = ({ 
  src, 
  title,
  className = '' 
}) => {
  return (
    <motion.figure 
      className={`my-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-hub-border-light dark:border-hub-border-dark">
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {title && (
        <figcaption className={`mt-4 text-center text-hub-text-secondary-light dark:text-hub-text-secondary-dark ${mobileOnly.text.lg} ${desktopOnly.text.xl} font-diatype`}>
          {title}
        </figcaption>
      )}
    </motion.figure>
  );
}; 
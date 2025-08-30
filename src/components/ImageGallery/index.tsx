"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './zoom-styles.css';
import { Heading2 } from '@/components/Typography';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

export interface GalleryItem {
  url: string;
  alt?: string;
  title?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
}

interface ImageGalleryProps {
  title?: string;
  items: GalleryItem[];
  className?: string;
}

export function ImageGallery({ title, items, className = '' }: ImageGalleryProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`relative w-full ${className}`}>
      {title && (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading2 className="text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-hub-primary to-hub-secondary">
            {title}
          </Heading2>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        {items.map((item, index) => {
          // Determinar o tamanho da célula na grade
          const sizeClass = item.size === 'large'
            ? 'col-span-1 row-span-2 sm:col-span-2'
            : item.size === 'medium'
              ? 'col-span-1 sm:col-span-1 lg:col-span-1'
              : 'col-span-1';

          return (
            <motion.div
              key={index}
              className={`${sizeClass} rounded-xl overflow-hidden`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <motion.div
                className="h-full group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                {!isMobile ? (
                  <Zoom
                    zoomMargin={40}
                  >
                    <div className="aspect-[4/3] w-full relative overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.url}
                        alt={item.alt || ""}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
                        priority={index < 6}
                      />
                    </div>
                  </Zoom>
                ) : (
                  <div className="aspect-[4/3] w-full relative overflow-hidden flex items-center justify-center">
                    <Image
                      src={item.url}
                      alt={item.alt || ""}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover w-full h-full transition-all duration-500"
                      priority={index < 6}
                    />
                  </div>
                )}

                {(item.title || item.description) && (
                  <div className="p-4">
                    {item.title && (
                      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-hub-primary/5 to-hub-secondary/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

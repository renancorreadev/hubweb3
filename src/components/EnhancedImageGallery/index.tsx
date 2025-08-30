"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Heading2 } from '@/components/Typography';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

export interface GalleryItem {
    url: string;
    alt?: string;
    title?: string;
    description?: string;
    size?: 'small' | 'medium' | 'large';
}

interface EnhancedImageGalleryProps {
    title?: string;
    items: GalleryItem[];
    className?: string;
}

export function EnhancedImageGallery({ title, items, className = '' }: EnhancedImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [imageZoom, setImageZoom] = useState(1);
    const isMobile = useIsMobile();

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        setImageZoom(1);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
        setImageZoom(1);
    };

    const goToPrevious = () => {
        if (selectedImageIndex !== null) {
            const newIndex = selectedImageIndex === 0 ? items.length - 1 : selectedImageIndex - 1;
            setSelectedImageIndex(newIndex);
            setImageZoom(1);
        }
    };

    const goToNext = () => {
        if (selectedImageIndex !== null) {
            const newIndex = selectedImageIndex === items.length - 1 ? 0 : selectedImageIndex + 1;
            setSelectedImageIndex(newIndex);
            setImageZoom(1);
        }
    };

    const handleZoomIn = () => {
        setImageZoom(prev => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = () => {
        setImageZoom(prev => Math.max(prev - 0.5, 0.5));
    };

    const resetZoom = () => {
        setImageZoom(1);
    };

    // Navegação por teclado
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedImageIndex === null) return;

            switch (event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
                case '+':
                case '=':
                    handleZoomIn();
                    break;
                case '-':
                    handleZoomOut();
                    break;
                case '0':
                    resetZoom();
                    break;
            }
        };

        if (selectedImageIndex !== null) {
            document.addEventListener('keydown', handleKeyDown);
            // Prevenir scroll da página quando modal estiver aberto
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [selectedImageIndex]);

    const selectedImage = selectedImageIndex !== null ? items[selectedImageIndex] : null;

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

            {/* Grid de Imagens */}
            <div className={`grid gap-4 ${isMobile
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }`}>
                {items.map((item, index) => {
                    const isLarge = item.size === 'large';
                    const isMedium = item.size === 'medium';

                    return (
                        <motion.div
                            key={index}
                            className={`relative group cursor-pointer rounded-xl overflow-hidden ${!isMobile && isLarge ? 'md:col-span-2 md:row-span-2' :
                                    !isMobile && isMedium ? 'md:col-span-2' : ''
                                }`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            onClick={() => openModal(index)}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="aspect-square w-full relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <Image
                                    src={item.url}
                                    alt={item.alt || ""}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-all duration-500 group-hover:scale-110"
                                    priority={index < 8}
                                />

                                {/* Overlay com ícone de zoom */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <motion.div
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={false}
                                    >
                                        <ZoomIn className="text-white w-8 h-8 drop-shadow-lg" />
                                    </motion.div>
                                </div>

                                {/* Título da imagem no hover */}
                                {item.title && (
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-white text-sm font-medium truncate">
                                            {item.title}
                                        </h3>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal de Visualização */}
            <AnimatePresence>
                {selectedImageIndex !== null && selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        {/* Controles Superior */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-60">
                            <div className="flex items-center gap-2">
                                <span className="text-white/70 text-sm">
                                    {selectedImageIndex + 1} de {items.length}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Controles de Zoom */}
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomOut();
                                    }}
                                    disabled={imageZoom <= 0.5}
                                    className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ZoomOut size={20} />
                                </motion.button>

                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetZoom();
                                    }}
                                    className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {Math.round(imageZoom * 100)}%
                                </motion.button>

                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomIn();
                                    }}
                                    disabled={imageZoom >= 3}
                                    className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ZoomIn size={20} />
                                </motion.button>

                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeModal();
                                    }}
                                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Navegação Lateral */}
                        {items.length > 1 && (
                            <>
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToPrevious();
                                    }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors z-60"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ChevronLeft size={24} />
                                </motion.button>

                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors z-60"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ChevronRight size={24} />
                                </motion.button>
                            </>
                        )}

                        {/* Container da Imagem */}
                        <div className="relative max-w-full max-h-full p-20 overflow-auto">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative"
                            >
                                <motion.div
                                    animate={{ scale: imageZoom }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="relative"
                                >
                                    <Image
                                        src={selectedImage.url}
                                        alt={selectedImage.alt || ""}
                                        width={1200}
                                        height={800}
                                        className="max-w-none h-auto rounded-lg shadow-2xl"
                                        priority
                                    />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Informações da Imagem */}
                        {(selectedImage.title || selectedImage.description) && (
                            <motion.div
                                className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-4 text-white z-60"
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 100, opacity: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {selectedImage.title && (
                                    <h3 className="text-xl font-semibold mb-2">
                                        {selectedImage.title}
                                    </h3>
                                )}
                                {selectedImage.description && (
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {selectedImage.description}
                                    </p>
                                )}
                            </motion.div>
                        )}

                        {/* Instruções */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-xs text-center z-50">
                            Use as setas ou clique nas laterais para navegar • ESC ou clique fora para fechar
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

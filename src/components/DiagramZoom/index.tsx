"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, X } from 'lucide-react';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

interface DiagramZoomProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    diagramType?: string;
    maxZoom?: number;
}

export function DiagramZoom({
    src,
    alt,
    width,
    height,
    className = '',
    diagramType = '',
    maxZoom = 3
}: DiagramZoomProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const isMobile = useIsMobile();

    // Para diagramas sequence, permitir zoom maior apenas no desktop
    const isSequenceDiagram = diagramType === 'sequence';
    const allowZoom = !isMobile && isSequenceDiagram;

    const handleZoomIn = () => {
        if (zoomLevel < maxZoom) {
            setZoomLevel(prev => Math.min(prev + 0.5, maxZoom));
        }
    };

    const handleZoomOut = () => {
        if (zoomLevel > 1) {
            setZoomLevel(prev => Math.max(prev - 0.5, 1));
        }
    };

    const resetZoom = () => {
        setZoomLevel(1);
    };

    if (!allowZoom) {
        // Comportamento normal para mobile ou não-sequence
        return (
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`w-full h-auto rounded-lg ${className}`}
            />
        );
    }

    return (
        <>
            {/* Imagem normal */}
            <motion.div
                className="relative cursor-zoom-in"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`w-full h-auto rounded-lg ${className}`}
                />
                {isSequenceDiagram && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        Clique para zoom
                    </div>
                )}
            </motion.div>

            {/* Modal de zoom */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Controles de zoom */}
                        <div className="absolute top-4 right-4 flex gap-2 z-60">
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleZoomOut();
                                }}
                                disabled={zoomLevel <= 1}
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
                                {Math.round(zoomLevel * 100)}%
                            </motion.button>

                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleZoomIn();
                                }}
                                disabled={zoomLevel >= maxZoom}
                                className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ZoomIn size={20} />
                            </motion.button>

                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        {/* Imagem com zoom */}
                        <motion.div
                            className="relative max-w-full max-h-full overflow-auto"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                animate={{ scale: zoomLevel }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="relative"
                            >
                                <Image
                                    src={src}
                                    alt={alt}
                                    width={width}
                                    height={height}
                                    className="max-w-none h-auto"
                                    priority
                                />
                            </motion.div>
                        </motion.div>

                        {/* Instruções */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
                            Use os controles acima para zoom • Clique fora para fechar
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

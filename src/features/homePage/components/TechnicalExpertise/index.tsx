"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

interface ExpertiseCategory {
    title: string;
    description: string;
    icon: string;
    skills: string[];
    projects: string[];
    color: string;
}

export function TechnicalExpertise() {
    const { t } = useTranslation();
    const { isDark } = useThemeColors();

    const getArrayFromTranslation = (key: string): string[] => {
        const value = t(key);
        return Array.isArray(value) ? value : [];
    };

    const expertiseCategories: ExpertiseCategory[] = [
        {
            title: t('expertise.categories.enterprise.title'),
            description: t('expertise.categories.enterprise.description'),
            icon: "⚡",
            skills: getArrayFromTranslation('expertise.skills.enterprise'),
            projects: getArrayFromTranslation('expertise.projects.enterprise'),
            color: "from-cyan-400 to-blue-600"
        },
        {
            title: t('expertise.categories.drex.title'),
            description: t('expertise.categories.drex.description'),
            icon: "🔷",
            skills: getArrayFromTranslation('expertise.skills.drex'),
            projects: getArrayFromTranslation('expertise.projects.drex'),
            color: "from-purple-500 to-indigo-600"
        },
        {
            title: t('expertise.categories.defi.title'),
            description: t('expertise.categories.defi.description'),
            icon: "🌊",
            skills: getArrayFromTranslation('expertise.skills.defi'),
            projects: getArrayFromTranslation('expertise.projects.defi'),
            color: "from-emerald-400 to-teal-600"
        },
        {
            title: t('expertise.categories.fullstack.title'),
            description: t('expertise.categories.fullstack.description'),
            icon: "🚀",
            skills: getArrayFromTranslation('expertise.skills.fullstack'),
            projects: getArrayFromTranslation('expertise.projects.fullstack'),
            color: "from-orange-400 to-pink-600"
        }
    ];

    const architecturalExpertise = getArrayFromTranslation('expertise.architectural.skills');
    const securityExpertise = getArrayFromTranslation('expertise.security.tools');

    const getStatsFromTranslation = (): Array<{ number: string, label: string }> => {
        const value = t('expertise.stats');
        return Array.isArray(value) ? value as Array<{ number: string, label: string }> : [];
    };

    const stats = getStatsFromTranslation();

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-transparent via-gray-50/30 to-transparent dark:via-gray-900/30">
            {/* Futuristic Background */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                {/* Animated Gradients */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center justify-center px-6 py-3 mb-8 text-sm font-medium rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 font-semibold">
                            {t('expertise.badge')}
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {t('expertise.title')}
                    </motion.h2>

                    <motion.div
                        className="max-w-4xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <span dangerouslySetInnerHTML={{ __html: t('expertise.description') }} />
                    </motion.div>
                </motion.div>

                {/* Architecture Solutions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {expertiseCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                        >
                            {/* Card Background with Glassmorphism */}
                            <div className="relative overflow-hidden rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-gray-800/50 p-8 h-full">

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                                {/* Glow Effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 -z-10`} />

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex items-center mb-6">
                                        <div className="text-4xl mr-4 p-3 rounded-xl bg-gradient-to-br from-white/20 to-gray-100/20 dark:from-gray-800/20 dark:to-gray-900/20 backdrop-blur-sm">
                                            {category.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                                                {category.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                        {category.description}
                                    </p>

                                    {/* Tech Stack Chips */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold mb-4 text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                                            {t('expertise.skills.header')}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.slice(0, 4).map((skill, skillIndex) => (
                                                <motion.span
                                                    key={skillIndex}
                                                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                            {category.skills.length > 4 && (
                                                <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-700/50 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
                                                    +{category.skills.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Implementation Examples */}
                                    <div>
                                        <h4 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                                            {t('expertise.projects.header')}
                                        </h4>
                                        <div className="space-y-2">
                                            {category.projects.map((project, projectIndex) => (
                                                <div
                                                    key={projectIndex}
                                                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                                                >
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3 opacity-60`} />
                                                    {project}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Architecture Showcase */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-2xl">🏛️</span>
                        </motion.div>
                        <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            {t('expertise.architectural.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
                            {t('expertise.architectural.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {architecturalExpertise.map((principle, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-6 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-gray-800/50 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {principle}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Security Framework */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="text-2xl">🔐</span>
                        </motion.div>
                        <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            {t('expertise.security.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
                            {t('expertise.security.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {securityExpertise.map((tool, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-6 rounded-xl bg-gradient-to-br from-red-500/5 to-orange-500/5 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {tool}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Performance Metrics */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-gray-800/50"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
                                {stat.number}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

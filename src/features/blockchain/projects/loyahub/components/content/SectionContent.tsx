import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { motion } from 'framer-motion';
import { CodeBlock } from './CodeBlock';
import { ApiExample } from './ApiExample';
import { TerminalCommands } from './TerminalCommands';
import { ImageContainer, VideoContainer } from './MediaContainer';
import { mobileOnly, desktopOnly } from '@/shared/configs/responsive';
import { StepByStep } from './StepByStep';

interface SectionContentProps {
  content: MDXRemoteSerializeResult;
  components?: Record<string, React.ComponentType<any>>;
  className?: string;
}

export const SectionContent: React.FC<SectionContentProps> = ({
  content,
  components: customComponents,
  className = '',
}) => {
  const defaultComponents = {
    CodeBlock,
    ApiExample,
    TerminalCommands,
    ImageContainer,
    VideoContainer,
    StepByStep,
    h1: (props: any) => (
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`font-monument text-hub-text-primary-light dark:text-hub-text-primary-dark mt-8 mb-6 ${mobileOnly.text['4xl']} ${desktopOnly.text['5xl']}`}
        {...props}
      />
    ),
    h2: (props: any) => (
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`font-dsemi text-hub-text-primary-light dark:text-hub-text-primary-dark mt-8 mb-4 ${mobileOnly.text['3xl']} ${desktopOnly.text['4xl']}`}
        {...props}
      />
    ),
    h3: (props: any) => (
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={`font-dsemi text-hub-text-primary-light dark:text-hub-text-primary-dark mt-6 mb-3 ${mobileOnly.text['2xl']} ${desktopOnly.text['3xl']}`}
        {...props}
      />
    ),
    p: (props: any) => (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark leading-relaxed mb-4 font-diatype ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}
        {...props}
      />
    ),
    ul: (props: any) => (
      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className={`list-disc list-inside mb-4 space-y-2 text-hub-text-secondary-light dark:text-hub-text-secondary-dark ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}
        {...props}
      />
    ),
    ol: (props: any) => (
      <motion.ol
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className={`list-decimal list-inside mb-4 space-y-2 text-hub-text-secondary-light dark:text-hub-text-secondary-dark ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}
        {...props}
      />
    ),
    li: (props: any) => (
      <motion.li
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark font-diatype ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}
        {...props}
      />
    ),
    a: (props: any) => (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="text-hub-primary-light dark:text-hub-primary-dark hover:text-hub-primary-light/80 dark:hover:text-hub-primary-dark/80 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    blockquote: (props: any) => (
      <motion.blockquote
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-l-4 border-hub-primary-light dark:border-hub-primary-dark pl-4 italic text-hub-text-secondary-light dark:text-hub-text-secondary-dark my-4 ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}
        {...props}
      />
    ),
    hr: () => (
      <motion.hr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="my-8 border-t border-hub-border-light dark:border-hub-border-dark"
      />
    ),
    table: (props: any) => (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto my-6 rounded-lg border border-hub-border-light dark:border-hub-border-dark"
      >
        <table className="min-w-full divide-y divide-hub-border-light dark:divide-hub-border-dark" {...props} />
      </motion.div>
    ),
    th: (props: any) => (
      <th
        className={`px-6 py-3 bg-hub-hover-light dark:bg-hub-hover-dark text-left font-dsemi text-hub-text-secondary-light dark:text-hub-text-secondary-dark uppercase tracking-wider ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}
        {...props}
      />
    ),
    td: (props: any) => (
      <td
        className={`px-6 py-4 whitespace-nowrap text-hub-text-secondary-light dark:text-hub-text-secondary-dark font-diatype ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}
        {...props}
      />
    ),
    ...customComponents,
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`max-w-7xl mx-auto px-6 py-8 prose prose-lg dark:prose-invert prose-hub ${className}`}
    >
      <MDXRemote {...content} components={defaultComponents} />
    </motion.article>
  );
}; 
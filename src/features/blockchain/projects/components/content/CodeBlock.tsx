import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ClipboardIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { mobileOnly, desktopOnly } from '@/shared/configs/responsive';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  title,
  className = '' 
}) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className={`my-8 rounded-xl overflow-hidden border-2 border-hub-border-light dark:border-hub-border-dark shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between bg-hub-hover-light dark:bg-hub-hover-dark px-8 py-5 border-b-2 border-hub-border-light dark:border-hub-border-dark">
        <div className="flex items-center space-x-6">
          {title && (
            <span className={`text-hub-text-primary-light dark:text-hub-text-primary-dark ${mobileOnly.text.xl} ${desktopOnly.text['2xl']} font-dsemi`}>
              {title}
            </span>
          )}
          <span className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark ${mobileOnly.text.lg} ${desktopOnly.text.xl} font-diatype uppercase tracking-wide`}>
            {language}
          </span>
        </div>
        <motion.button
          onClick={handleCopy}
          className="p-3 rounded-lg bg-hub-background-light/50 dark:bg-hub-background/50 hover:bg-hub-background-light dark:hover:bg-hub-background transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <ClipboardDocumentCheckIcon className="h-7 w-7 text-hub-primary-light dark:text-hub-primary-dark" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <ClipboardIcon className="h-7 w-7 text-hub-text-secondary-light dark:text-hub-text-secondary-dark hover:text-hub-text-primary-light dark:hover:text-hub-text-primary-dark transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <div className={`relative ${mobileOnly.text.lg} ${desktopOnly.text.xl}`}>
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.125rem',
            lineHeight: '1.75',
          }}
          codeTagProps={{
            className: 'font-mono',
            style: {
              fontSize: 'inherit',
              lineHeight: 'inherit',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
}; 
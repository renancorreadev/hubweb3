import React, { useState } from 'react';
import { ClipboardIcon, ClipboardDocumentCheckIcon, CommandLineIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { mobileOnly, desktopOnly } from '@/shared/configs/responsive';

interface Command {
  command: string;
  description?: string;
  windowsNote?: boolean;
}

interface TerminalCommandsProps {
  commands: Command[];
  className?: string;
}

export const TerminalCommands: React.FC<TerminalCommandsProps> = ({
  commands,
  className = '',
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCopy = async (command: string, index: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    await navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div 
      className={`my-8 bg-[#14151A] rounded-2xl overflow-hidden shadow-2xl border border-[#2D2D2D] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-5 py-4 border-b border-[#2D2D2D] flex items-center space-x-3 bg-[#1C1D22]">
        <CommandLineIcon className="h-5 w-5 text-[#9D9DA3]" />
        <span className="text-[#E6E6E9] font-mono tracking-wide">Terminal</span>
      </div>

      <div className="p-5 space-y-3">
        {commands.map((cmd, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative"
          >
            <motion.div
              className={`rounded-xl transition-colors duration-200 ${hoveredIndex === index ? 'bg-[#1C1D22]' : 'bg-[#16171C]'}`}
              animate={{
                scale: hoveredIndex === index ? 1.01 : 1,
                boxShadow: hoveredIndex === index ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 0 0 rgba(0, 0, 0, 0)'
              }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="p-4 flex items-center justify-between group cursor-pointer select-none"
                onClick={() => handleCopy(cmd.command, index)}
                role="button"
                tabIndex={0}
                aria-label={`Copy command: ${cmd.command}`}
              >
                <div className="flex items-center space-x-4 font-mono overflow-x-auto scrollbar-thin scrollbar-thumb-[#2D2D2D] scrollbar-track-transparent">
                  <motion.span 
                    className="text-[#9D9DA3] flex-shrink-0 select-none"
                    animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                  >
                    $
                  </motion.span>
                  <span className="text-[#E6E6E9] whitespace-pre text-[15px] leading-relaxed">
                    {cmd.command}
                  </span>
                </div>
                <motion.button
                  onClick={(e) => handleCopy(cmd.command, index, e)}
                  className={`p-2 rounded-lg hover:bg-[#2D2D2D] transition-all duration-200 flex-shrink-0 ml-4 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={copiedIndex === index ? 'Copied!' : 'Copy to clipboard'}
                >
                  <AnimatePresence mode="wait">
                    {copiedIndex === index ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ClipboardDocumentCheckIcon className="h-5 w-5 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ClipboardIcon className="h-5 w-5 text-[#9D9DA3] hover:text-[#E6E6E9] transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {cmd.windowsNote && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="px-4 py-3 bg-[#1C1D22] flex items-start space-x-3 border-t border-[#2D2D2D] rounded-b-xl"
                >
                  <ExclamationTriangleIcon className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[#E6E6E9] text-[14px] leading-relaxed">
                    Windows users: you must first install WSL (see <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">Install Dependencies</a>). Then run the preceding command in the Ubuntu (Linux) terminal.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 
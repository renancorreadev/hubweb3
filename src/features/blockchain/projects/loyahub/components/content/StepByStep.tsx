import React from 'react';
import { motion } from 'framer-motion';
import { mobileOnly, desktopOnly } from '@/shared/configs/responsive';

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepByStepProps {
  steps: Step[];
}

export const StepByStep: React.FC<StepByStepProps> = ({ steps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Desktop & Mobile Timeline */}
      <ol className="relative border-l-2 border-hub-border-light dark:border-hub-border-dark space-y-10 ml-6">
        {steps.map((step, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="group bg-white dark:bg-hub-background rounded-2xl shadow-md border border-hub-border-light dark:border-hub-border-dark px-8 py-7 relative"
          >
            {/* Timeline dot/number */}
            <span className="absolute -left-8 top-7 flex items-center justify-center w-12 h-12 rounded-full border-2 border-hub-primary-light dark:border-hub-primary-dark bg-white dark:bg-hub-background text-hub-primary-light dark:text-hub-primary-dark font-bold text-2xl shadow-md">
              {idx + 1}
            </span>
            <div className="flex flex-col gap-2">
              <span className="font-dsemi text-2xl xl:text-3xl text-hub-primary-light dark:text-hub-primary-dark text-left">
                {step.title}
              </span>
              <div className="text-hub-text-secondary-light dark:text-hub-text-secondary-dark font-diatype text-xl xl:text-2xl leading-relaxed mt-2">
                {step.content}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}; 
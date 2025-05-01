import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as HIconsOutline from '@heroicons/react/24/outline';
import * as HIconsSolid from '@heroicons/react/24/solid'; // Importar solid também se quiser ícones preenchidos
import { desktopOnly, mobileOnly } from '@/shared/configs/responsive';

// Tipagem para um item de feature
interface FeatureItem {
  icon: keyof typeof HIconsOutline | keyof typeof HIconsSolid; // Aceita nomes de ícones outline ou solid
  name: string;
  description: string;
  href?: string; // Link opcional
}

// Props do componente
interface FeatureHighlightProps {
  title?: string;
  hasTitle?: boolean;
  features: FeatureItem[];
  className?: string;
}

// Mapeamento de nomes de ícones para componentes (combinando outline e solid)
const ALL_ICONS = { ...HIconsOutline, ...HIconsSolid }; 

type HeroIcon = React.ComponentType<React.ComponentProps<"svg">>;

export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  title,
  hasTitle = true,
  features,
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`my-12 ${className}`}> {/* Adiciona margem vertical */} 
      {hasTitle && title && (
        <h2 className={`font-dsemi text-hub-text-primary-light dark:text-hub-text-primary-dark mb-8 text-start ${mobileOnly.text['3xl']} ${desktopOnly.text['4xl']}`}>
          {title}
        </h2>
      )}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => {
          const IconComponent = ALL_ICONS[feature.icon] as HeroIcon | undefined;
          const cardContent = (
            <motion.div 
              className="h-full flex flex-col items-center text-center p-6 bg-white dark:bg-hub-800 border border-hub-border-light dark:border-hub-border-dark rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              {IconComponent && (
                <div className="mb-4 p-3 bg-hub-primary-light/10 dark:bg-hub-primary-dark/20 rounded-full">
                  <IconComponent className="h-8 w-8 text-hub-primary-light dark:text-hub-primary-dark" />
                </div>
              )}
              <h3 className="font-dsemi text-xl text-hub-text-primary-light dark:text-hub-text-primary-dark mb-2">
                {feature.name}
              </h3>
              <p className={`text-hub-text-secondary-light dark:text-hub-text-secondary-dark font-diatype text-base leading-relaxed flex-grow`}>
                {feature.description}
              </p>
            </motion.div>
          );

          return feature.href ? (
            <Link href={feature.href} key={index} className="block">
              {cardContent}
            </Link>
          ) : (
            <div key={index}>
              {cardContent}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}; 
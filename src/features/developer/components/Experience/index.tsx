"use client";

import { Typography } from "@/components/Typography";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { motion } from "framer-motion";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

interface ExperienceItemProps {
  title: string;
  period: string;
  description: string;
  index: number;
}

const ExperienceItem = ({ title, period, description, index }: ExperienceItemProps) => {
  const { isDark, getColor } = useThemeColors();

  return (
    <motion.div
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline line */}
      <div 
        className="absolute top-0 left-0 w-px h-full" 
        style={{ backgroundColor: isDark ? 'rgba(153, 69, 255, 0.5)' : 'rgba(122, 53, 204, 0.3)' }}
      />
      
      {/* Timeline node */}
      <div 
        className="absolute top-1 left-0 w-4 h-4 rounded-full -ml-2"
        style={{ backgroundColor: isDark ? getColor('secondary') : getColor('secondary') }}
      />
      
      {/* Content */}
      <div 
        className="rounded-xl p-6"
        style={{
          backgroundColor: isDark ? 'rgba(26, 26, 26, 0.4)' : 'rgba(245, 245, 245, 0.8)',
          boxShadow: isDark 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" className="mb-2">
          {title}
        </Typography>
        
        <Typography variant="small" className="mb-4 opacity-70">
          {period}
        </Typography>
        
        <Typography variant="body">
          {description}
        </Typography>
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();

  const experiences = [
    {
      title: t('developer.experience.opea.title'),
      period: t('developer.experience.opea.period'),
      description: t('developer.experience.opea.description'),
    },
    {
      title: t('developer.experience.gft.title'),
      period: t('developer.experience.gft.period'),
      description: t('developer.experience.gft.description'),
    },
    {
      title: t('developer.experience.avanade.title'),
      period: t('developer.experience.avanade.period'),
      description: t('developer.experience.avanade.description'),
    },
  ];

  // Certificações como um array fixo (já que t() retorna uma string)
  const certifications = [
    "Full Cycle 3 (2023)",
    "NodeJS React - Rocketseat (2022)",
    "Hyperledger Besu (2025)"
  ];

  return (
    <section
      className="py-24"
      style={{
        backgroundColor: isDark ? 'rgba(12, 12, 12, 0.9)' : 'rgba(250, 250, 250, 0.9)',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Typography 
            variant="h2" 
            className="mb-6"
          >
            {t('developer.experience.title')}
          </Typography>
        </motion.div>
        
        <div className={`flex ${mobileOnly.flex.col} ${desktopOnly.flex.row} gap-10`}>
          <div className={`${desktopOnly.width.half} ${mobileOnly.width.full}`}>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <ExperienceItem
                  key={index}
                  title={exp.title}
                  period={exp.period}
                  description={exp.description}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div className={`${desktopOnly.width.half} ${mobileOnly.width.full}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-opacity-10 dark:border-opacity-20 h-full"
              style={{ 
                borderColor: isDark ? getColor('border') : '#E5E5E5',
                background: `linear-gradient(135deg, ${isDark ? 'rgba(20, 20, 20, 0.8)' : 'rgba(250, 250, 250, 0.9)'}, ${isDark ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 255, 255, 0.8)'})`,
              }}
            >
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <Typography variant="h3" className="mb-6">
                    {t('developer.certifications.title')}
                  </Typography>
                  
                  <ul className={`list-disc ${mobileOnly.padding.px4} ${desktopOnly.padding.px6} my-6`}>
                    {certifications.map((cert, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + (idx * 0.1) }}
                        className="mb-4"
                      >
                        <Typography variant="body">{cert}</Typography>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
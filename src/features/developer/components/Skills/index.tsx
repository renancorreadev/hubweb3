"use client";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { Typography } from "@/components/Typography";
import { motion } from "framer-motion";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

interface SkillCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  index: number;
}

const SkillCard = ({ title, content, icon, index }: SkillCardProps) => {
  const { isDark, getColor } = useThemeColors();
  
  return (
    <motion.div
      className="rounded-xl p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{
        backgroundColor: isDark ? 'rgba(26, 26, 26, 0.6)' : 'rgba(245, 245, 245, 0.8)',
        borderLeft: `4px solid ${isDark ? getColor('primary') : getColor('primary')}`,
        boxShadow: isDark 
          ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="p-3 rounded-lg"
          style={{ 
            backgroundColor: isDark ? 'rgba(20, 241, 149, 0.1)' : 'rgba(14, 166, 107, 0.1)',
            color: isDark ? getColor('primary') : getColor('primary')
          }}
        >
          {icon}
        </div>
        
        <div>
          <Typography 
            variant="h4" 
            className="mb-2"
          >
            {title}
          </Typography>
          
          <Typography variant="body">
            {content}
          </Typography>
        </div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();

  const skillsData = [
    {
      title: t('developer.skills.blockchain.title'),
      content: t('developer.skills.blockchain.content'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
        </svg>
      ),
    },
    {
      title: t('developer.skills.languages.title'),
      content: t('developer.skills.languages.content'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z"/>
        </svg>
      ),
    },
    {
      title: t('developer.skills.devops.title'),
      content: t('developer.skills.devops.content'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6h-1A1.5 1.5 0 0 1 6 4.5v-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm2.5 3.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.5 5.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0-4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 8a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
        </svg>
      ),
    },
    {
      title: t('developer.skills.security.title'),
      content: t('developer.skills.security.content'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
      ),
    },
    {
      title: t('developer.skills.frontend.title'),
      content: t('developer.skills.frontend.content'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
        </svg>
      ),
    },
    {
      title: t('developer.skills.backend.title'),
      content: t('developer.skills.backend.content'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
          <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <section 
      className="py-20"
      style={{
        backgroundColor: isDark ? 'rgba(10, 10, 10, 1)' : 'rgba(248, 249, 250, 1)',
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
            {t('developer.skills.title')}
          </Typography>
        </motion.div>

        <div className={`grid ${mobileOnly.grid.cols1} ${desktopOnly.grid.cols3} ${mobileOnly.gap.gap6} ${desktopOnly.gap.gap8}`}>
          {skillsData.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              content={skill.content}
              icon={skill.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 
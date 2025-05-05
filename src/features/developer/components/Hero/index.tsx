"use client";

import { Typography } from "@/components/Typography";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { mobileOnly, desktopOnly } from "@/shared/configs/responsive";

export const Hero = () => {
  const { t } = useTranslation();
  const { isDark, getColor } = useThemeColors();

  return (
    <section 
      className="relative py-24 overflow-hidden"
      style={{
        backgroundColor: isDark ? getColor('background') : '#ffffff',
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Circle */}
        <div 
          className="absolute -right-40 -top-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${isDark ? '#14F195' : '#0EA66B'} 0%, transparent 70%)` 
          }} 
        />
        
        {/* Code Patterns */}
        <div className="absolute top-20 left-10 opacity-5">
          <pre className="text-sm font-mono">
            {`contract Token {
  mapping(address => uint256) balances;
  
  function transfer(address to, uint256 amount) public {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }
}`}
          </pre>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className={`flex ${mobileOnly.flex.col} ${desktopOnly.flex.row} items-center`}>
          {/* Text Content */}
          <div className={`${desktopOnly.width.half} ${mobileOnly.width.full} mb-12 md:mb-0`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h1" 
                className="mb-6"
              >
                {t("developer.hero.title")}
              </Typography>
              
              <Typography 
                variant="subtitle" 
                className="mb-8 max-w-2xl"
              >
                {t("developer.hero.subtitle")}
              </Typography>
              
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" variant="primary">
                  {t("developer.cta.contact")}
                </Button>
                <Button href="/projects" variant="secondary">
                  {t("developer.cta.projects")}
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Visual Element */}
          <div className={`${desktopOnly.width.half} ${mobileOnly.width.full}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-4"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-opacity-10 dark:border-opacity-20"
                style={{ 
                  borderColor: isDark ? getColor('border') : '#E5E5E5',
                  background: isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="p-1 bg-gradient-to-r from-hub-primary to-hub-secondary">
                  <div className="bg-black p-4 rounded-t-lg flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-white text-sm ml-4 font-mono">blockchain_developer.sol</span>
                  </div>
                </div>
                
                <div className="p-8 font-mono text-sm">
                  <pre className={isDark ? "text-white" : "text-gray-800"}>
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DeveloperProfile {
    string public name = "Renan Correa";
    string public role = "Senior Blockchain Engineer";
    uint256 public experience = 7; // years
    
    string[] public skills = [
        "Ethereum", "Solana", "Hyperledger",
        "Smart Contracts", "DeFi", "Tokenization"
    ];
    
    function getExpertise() public pure returns (string memory) {
        return "Asset Tokenization & DLT Solutions";
    }
}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
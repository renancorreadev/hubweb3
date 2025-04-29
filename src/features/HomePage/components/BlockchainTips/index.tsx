"use client";

import { Card } from "@/components/Card";
import Link from "next/link";
import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";
import { Container } from "@/components/Container";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

export const BlockchainTips = () => {
  const { t } = useTranslation();
  const { isDark, getColor, getTextColor } = useThemeColors();

  return (
    <section 
      className="py-24" 
      style={{
        backgroundColor: isDark ? getColor('background') : '#ffffff'
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12 ">
        <div
          className={`flex justify-between items-center ${mobileOnly.flexDirection.col} ${mobileOnly.gap.gap6}`}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: isDark ? '#ffffff' : '#1A1A1A'
            }}
          >
            {t('blockchain.title')}
          </h2>

          <Link
            href="/case-studies"
            className={`inline-flex items-center gap-2 px-6 py-3
              rounded-full border transition-all duration-300
              ${mobileOnly.margin.mt2}`}
            style={{
              borderColor: isDark ? getColor('border') : '#E5E5E5',
              color: isDark ? '#ffffff' : '#1A1A1A',
            }}
          >
            {t('blockchain.caseStudies')}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Container para o Card principal - ocupa 100% em todos tamanhos de tela */}
      <Container>
        <div className="col-span-12">
          <Card
            backgroundImage="/images/solids/neonSolid.png"
            tag={t('blockchain.tag')}
            title={t('blockchain.solana.title')}
            description={t('blockchain.solana.description')}
            href="/tech/solana"
            neonEffect={true}
            neonColors={{ from: "#9333EA", to: "#14F195" }}
            className="mb-8 px-6"
            topBorder={"purple"}
          />
        </div>
      </Container>

      <Container>
        <div
          className={`${mobileOnly.colSpan.cols12} ${desktopOnly.colSpan.cols4}`}
        >
          <Card
            backgroundImage="/images/solids/geometric.png"
            tag={t('blockchain.tag')}
            className="p-2"
            title={t('blockchain.solana.title')}
            description={t('blockchain.solana.description')}
            href="/tech/solana"
            gradientColor="green"
            topBorder={false}
          />
        </div>
        <div
          className={`${mobileOnly.colSpan.cols12} ${desktopOnly.colSpan.cols4}`}
        >
          <Card
            backgroundImage="/images/solids/geometric.png"
            tag={t('blockchain.tag')}
            className="p-2"
            title={t('blockchain.solana.title')}
            description={t('blockchain.solana.description')}
            href="/tech/solana"
            gradientColor="green"
            topBorder={false}
          />
        </div>
        <div
          className={`${mobileOnly.colSpan.cols12} ${desktopOnly.colSpan.cols4}`}
        >
          <Card
            backgroundImage="/images/solids/geometric.png"
            tag={t('blockchain.tag')}
            className="p-2"
            title={t('blockchain.solana.title')}
            description={t('blockchain.solana.description')}
            href="/tech/solana"
            gradientColor="green"
            topBorder={false}
          />
        </div>
      </Container>
    </section>
  );
};

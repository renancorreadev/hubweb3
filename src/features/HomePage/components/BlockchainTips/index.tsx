"use client";

import { Card } from "@/components/Card";
import Link from "next/link";
import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";
import { Container } from "@/components/Container";

export const BlockchainTips = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12 ">
        <div
          className={`flex justify-between items-center ${mobileOnly.flexDirection.col} ${mobileOnly.gap.gap6}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Blockchain Tips
          </h2>

          <Link
            href="/case-studies"
            className={`inline-flex items-center gap-2 px-6 py-3
              rounded-full border border-white/20 text-white
              transition-all duration-300
              hover:bg-white hover:text-black
              ${mobileOnly.margin.mt2}
              `}
          >
            GO TO CASE STUDIES
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
            tag="BLOCKCHAIN"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
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
            tag="BLOCKCHAIN"
            className="p-2"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
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
            tag="BLOCKCHAIN"
            className="p-2"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
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
            tag="BLOCKCHAIN"
            className="p-2"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
            href="/tech/solana"
            gradientColor="green"
            topBorder={false}
          />
        </div>
      </Container>
    </section>
  );
};

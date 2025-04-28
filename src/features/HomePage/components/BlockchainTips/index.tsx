"use client";

import { Container } from "@/components/Container";
import { ContainerSpace } from "@/components/Container/ContainerSpace";
import { Card } from "@/components/Card";
import Link from "next/link";
import { mobileOnly } from "@/styles/responsive-classes";

export const BlockchainTips = () => {
  return (
    <section className="py-24 bg-black">
      {/* Cabeçalho com título e botão - abordagem simples */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12 ">
        <div className={`flex justify-between items-center ${mobileOnly.flexDirection.col} ${mobileOnly.gap.gap6}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Blockchain Tips
          </h2>
          
          <Link
            href="/case-studies"
            className={
              `inline-flex items-center gap-2 px-6 py-3
              rounded-full border border-white/20 text-white
              transition-all duration-300
              hover:bg-white hover:text-black
              ${mobileOnly.margin.mt2}
              `
            }
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
      <Container columns={12}>
        <ContainerSpace cols={12}>
          <Card
            backgroundImage="/images/solids/neonSolid.png"
            tag="BLOCKCHAIN"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
            href="/tech/solana"
            neonEffect={true}
            neonColors={{ from: "#9333EA", to: "#14F195" }}
            className="mb-8 px-6"
          />
        </ContainerSpace>
      </Container>

      {/* Container para os 3 cards - responsivo com 1 coluna em mobile e 3 colunas em desktop */}
      <Container columns={3} className="mt-12" responsiveGrid={true}>
        <ContainerSpace cols={1}>
          <Card
            backgroundImage="/images/solids/neonSolid.png"
            tag="BLOCKCHAIN"
            className="p-2"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
            href="/tech/solana"
          />
        </ContainerSpace>
        <ContainerSpace cols={1}>
          <Card
            backgroundImage="/images/solids/neonSolid.png"
            tag="BLOCKCHAIN"
            className="p-2"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
            href="/tech/solana"
          />
        </ContainerSpace>
        <ContainerSpace cols={1}>
          <Card
            backgroundImage="/images/solids/neonSolid.png"
            tag="BLOCKCHAIN"
            className="p-2"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
            href="/tech/solana"
          />
        </ContainerSpace>
      </Container>

      <Container columns={2} className="mt-12" responsiveGrid={true}>
        <ContainerSpace cols={1}>
          <Card
            backgroundImage="/images/solids/neonSolid.png"
            tag="BLOCKCHAIN"
            className="p-2"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
            href="/tech/solana"
          />
        </ContainerSpace>
        <ContainerSpace cols={1}>
          <Card
            backgroundImage="/images/solids/neonSolid.png"
            tag="BLOCKCHAIN"
            className="p-2"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
            href="/tech/solana"
          />
        </ContainerSpace>

      </Container>
    </section>
  );
};

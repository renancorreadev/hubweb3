"use client";

import { Container } from "../Container";
import { ContainerSpace } from "../Container/ContainerSpace";
import { Card } from "../Card";

export const NeonCardExample = () => {
  return (
    <section className="py-20 bg-black">
      <Container>
        <ContainerSpace cols={12} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cards com Efeito Neon
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            Exemplos de cards com efeito neon de borda iluminada em diferentes estilos.
          </p>
        </ContainerSpace>
      </Container>

      <Container>
        {/* Linha de cards */}
        <ContainerSpace cols={4} className="h-[400px] mb-8">
          {/* Card React (Verde para Roxo) usando as cores do hub */}
          <Card
            tag="REACT"
            title="React.js"
            description="Biblioteca JavaScript para criar interfaces de usuário com componentes reutilizáveis."
            href="/tech/react"
            neonEffect={true}
            neonColors={{ from: "#14F195", to: "#9945FF" }} 
          />
        </ContainerSpace>

        <ContainerSpace cols={4} className="h-[400px] mb-8">
          {/* Card Solana (Verde para Azul) */}
          <Card
            tag="BLOCKCHAIN"
            title="Solana"
            description="Blockchain de alta performance com transações rápidas e baixas taxas."
            href="/tech/solana"
            gradientColor="green"
            neonEffect={true}
            neonColors={{ from: "#14F195", to: "#00C2FF" }}
          />
        </ContainerSpace>

        <ContainerSpace cols={4} className="h-[400px] mb-8">
          {/* Card Fire (Laranja para Vermelho) */}
          <Card
            tag="WEB3"
            title="NFT Collection"
            description="Coleções de tokens não fungíveis com propriedade digital verificável na blockchain."
            href="/tech/nft"
            neonEffect={true}
            neonColors={{ from: "#F59E0B", to: "#EF4444" }}
          />
        </ContainerSpace>

        {/* Card grande na largura total */}
        <ContainerSpace cols={12} className="h-[300px]">
          {/* Card grande com efeito de neon */}
          <Card
            tag="DESENVOLVIMENTO"
            title="Web 3.0 & Blockchain"
            description="Construa aplicações descentralizadas com as mais modernas tecnologias da web3."
            href="/services/web3"
            backgroundImage="/images/web3-bg.jpg"
            neonEffect={true}
            neonColors={{ from: "#14F195", to: "#9945FF" }}
          />
        </ContainerSpace>
      </Container>
    </section>
  );
}; 
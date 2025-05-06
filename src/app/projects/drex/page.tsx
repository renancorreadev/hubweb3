"use client";

import { ProjectLayout } from "@/components/ProjectLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Heading2, Body } from "@/components/Typography";
import { motion } from "framer-motion";

export default function DrexProject() {
  const { t } = useTranslation();

  const techStack = [
    "Hyperledger Besu",
    "Solidity", 
    "Java", 
    "Spring Boot",
    "Docker",
    "Kubernetes",
    "React",
    "Next.js",
    "PostgreSQL"
  ];

  return (
    <ProjectLayout
      title={t("projects.drex.title")}
      subtitle={t("projects.drex.subtitle")}
      description={t("projects.drex.description")}
      tags={[t("projects.drex.tag"), "Sandbox", "Central Bank"]}
      techStack={techStack}
      imagePath="/images/projects/drex.jpg"
      githubUrl="https://github.com/hubweb3/drex-sandbox"
      demoUrl="https://drex.hubweb3.com"
      nextProject={{
        name: t("projects.loyahub.title"),
        url: "/projects/loyahub"
      }}
      prevProject={{
        name: t("projects.creatorPro.title"),
        url: "/projects/creator-pro"
      }}
    >
      <div className="space-y-12">
        <section>
          <Heading2>{t("projects.features")}</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                title: "Ambiente de Teste Completo",
                description: "Sandbox que simula o ambiente DREX com todas as funcionalidades previstas pelo Banco Central do Brasil.",
                icon: "🧪"
              },
              {
                title: "Interoperabilidade",
                description: "Simulação de interconexão entre diversas instituições financeiras, sistemas e aplicativos de terceiros.",
                icon: "🔄"
              },
              {
                title: "Smart Contracts Personalizados",
                description: "Biblioteca de contratos inteligentes específicos para testes de casos de uso do DREX, incluindo transações programáveis.",
                icon: "📝"
              },
              {
                title: "Dashboard Analítico",
                description: "Painel visual para monitoramento e análise de transações, contratos e atividades da rede em tempo real.",
                icon: "📊"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "rgba(153, 69, 255, 0.05)",
                  border: "1px solid rgba(153, 69, 255, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <Heading2>{t("projects.architecture")}</Heading2>
          <Body>
            O DREX Sandbox é construído sobre uma rede Hyperledger Besu privada, implementando o modelo de dois níveis proposto pelo Banco Central do Brasil para a CBDC nacional. A plataforma inclui nós validadores que simulam o Banco Central e as instituições participantes, além de uma camada de aplicação que facilita a integração e os testes de casos de uso.
          </Body>
          
          <div className="mt-8 p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Infraestrutura Blockchain</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Rede Hyperledger Besu em IBFT 2.0</li>
                  <li>Orquestração com Kubernetes</li>
                  <li>Sistema de identidade digital</li>
                  <li>Nós validadores distribuídos</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Camada Intermediária</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>API Gateway com Spring Boot</li>
                  <li>Sistema de autenticação federada</li>
                  <li>Serviço de indexação de eventos</li>
                  <li>Cache distribuído para desempenho</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Aplicações</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Dashboard administrativo</li>
                  <li>Wallet simulada para testes</li>
                  <li>Simulador de instituição financeira</li>
                  <li>Ferramentas de análise e relatórios</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading2>Casos de Uso</Heading2>
          <div className="mt-8 space-y-6">
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(20, 241, 149, 0.05)",
                border: "1px solid rgba(20, 241, 149, 0.2)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Transações Programáveis</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Simulação de pagamentos condicionais e automatizados utilizando contratos inteligentes, permitindo transações que executam apenas quando condições específicas são atendidas, como entregas confirmadas ou marcos contratuais atingidos.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(20, 241, 149, 0.05)",
                border: "1px solid rgba(20, 241, 149, 0.2)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Liquidação Interbancária</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Testes de liquidação entre instituições financeiras em tempo real, eliminando a necessidade de câmaras de compensação e reduzindo significativamente o tempo e o custo das transações interbancárias.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(20, 241, 149, 0.05)",
                border: "1px solid rgba(20, 241, 149, 0.2)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Interoperabilidade Internacional</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Simulação de conectividade com outras CBDCs e sistemas de pagamento internacionais, permitindo testes de transações transfronteiriças e protocolos de interoperabilidade entre diferentes moedas digitais.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
} 
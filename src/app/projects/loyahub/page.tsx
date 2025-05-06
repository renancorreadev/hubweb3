"use client";

import { ProjectLayout } from "@/components/ProjectLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Heading2, Body } from "@/components/Typography";
import { motion } from "framer-motion";

export default function LoyaHub() {
  const { t } = useTranslation();

  const techStack = [
    "Solidity",
    "ERC-20",
    "Polygon",
    "React Native",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "AWS"
  ];

  return (
    <ProjectLayout
      title={t("projects.loyahub.title")}
      subtitle={t("projects.loyahub.subtitle")}
      description={t("projects.loyahub.description")}
      tags={[t("projects.loyahub.tag"), "Rewards", "Mobile"]}
      techStack={techStack}
      imagePath="/images/projects/loyahub.jpg"
      githubUrl="https://github.com/hubweb3/loyahub"
      demoUrl="https://loyahub.hubweb3.com"
      nextProject={{
        name: t("projects.rwa.title"),
        url: "/projects/rwa"
      }}
      prevProject={{
        name: t("projects.drex.title"),
        url: "/projects/drex"
      }}
    >
      <div className="space-y-12">
        <section>
          <Heading2>{t("projects.features")}</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                title: "Tokenização de Pontos",
                description: "Conversão de programas de fidelidade tradicionais em tokens blockchain, garantindo transparência e portabilidade.",
                icon: "🔄"
              },
              {
                title: "Interoperabilidade entre Marcas",
                description: "Sistema de coalizão que permite cooperação entre diferentes empresas e transferência de pontos entre programas.",
                icon: "🤝"
              },
              {
                title: "App Mobile para Clientes",
                description: "Aplicativo intuitivo para consumidores rastrearem, acumularem e resgatarem pontos de fidelidade de múltiplas marcas.",
                icon: "📱"
              },
              {
                title: "Dashboard para Empresas",
                description: "Painel administrativo para empresas gerenciarem seus programas, ofertas e analisarem o comportamento dos clientes.",
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
            O LoyaHub utiliza uma arquitetura de várias camadas que combina blockchain para registro imutável e transparente de pontos de fidelidade com sistemas tradicionais para desempenho e usabilidade. Os tokens de fidelidade são implementados como tokens ERC-20 personalizados na rede Polygon, garantindo baixas taxas e alta velocidade de transação.
          </Body>
          
          <div className="mt-8 p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Camada Blockchain</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Contratos para tokens de fidelidade</li>
                  <li>Sistema de conversão entre tokens</li>
                  <li>Regras de governança para coalizões</li>
                  <li>Registros imutáveis de transações</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Camada de API</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Endpoints RESTful e GraphQL</li>
                  <li>Autenticação e autorização</li>
                  <li>Indexação e cache para desempenho</li>
                  <li>Integração com sistemas empresariais</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Aplicações Cliente</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>App mobile React Native</li>
                  <li>Painel administrativo React</li>
                  <li>Widgets para integração em sites</li>
                  <li>SDK para desenvolvedores</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading2>Vantagens para Empresas</Heading2>
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="relative p-6 pt-12 rounded-xl overflow-hidden"
                style={{
                  backgroundColor: "rgba(20, 241, 149, 0.05)",
                  border: "1px solid rgba(20, 241, 149, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-green-500"></div>
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Aumento de Engajamento</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Aumento médio de 45% na retenção de clientes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Incremento de 32% no ticket médio de compras</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Maior frequência de visitas e interações</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                className="relative p-6 pt-12 rounded-xl overflow-hidden"
                style={{
                  backgroundColor: "rgba(20, 241, 149, 0.05)",
                  border: "1px solid rgba(20, 241, 149, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-green-500"></div>
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Redução de Custos</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Diminuição de 60% nos custos operacionais do programa</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Automação de processos antes manuais</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Menor custo de aquisição de clientes via parcerias</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <motion.div
              className="relative p-6 pt-12 rounded-xl overflow-hidden mt-8"
              style={{
                backgroundColor: "rgba(153, 69, 255, 0.05)",
                border: "1px solid rgba(153, 69, 255, 0.2)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-green-500"></div>
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Analytics e Insights</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Dashboard analítico avançado que oferece insights detalhados sobre o comportamento dos clientes, eficácia das recompensas e oportunidades de otimização.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-black dark:text-white">Segmentação de Clientes</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Grupos automáticos baseados em comportamento, valor e engajamento.</p>
                </div>
                
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-black dark:text-white">ROI das Campanhas</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Métricas detalhadas de retorno sobre investimento para cada campanha e oferta.</p>
                </div>
                
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-black dark:text-white">Previsão de Tendências</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Modelos preditivos para antecipar comportamentos e otimizar ofertas.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
} 
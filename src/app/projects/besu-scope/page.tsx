"use client";

import { ProjectLayout } from "@/components/ProjectLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Heading2, Body } from "@/components/Typography";
import { motion } from "framer-motion";

export default function BesuScope() {
  const { t } = useTranslation();

  const techStack = [
    "Hyperledger Besu",
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "GraphQL",
    "PostgreSQL",
    "Docker",
    "Kubernetes"
  ];

  return (
    <ProjectLayout
      title={t("projects.besuScope.title")}
      subtitle={t("projects.besuScope.subtitle")}
      description={t("projects.besuScope.description")}
      tags={[t("projects.besuScope.tag"), "Explorer", "Enterprise"]}
      techStack={techStack}
      imagePath="/images/projects/besu-scope.jpg"
      githubUrl="https://github.com/hubweb3/besu-scope"
      demoUrl="https://besu-scope.hubweb3.com"
      nextProject={{
        name: t("projects.assetTokenization.title"),
        url: "/projects/asset-tokenization"
      }}
      prevProject={{
        name: t("projects.rwa.title"),
        url: "/projects/rwa"
      }}
    >
      <div className="space-y-12">
        <section>
          <Heading2>{t("projects.features")}</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                title: "Visualização Completa da Rede",
                description: "Interface intuitiva para monitoramento de blocos, transações, eventos e contratos inteligentes em redes Hyperledger Besu.",
                icon: "📊"
              },
              {
                title: "Rastreamento de Contratos",
                description: "Ferramentas para verificação, análise e interação com contratos inteligentes implementados na rede.",
                icon: "📝"
              },
              {
                title: "Métricas de Rede",
                description: "Painéis de métricas de desempenho, utilização de recursos, transações por segundo e saúde dos nós validadores.",
                icon: "📈"
              },
              {
                title: "Permissões Corporativas",
                description: "Gerenciamento de permissões e controle de acesso granular, ideal para redes blockchain corporativas.",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "rgba(20, 241, 149, 0.05)",
                  border: "1px solid rgba(20, 241, 149, 0.2)",
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
            O Besu Scope é construído com uma arquitetura distribuída que se conecta diretamente aos nós da rede Hyperledger Besu. O sistema utiliza um indexador personalizado para processar e armazenar dados de blocos, transações e eventos em tempo real, fornecendo uma visualização abrangente e atualizada da rede.
          </Body>
          
          <div className="mt-8 p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Camada de Dados</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Indexador de blocos e eventos</li>
                  <li>Sincronização em tempo real</li>
                  <li>Cache distribuído para desempenho</li>
                  <li>Armazenamento persistente otimizado</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">API e Serviços</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>REST API completa</li>
                  <li>Endpoints GraphQL</li>
                  <li>WebSockets para atualizações em tempo real</li>
                  <li>Serviços de notificação configuráveis</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white/20 dark:bg-black/20">
                <h4 className="font-bold mb-2 text-black dark:text-white">Interface do Usuário</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Dashboard interativo e personalizável</li>
                  <li>Visualizações de gráficos e tabelas</li>
                  <li>Decodificação automática de dados do contrato</li>
                  <li>Integração com ferramentas de monitoramento</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading2>Diferenciais</Heading2>
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "rgba(153, 69, 255, 0.05)",
                  border: "1px solid rgba(153, 69, 255, 0.2)",
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Foco Corporativo</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Desenvolvido especificamente para ambientes empresariais, com suporte à autenticação corporativa, controle de acesso baseado em funções e compatibilidade com políticas de segurança organizacionais.
                </p>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "rgba(153, 69, 255, 0.05)",
                  border: "1px solid rgba(153, 69, 255, 0.2)",
                }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Privacidade e Conformidade</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Suporte completo às características de privacidade do Hyperledger Besu, incluindo transações privadas, grupos de privacidade e compliance com regulamentações como GDPR.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(20, 241, 149, 0.05)",
                border: "1px solid rgba(20, 241, 149, 0.2)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Casos de Uso Empresariais</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-white/10 dark:bg-black/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-black dark:text-white">Rastreabilidade na Cadeia de Suprimentos</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Monitoramento e auditoria de transações em redes de cadeia de suprimentos baseadas em Hyperledger Besu.</p>
                </div>
                
                <div className="p-4 bg-white/10 dark:bg-black/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-black dark:text-white">Conformidade Regulatória Financeira</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Ferramentas para auditoria e conformidade em sistemas financeiros descentralizados corporativos.</p>
                </div>
                
                <div className="p-4 bg-white/10 dark:bg-black/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-black dark:text-white">Tokenização de Ativos Empresariais</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Visualização e gerenciamento de ativos tokenizados em redes privadas corporativas.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
} 
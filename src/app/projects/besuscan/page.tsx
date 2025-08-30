"use client";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { MediaItem } from "@/components/MediaRenderer";

export default function Besuscan() {
    const { t } = useTranslation();

    const techStack = [
        "Go",
        "TypeScript",
        "React",
        "Vite",
        "PostgreSQL",
        "Redis",
        "RabbitMQ",
        "Hyperledger Besu",
        "Docker",
        "Kubernetes",
        "REST API",
        "WebSockets"
    ];

    const mediaItems: MediaItem[] = [
        {
            type: "video",
            url: "/images/projects/besuscan/video.mp4",
            thumbnail: "/images/projects/besuscan/home.png",
            title: "Besuscan Demo",
            description: "Demonstração completa do Block Explorer para Hyperledger Besu"
        }
    ];

    const galleryItems = [
        {
            url: "/images/projects/besuscan/home.png",
            alt: t("projects.besuscan.gallery.dashboard.title"),
            title: t("projects.besuscan.gallery.dashboard.title"),
            description: t("projects.besuscan.gallery.dashboard.description"),
            size: "large" as const
        },
        {
            url: "/images/projects/besuscan/blocks.png",
            alt: t("projects.besuscan.gallery.blocks.title"),
            title: t("projects.besuscan.gallery.blocks.title"),
            description: t("projects.besuscan.gallery.blocks.description"),
            size: "medium" as const
        },
        {
            url: "/images/projects/besuscan/transactions.png",
            alt: t("projects.besuscan.gallery.transactions.title"),
            title: t("projects.besuscan.gallery.transactions.title"),
            description: t("projects.besuscan.gallery.transactions.description"),
            size: "medium" as const
        },
        {
            url: "/images/projects/besuscan/smart-contract.png",
            alt: t("projects.besuscan.gallery.contracts.title"),
            title: t("projects.besuscan.gallery.contracts.title"),
            description: t("projects.besuscan.gallery.contracts.description"),
            size: "medium" as const
        },
        {
            url: "/images/projects/besuscan/accounts.png",
            alt: t("projects.besuscan.gallery.analytics.title"),
            title: t("projects.besuscan.gallery.analytics.title"),
            description: t("projects.besuscan.gallery.analytics.description"),
            size: "large" as const
        },
        {
            url: "/images/projects/besuscan/events.png",
            alt: t("projects.besuscan.gallery.api.title"),
            title: t("projects.besuscan.gallery.api.title"),
            description: t("projects.besuscan.gallery.api.description"),
            size: "medium" as const
        },
        {
            url: "/images/projects/besuscan/validadors.png",
            alt: t("projects.besuscan.gallery.cli.title"),
            title: t("projects.besuscan.gallery.cli.title"),
            description: t("projects.besuscan.gallery.cli.description"),
            size: "small" as const
        }
    ];

    return (
        <ProjectPageTemplate
            title={t("projects.besuscan.title")}
            subtitle={t("projects.besuscan.subtitle")}
            description={t("projects.besuscan.description")}
            tags={[t("projects.besuscan.tag"), "Block Explorer", "Enterprise", "Microservices"]}
            techStack={techStack}
            mediaItems={mediaItems}
            imagePath="/images/projects/besuscan/home.png"
            githubUrl="https://github.com/renancorreadev/besuscan"
            demoUrl="https://besuscan.hubweb3.com"
            nextProject={{
                name: t("projects.assetTokenization.title"),
                url: "/projects/asset-tokenization"
            }}
            prevProject={{
                name: t("projects.creatorPro.title"),
                url: "/projects/creator-pro"
            }}

            // Gallery Section
            hasGallery={true}
            galleryTitle={t("projects.besuscan.gallery.title")}
            galleryItems={galleryItems}
            useSlider={false}

            // Architecture Section
            hasArchitecture={true}
            architectureDetails={{
                title: t("projects.architecture"),
                description: t("projects.besuscan.architecture.description"),
                overview: t("projects.besuscan.architecture.overview"),
                sections: [
                    {
                        title: t("projects.besuscan.architecture.microservices.title"),
                        description: t("projects.besuscan.architecture.microservices.description"),
                        diagrams: [
                            {
                                url: "/images/projects/besuscan/architecture/microservices-architecture.png",
                                alt: "Besuscan Microservices Architecture",
                                diagramType: "architecture",
                                description: "Arquitetura completa de microserviços do Besuscan com camadas bem definidas"
                            }
                        ]
                    },
                    {
                        title: t("projects.besuscan.architecture.dataflow.title"),
                        description: t("projects.besuscan.architecture.dataflow.description"),
                        diagrams: [
                            {
                                url: "/images/projects/besuscan/architecture/data-flow.png",
                                alt: "Besuscan Data Flow Sequence",
                                diagramType: "sequence",
                                description: "Fluxo detalhado de dados entre os serviços com numeração sequencial"
                            }
                        ]
                    },
                    {
                        title: "Arquitetura Enterprise UML",
                        description: "Diagrama UML completo mostrando todas as camadas da arquitetura enterprise do Besuscan",
                        diagrams: [
                            {
                                url: "/images/projects/besuscan/architecture/uml-architecture.png",
                                alt: "Besuscan UML Enterprise Architecture",
                                diagramType: "uml",
                                description: "Arquitetura enterprise completa com camadas de apresentação, negócio e dados"
                            }
                        ]
                    }
                ],
                highlights: [
                    {
                        title: t("projects.besuscan.architecture.highlight.indexer.title"),
                        description: t("projects.besuscan.architecture.highlight.indexer.description"),
                        icon: "🔍"
                    },
                    {
                        title: t("projects.besuscan.architecture.highlight.worker.title"),
                        description: t("projects.besuscan.architecture.highlight.worker.description"),
                        icon: "⚙️"
                    },
                    {
                        title: t("projects.besuscan.architecture.highlight.api.title"),
                        description: t("projects.besuscan.architecture.highlight.api.description"),
                        icon: "🔌"
                    },
                    {
                        title: t("projects.besuscan.architecture.highlight.cli.title"),
                        description: t("projects.besuscan.architecture.highlight.cli.description"),
                        icon: "💻"
                    }
                ]
            }}

            // Features Section
            features={[
                {
                    title: t("projects.besuscan.features.realtime.title"),
                    description: t("projects.besuscan.features.realtime.description"),
                    icon: "⚡",
                    color: "green"
                },
                {
                    title: t("projects.besuscan.features.enterprise.title"),
                    description: t("projects.besuscan.features.enterprise.description"),
                    icon: "🏢",
                    color: "purple"
                },
                {
                    title: t("projects.besuscan.features.microservices.title"),
                    description: t("projects.besuscan.features.microservices.description"),
                    icon: "🔧",
                    color: "green"
                },
                {
                    title: t("projects.besuscan.features.analytics.title"),
                    description: t("projects.besuscan.features.analytics.description"),
                    icon: "📊",
                    color: "purple"
                },
                {
                    title: t("projects.besuscan.features.cli.title"),
                    description: t("projects.besuscan.features.cli.description"),
                    icon: "💻",
                    color: "green"
                },
                {
                    title: t("projects.besuscan.features.scalable.title"),
                    description: t("projects.besuscan.features.scalable.description"),
                    icon: "📈",
                    color: "purple"
                }
            ]}

            processTitle={t("projects.besuscan.process.title")}
            processSteps={[
                {
                    title: t("projects.besuscan.process.listening.title"),
                    description: t("projects.besuscan.process.listening.description"),
                    icon: "👂"
                },
                {
                    title: t("projects.besuscan.process.indexing.title"),
                    description: t("projects.besuscan.process.indexing.description"),
                    icon: "🔍"
                },
                {
                    title: t("projects.besuscan.process.processing.title"),
                    description: t("projects.besuscan.process.processing.description"),
                    icon: "⚙️"
                },
                {
                    title: t("projects.besuscan.process.storing.title"),
                    description: t("projects.besuscan.process.storing.description"),
                    icon: "💾"
                },
                {
                    title: t("projects.besuscan.process.serving.title"),
                    description: t("projects.besuscan.process.serving.description"),
                    icon: "🚀"
                }
            ]}

            benefitsTitle={t("projects.besuscan.benefits.title")}
            benefitGroups={[
                {
                    title: t("projects.besuscan.benefits.enterprises.title"),
                    benefits: (t("projects.besuscan.benefits.enterprises.list") as unknown) as string[],
                    color: "primary"
                },
                {
                    title: t("projects.besuscan.benefits.developers.title"),
                    benefits: (t("projects.besuscan.benefits.developers.list") as unknown) as string[],
                    color: "secondary"
                },
                {
                    title: t("projects.besuscan.benefits.infrastructure.title"),
                    benefits: (t("projects.besuscan.benefits.infrastructure.list") as unknown) as string[],
                    color: "primary"
                }
            ]}
        />
    );
}

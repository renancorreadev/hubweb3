"use client";

import { SubMenu } from "./SubMenu";
import { SubMenuItem } from "./SubMenuItem";
import { Code2, BookOpen, Network } from "lucide-react";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function SubMenuList() {
  const { t } = useTranslation();

  return (
    <nav className="flex flex-col lg:flex-row gap-4 lg:gap-6 font-monument">
      {/* <SubMenu
        label={t("nav-hub-label")}
        icon={<Code2 size={20} className="" />}
        href="/hub"
      >
        <SubMenuItem
          href="/hub/"
          label={t("nav-hub-label")}
          icon={<Code2 size={20} />}
          description={t("nav-hub-description")}
          level={0}
        >
          <SubMenuItem
            href="/hub/overview"
            label={t("nav-hub-overview-label")}
            icon={<Code2 size={16} />}
            description={t("nav-hub-overview-description")}
            level={1}
          />
          <SubMenuItem
            href="/hub/features"
            label={t("nav-hub-features-label")}
            icon={<Code2 size={16} />}
            description={t("nav-hub-features-description")}
            level={1}
          />
        </SubMenuItem>
      </SubMenu> */}

      <SubMenu
        label={t("nav-developer-label")}
        icon={<Code2 size={20} className="" />}
        href="/developer"
      >
        <SubMenuItem
          href="/developer"
          label={t("nav-developer-label")}
          icon={<Code2 size={20} />}
          description={t("nav-developer-description")}
          level={0}
        >
          <SubMenuItem
            href="/developer/docs"
            label={t("nav-developer-docs-label")}
            icon={<Code2 size={16} />}
            description={t("nav-developer-docs-description")}
            level={1}
          />
          <SubMenuItem
            href="/developer/api"
            label={t("nav-developer-api-label")}
            icon={<Code2 size={16} />}
            description={t("nav-developer-api-description")}
            level={1}
          />
        </SubMenuItem>
      </SubMenu>

      <SubMenu
        label={t("nav-blockchain-label")}
        icon={<Network size={20} />}
        href="/blockchain"
      >
        {/* BLOCKCHAIN PROJECTS */}
        <SubMenuItem
          href="/blockchain/projects"
          label={t("nav-blockchain-projects-label")}
          icon={<Network size={20} />}
          description={t("nav-blockchain-projects-description")}
          level={0}
        >
          {/* BLOCKCHAIN RWA HUB */}
          <SubMenuItem
            href="/blockchain/projects/rwa/docs"
            label={t("nav-blockchain-rwa-hub-label")}
            icon={<Network size={16} />}
            description={t("nav-blockchain-rwa-hub-description")}
            level={1}
          />
          {/* BLOCKCHAIN LOYAHUB */}
          <SubMenuItem
            href="/blockchain/projects/loyahub/docs"
            label={t("nav-blockchain-loyahub-label")}
            icon={<Network size={16} />}
            description={t("nav-blockchain-loyahub-description")}
            level={1}
          />
        </SubMenuItem>

        {/* BLOCKCHAIN TIPS */}
        {/* <SubMenuItem
          href="/blockchain/tips"
          label={t("nav-blockchain-tips-label")}
          icon={<Network size={20} />}
          description={t("nav-blockchain-tips-description")}
          level={0}
        >
          <SubMenuItem
            href="/blockchain/tips/basics"
            label={t("nav-blockchain-basics-label")}
            icon={<Network size={16} />}
            description={t("nav-blockchain-basics-description")}
            level={1}
          />
          <SubMenuItem
            href="/blockchain/tips/advanced"
            label={t("nav-blockchain-advanced-label")}
            icon={<Network size={16} />}
            description={t("nav-blockchain-advanced-description")}
            level={1}
          />
        </SubMenuItem> */}

        <SubMenuItem
          href="/projects/drex"
          label={t("nav-blockchain-drex-label")}
          icon={<Network size={20} />}
          description={t("nav-blockchain-drex-description")}
          level={0}
        ></SubMenuItem>
      </SubMenu>
    </nav>
  );
}

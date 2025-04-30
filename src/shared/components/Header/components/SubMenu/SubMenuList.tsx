"use client";

import { SubMenu } from "./SubMenu";
import { SubMenuItem } from "./SubMenuItem";
import { Code2, BookOpen, Network } from "lucide-react";
import { useTranslation } from "@/shared/hooks/useTranslation";

/**
 * 
 * @returns 
 * 
  'nav.home': 'Início',
  'nav.developer': 'Desenvolvedor',
  'nav.tools': 'Ferramentas',
  'nav.tips': 'Dicas',
  'nav.projects': 'Projetos',
 */
export function SubMenuList() {
  const { t } = useTranslation();
  
  return (
    <nav className="flex flex-col lg:flex-row gap-4 lg:gap-6 font-monument">
      <SubMenu label={t('nav-hub-label')} icon={<Code2 size={20} className="" />} href="/">
        <SubMenuItem
          href="/hub"
          label={t('nav-hub-label')}
          icon={<Code2 size={20} />}
          description={t('nav-hub-description')}
          level={0}
        >
          <SubMenuItem
            href="/hub/overview"
            label={t('nav-hub-overview-label')}
            icon={<Code2 size={16} />}
            description={t('nav-hub-overview-description')}
            level={1}
          />
          <SubMenuItem
            href="/hub/features"
            label={t('nav-hub-features-label')}
            icon={<Code2 size={16} />}
            description={t('nav-hub-features-description')}
            level={1}
          />
        </SubMenuItem>
      </SubMenu>

      <SubMenu label={t('nav-developer-label')} icon={<Code2 size={20} className="" />} href="/developer">
        <SubMenuItem
          href="/developer"
          label={t('nav-developer-label')}
          icon={<Code2 size={20} />}
          description={t('nav-developer-description')}
          level={0}
        >
          <SubMenuItem
            href="/developer/docs"
            label={t('nav-developer-docs-label')}
            icon={<Code2 size={16} />}
            description={t('nav-developer-docs-description')}
            level={1}
          />
          <SubMenuItem
            href="/developer/api"
            label={t('nav-developer-api-label')}
            icon={<Code2 size={16} />}
            description={t('nav-developer-api-description')}
            level={1}
          />
        </SubMenuItem>
      </SubMenu>

      <SubMenu label={t('nav-blockchain-label')} icon={<Network size={20} />} href="/drex">
        <SubMenuItem
          href="/blockchain/projects"
          label={t('nav-blockchain-projects-label')}
          icon={<Network size={20} />}
          description={t('nav-blockchain-projects-description')}
          level={0}
        >
          <SubMenuItem
            href="/blockchain/projects/defi"
            label={t('nav-blockchain-defi-label')}
            icon={<Network size={16} />}
            description={t('nav-blockchain-defi-description')}
            level={1}
          />
          <SubMenuItem
            href="/blockchain/projects/nft"
            label={t('nav-blockchain-nft-label')}
            icon={<Network size={16} />}
            description={t('nav-blockchain-nft-description')}
            level={1}
          />
        </SubMenuItem>
        <SubMenuItem
          href="/blockchain/tips"
          label={t('nav-blockchain-tips-label')}
          icon={<Network size={20} />}
          description={t('nav-blockchain-tips-description')}
          level={0}
        >
          <SubMenuItem
            href="/blockchain/tips/basics"
            label={t('nav-blockchain-basics-label')}
            icon={<Network size={16} />}
            description={t('nav-blockchain-basics-description')}
            level={1}
          />
          <SubMenuItem
            href="/blockchain/tips/advanced"
            label={t('nav-blockchain-advanced-label')}
            icon={<Network size={16} />}
            description={t('nav-blockchain-advanced-description')}
            level={1}
          />
        </SubMenuItem>
      </SubMenu>
    </nav>
  );
}

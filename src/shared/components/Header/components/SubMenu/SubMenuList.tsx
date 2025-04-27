"use client";

import Link from "next/link";
import { SubMenu } from "./SubMenu";
import { SubMenuItem } from "./SubMenuItem";
import { Code2, BookOpen, Network } from "lucide-react";
import { useLanguage } from "@/shared/contexts/LanguageContext";

export function SubMenuList() {
  const { t } = useLanguage();
  
  return (
    <nav className="flex flex-col lg:flex-row gap-4 lg:gap-6 font-monument">
      <SubMenu label={t('nav.developers')} icon={<Code2 size={20} className="" />} href="/developers">
        <SubMenuItem
          href="/developers/getting-started"
          label={t('nav.getting-started')}
          icon={<Code2 size={20} />}
          description={t('nav.desc.getting-started')}
        />
        <SubMenuItem
          href="/developers/sdk"
          label="SDK"
          icon={<Code2 size={20} />}
          description={t('nav.desc.sdk')}
        />
        <SubMenuItem
          href="/developers/api"
          label="API"
          icon={<Code2 size={20} />}
          description={t('nav.desc.api')}
        />
      </SubMenu>

      <SubMenu label={t('nav.docs')} icon={<BookOpen size={20} />} href="/docs">
        <SubMenuItem
          href="/docs/overview"
          label={t('nav.overview')}
          icon={<BookOpen size={20} />}
          description={t('nav.desc.overview')}
        />
        <SubMenuItem
          href="/docs/tutorials"
          label={t('nav.tutorials')}
          icon={<BookOpen size={20} />}
          description={t('nav.desc.tutorials')}
        />
        <SubMenuItem
          href="/docs/faq"
          label="FAQ"
          icon={<BookOpen size={20} />}
          description={t('nav.desc.faq')}
        />
      </SubMenu>

      <SubMenu label={t('nav.ecosystem')} icon={<Network size={20} />} href="/ecosystem">
        <SubMenuItem
          href="/ecosystem/projects"
          label={t('nav.projects')}
          icon={<Network size={20} />}
          description={t('nav.desc.projects')}
        />
        <SubMenuItem
          href="/ecosystem/partners"
          label={t('nav.partners')}
          icon={<Network size={20} />}
          description={t('nav.desc.partners')}
        />
        <SubMenuItem
          href="/ecosystem/community"
          label={t('nav.community')}
          icon={<Network size={20} />}
          description={t('nav.desc.community')}
        />
      </SubMenu>
    </nav>
  );
}

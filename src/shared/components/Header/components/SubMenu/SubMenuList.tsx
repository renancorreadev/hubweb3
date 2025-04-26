"use client";

import Link from "next/link";
import { SubMenu } from "./SubMenu";
import { SubMenuItem } from "./SubMenuItem";
import { Code2, BookOpen, Network } from "lucide-react";

export function SubMenuList() {
  return (
    <nav className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-lg font-monument">
      <SubMenu label="Developers" icon={<Code2 size={20} />} href="/developers">
        <SubMenuItem
          href="/developers/getting-started"
          label="Getting Started"
          icon={<Code2 size={20} />}
          description="Start building with HubWeb3"
        />
        <SubMenuItem
          href="/developers/sdk"
          label="SDK"
          icon={<Code2 size={20} />}
          description="Our powerful SDK for developers"
        />
        <SubMenuItem
          href="/developers/api"
          label="API"
          icon={<Code2 size={20} />}
          description="REST API documentation"
        />
      </SubMenu>

      <SubMenu label="Docs" icon={<BookOpen size={20} />} href="/docs">
        <SubMenuItem
          href="/docs/overview"
          label="Overview"
          icon={<BookOpen size={20} />}
          description="Learn about HubWeb3"
        />
        <SubMenuItem
          href="/docs/tutorials"
          label="Tutorials"
          icon={<BookOpen size={20} />}
          description="Step-by-step guides"
        />
        <SubMenuItem
          href="/docs/faq"
          label="FAQ"
          icon={<BookOpen size={20} />}
          description="Frequently asked questions"
        />
      </SubMenu>

      <SubMenu label="Ecosystem" icon={<Network size={20} />} href="/ecosystem">
        <SubMenuItem
          href="/ecosystem/projects"
          label="Projects"
          icon={<Network size={20} />}
          description="Built on HubWeb3"
        />
        <SubMenuItem
          href="/ecosystem/partners"
          label="Partners"
          icon={<Network size={20} />}
          description="Our partners"
        />
        <SubMenuItem
          href="/ecosystem/community"
          label="Community"
          icon={<Network size={20} />}
          description="Join our community"
        />
      </SubMenu>
    </nav>
  );
}

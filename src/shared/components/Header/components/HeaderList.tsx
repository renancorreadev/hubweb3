"use client";

import Link from "next/link";

export function HeaderList() {
  return (
    <nav className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-lg font-monument">
      <Link href="/developers" className="hover:text-hub-primary ">Developers</Link>
      <Link href="/docs" className="hover:text-hub-primary ">Docs</Link>
      <Link href="/ecosystem" className="hover:text-hub-primary">Ecosystem</Link>
    </nav>
  );
}

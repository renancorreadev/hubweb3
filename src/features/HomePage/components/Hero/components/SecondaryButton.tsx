import Link from "next/link";

export function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-block border border-white text-white font-dsemi py-3 px-8 rounded-full text-sm md:text-base uppercase tracking-wider hover:bg-white hover:text-black transition-all">
      {children}
    </Link>
  );
}

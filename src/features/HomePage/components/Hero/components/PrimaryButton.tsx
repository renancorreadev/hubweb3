import Link from "next/link";

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="bg-gradient-to-r from-hub-secondary to-hub-primary text-black font-dsemi py-3 px-8 rounded-full text-sm md:text-base uppercase tracking-wider hover:opacity-90 transition-all">
       {children}
    </Link>
  );
}

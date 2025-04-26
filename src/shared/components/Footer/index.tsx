"use client";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-hub-background py-8 mt-16">
      <div className="container mx-auto text-center text-sm text-gray-400">
        © {new Date().getFullYear()} HubWeb3 — Todos os direitos reservados.
      </div>
    </footer>
  );
}

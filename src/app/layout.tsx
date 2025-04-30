import "@/styles/global.css";

import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from "@/shared/contexts/LanguageContext";

export const metadata = {
  title: "HubWeb3",
  description: "Meus projetos de Blockchain no ar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

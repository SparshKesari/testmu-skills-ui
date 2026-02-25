import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Agent Skills for All | agentskillsforall.com — by TestMu AI",
  description:
    "Agent Skills for All by TestMu AI — Discover and install production-grade skills for test automation. Search by framework, language, and category.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-sans min-h-screen antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen w-full px-4 py-10 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </main>
        <footer className="w-full border-t border-border py-6 text-center text-sm text-muted-foreground">
          <a
            href="https://testmuai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
          >
            Made with ❤️ and ☕ by TestMu AI
          </a>
        </footer>
      </body>
    </html>
  );
}

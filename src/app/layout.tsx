import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TestMu AI Skills — Find the right test automation skill",
  description:
    "Discover and install production-grade Agent Skills for test automation. Search by framework, language, and category.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Header />
        <main className="min-h-screen w-full px-4 py-10 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
      </body>
    </html>
  );
}

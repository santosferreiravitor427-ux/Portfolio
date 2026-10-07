import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Missão Mauá | Uma aula por dia",
  description: "Preparação pessoal de Vitor para GCM Mauá: aulas de outubro, exemplos de vôlei, questões e revisões.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}

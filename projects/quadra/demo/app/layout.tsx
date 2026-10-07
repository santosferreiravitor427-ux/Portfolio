import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quadra | Controle esportivo",
  description: "Sua equipe em quadra. Cada jogada em perspectiva.",
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

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0B1222",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "MK Tech | Assistência Técnica & Serviços Digitais",
  description:
    "Especialistas em assistência técnica de software, celulares, computadores, formatação ABNT/slides e soluções digitais. Encontre seu serviço e solicite atendimento rápido via WhatsApp.",
  keywords: [
    "MK Tech",
    "assistência técnica",
    "manutenção de celular",
    "formatação de computador",
    "reparo de software",
    "ABNT",
    "slides profissionais",
    "suporte remoto",
    "otimização de PC",
    "recuperação de conta",
  ],
  authors: [{ name: "MK Tech" }],
  creator: "MK Tech",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/mktech-logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "MK Tech | Assistência Técnica & Serviços Digitais",
    description: "Catálogo completo de serviços de software, celulares, computadores e documentos. Atendimento rápido e transparente.",
    url: "https://mktech.com.br",
    siteName: "MK Tech",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#0B1222] text-[#F8FAFC] antialiased selection:bg-[#1769FF]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

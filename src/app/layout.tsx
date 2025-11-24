import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tomozkan.fr"),
  title: "Tom Ozkan | Chef de Projet SI & Développeur Full-Stack",
  description: "Portfolio professionnel de Tom Ozkan. Chef de Projet Système d'Information et Développeur Full-Stack spécialisé en React, Next.js, PHP/Symfony. Disponible pour de nouvelles opportunités.",
  keywords: ["Chef de Projet SI", "Développeur Full-Stack", "React", "Next.js", "PHP", "Symfony", "Agile", "Scrum", "Tom Ozkan"],
  authors: [{ name: "Tom Ozkan" }],
  creator: "Tom Ozkan",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://tomozkan.fr",
    title: "Tom Ozkan | Chef de Projet SI & Développeur Full-Stack",
    description: "Portfolio professionnel de Tom Ozkan. Chef de Projet Système d'Information et Développeur Full-Stack.",
    siteName: "Tom Ozkan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tom Ozkan - Chef de Projet SI & Développeur Full-Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Ozkan | Chef de Projet SI & Développeur Full-Stack",
    description: "Portfolio professionnel de Tom Ozkan. Chef de Projet Système d'Information et Développeur Full-Stack.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={cn(inter.variable, outfit.variable, "font-sans antialiased bg-background text-foreground selection:bg-primary/30")}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

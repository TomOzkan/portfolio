import { Metadata } from "next";

// =================================================================================================================================

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tom Ozkan",
  url: "https://tomozkan.fr/", // SITE URL
  description: "Explore the portfolio of Tom Ozkan, a full-stack developer based in Lyon.",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://tomozkan.fr/card.png", // Main image URL
    width: 1200,
    height: 630,
  },
  author: {
    "@type": "Person",
    name: "Tom Ozkan",
    url: "https://tomozkan.fr",
  },
  publisher: {
    "@type": "Person",
    name: "Tom Ozkan",
    logo: {
      "@type": "ImageObject",
      url: "https://tomozkan.fr/icons/logo.png", // LOGO URL
      width: 60,
      height: 60,
    },
  },
  mainEntityOfPage: [
    {
      "@type": "WebPage",
      "@id": "https://tomozkan.fr/",
      name: "Home",
      description: "Welcome to Tom Ozkan's portfolio, a full-stack developer based in Lyon.",
      url: "https://tomozkan.fr/",
    },
  ],
};

// =================================================================================================================================

export const commonMetadata: Metadata = {
  applicationName: "Tom Ozkan",
  metadataBase: new URL("https://tomozkan.fr/"), // SITE URL
  title: {
    template: "%s - Portfolio",
    default: "Tom Ozkan - Portfolio",
  },
  authors: [
    { name: "Tom Ozkan", url: "https://github.com/TomOzkan" },
  ],
  openGraph: {
    title: "Tom Ozkan - Full-Stack Developer",
    type: "website",
    url: "https://tomozkan.fr/",
    images: [
      {
        url: "https://tomozkan.fr/card.png",
        width: 1200,
        height: 630,
        alt: "Preview of Tom Ozkan's portfolio",
      },
    ],
    description: "Portfolio of Tom Ozkan, a full-stack developer specializing in React, Node.js, and more.",
    siteName: "Tom Ozkan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Ozkan - Full-Stack Developer",
    description: "Portfolio of Tom Ozkan, a full-stack developer specializing in React, Node.js, and more.",
    images: {
      url: "https://tomozkan.fr/card.png",
      width: 1200,
      height: 630,
      alt: "Preview of Tom Ozkan's portfolio",
    },
  },
};

// =================================================================================================================================

export const homeMetadata: Metadata = {
  description: "Welcome to the portfolio of Tom Ozkan, a full-stack developer based in Lyon.",
  keywords: "Tom Ozkan, full-stack developer, web developer, portfolio, React, Node.js, JavaScript, Lyon, France, Tom O, apprentice, junior developer, web technologies, web development, Supinfo",
};

// =================================================================================================================================

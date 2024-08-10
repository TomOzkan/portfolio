import { Metadata } from "next";

// =================================================================================================================================

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tom Ozkan",
  url: "https://tomozkan.fr/", //URL DU SITE
  description: "Tom Ozkan portfolio",
  primaryImageOfPage: {
    "@type": "ImageObject",
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
      url: "https://febryer.fr/icons/logo.png", // URL DE L'ICON
      width: 60,
      height: 60,
    },
  },
  mainEntityOfPage: [
    {
      "@type": "WebPage",
      "@id": "https://tomozkan.fr/",
      name: "Home",
      description: "Welcome to Tom Ozkan's portfolio.",
      url: "https://tomozkan.fr/",
    },
  ],
};

// =================================================================================================================================

export const commonMetadata: Metadata = {
  applicationName: "Tom Ozkan",
  // metadataBase: new URL("https://febryer.fr/"), URL DU SITE
  title: {
    template: "%s - Portfolio",
    default: "Portfolio",
  },
  authors: [
    { name: "Tom Ozkan", url: "https://github.com/TomOzkan" },
  ],
  openGraph: {
    title: "Tom Ozkan",
    type: "website",
    url: "https://tomozkan.fr/",
    images: [
      {
        url: "https://tomozkan.fr/img/websiteimg.png",
        width: "1200",
        height: "630",
        alt: "Tom Ozkan card",
      },
    ],
    description: "Tom Ozkan, Full-stack developer & more...", // PEAUFINEZ LA DESCRIPTION
    siteName: "Tom Ozkan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Ozkan",
    description: "Tom Ozkan, Full-stack developer & more...", // PEAUFINEZ LA DESCRIPTION
    images: {
      url: "https://tomozkan.fr/img/websiteimg.png",
      width: "1200",
      height: "630",
      alt: "Tom Ozkan card",
    },
  },
};

// =================================================================================================================================

export const homeMetadata: Metadata = {
  description: "Welcome to Tom Ozkan portfolio.",
  keywords: "Tom ozkan, Tom o, Tom, Ozkan, Full-stack developer, developer, web developer, portfolio, apprentice, junior, react, next, node, typescript, javascript, html, css, php, symfony, laravel, mysql, mongodb, react native, angular, framer motion, tomozkan, tom o, tom, ozkan, lyon, france, g4, teliae, web developper, project management, supinfo, supinfo lyon, supinfo france, supinfo lyon france",
};

// =================================================================================================================================

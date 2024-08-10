import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tomozkan.fr/", // URL DU SITE
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}

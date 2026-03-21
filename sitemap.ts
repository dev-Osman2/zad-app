import { MetadataRoute } from "next";
import { sectionsData } from "@/lib/contentData"; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zad-app.vercel.app";

  
  const staticRoutes = ["", "/book", "/hadiths", "/exam", "/feedback", "/quran"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const, 
    priority: route === "" ? 1 : 0.8, 
  }));

  
  const dynamicRoutes = sectionsData.flatMap((section) =>
    section.items.map((item) => ({
      url: `${baseUrl}${item.link}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const, 
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...dynamicRoutes];
}
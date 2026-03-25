import { MetadataRoute } from "next";
import {
  allCourses,
  allExams,
  allHadithBooks,
  allHadithSharhByBook,
  allPodcasts,
} from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zad-app.vercel.app";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/feedback", "/quran"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const dynamicPaths = new Set<string>();

  for (const slug of Object.keys(allCourses)) {
    dynamicPaths.add(`/books/${slug}`);
  }

  for (const slug of Object.keys(allHadithBooks)) {
    dynamicPaths.add(`/hadiths/${slug}`);
  }

  for (const slug of Object.keys(allPodcasts)) {
    dynamicPaths.add(`/podcast/${slug}`);
  }

  for (const slug of Object.keys(allExams)) {
    dynamicPaths.add(`/exam/${slug}`);
  }

  for (const [bookSlug, sharhMap] of Object.entries(allHadithSharhByBook)) {
    for (const hadithId of Object.keys(sharhMap)) {
      dynamicPaths.add(`/hadiths/${bookSlug}/sharh-${hadithId}`);
    }
  }

  for (let chapterId = 1; chapterId <= 114; chapterId += 1) {
    dynamicPaths.add(`/quran/${chapterId}`);
  }

  const dynamicRoutes: MetadataRoute.Sitemap = Array.from(dynamicPaths).map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...dynamicRoutes];
}
import type { MetadataRoute } from "next";
import { fetchAllProjects } from "@/api/projects-query";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://appro.com.ua";

const staticPaths = [
  "",
  "/catalogue",
  "/about",
  "/additional",
  "/individual-project",
  "/example-project",
] as const;

/** One entry per path per locale: default (no prefix) and /ru */
function staticEntriesForLocales(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of staticPaths) {
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    });
    entries.push({
      url: `${baseUrl}/ru${path || ""}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    });
  }
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticEntriesForLocales();

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await fetchAllProjects();
    const list = Array.isArray(projects) ? projects : [];
    for (const project of list as { id: number }[]) {
      projectEntries.push({
        url: `${baseUrl}/catalogue/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
      projectEntries.push({
        url: `${baseUrl}/ru/catalogue/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  } catch {
    // If API is unavailable at build time, sitemap still includes static routes
  }

  return [...staticEntries, ...projectEntries];
}

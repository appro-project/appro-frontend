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

function staticEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of staticPaths) {
    const uaUrl = `${baseUrl}${path || "/"}`;
    const ruUrl = `${baseUrl}/ru${path || ""}`;
    entries.push({
      url: uaUrl,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          uk: uaUrl,
          ru: ruUrl,
        },
      },
    });
    entries.push({
      url: ruUrl,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          uk: uaUrl,
          ru: ruUrl,
        },
      },
    });
  }
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = staticEntries();

  try {
    const projects = await fetchAllProjects();
    const list = Array.isArray(projects) ? projects : [];
    for (const project of list as { id: number }[]) {
      const uaUrl = `${baseUrl}/catalogue/${project.id}`;
      const ruUrl = `${baseUrl}/ru/catalogue/${project.id}`;
      entries.push({
        url: uaUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: {
            uk: uaUrl,
            ru: ruUrl,
          },
        },
      });
      entries.push({
        url: ruUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: {
            uk: uaUrl,
            ru: ruUrl,
          },
        },
      });
    }
  } catch {
    // If API is unavailable at build time, sitemap still includes static routes
  }

  return entries;
}

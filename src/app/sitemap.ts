import type { MetadataRoute } from "next";
import { fetchAllProjects } from "@/api/projects-query";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://appro.com.ua";

const staticRoutes = [
  "",
  "/catalogue",
  "/about",
  "/additional",
  "/individual-project",
  "/example-project",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await fetchAllProjects();
    const list = Array.isArray(projects) ? projects : [];
    projectEntries = list.map((project: { id: number }) => ({
      url: `${baseUrl}/catalogue/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // If API is unavailable at build time, sitemap still includes static routes
  }

  return [...staticEntries, ...projectEntries];
}

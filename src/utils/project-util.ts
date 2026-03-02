import { ProjectDto } from "@/api/model";

export function getDescription(project: ProjectDto, locale: string): string {
  return locale === "ru" ? project.descriptionRU : project.descriptionUA;
}

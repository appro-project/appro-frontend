"use client";

import { Welcome } from "@/features/main-page/welcome/welcome-page.component";
import { Popular } from "@/features/main-page/popular/popular.component";
import { Principles } from "@/features/main-page/principles/principles.component";
import { Feedback } from "@/features/main-page/feedback-form/feedback-form.component";
import { About } from "@/features/main-page/about/about.component";
import { useGetAllProjects } from "@/api/use-get-all-projects";
import { ProjectDto } from "@/api/model";
import { FullSizeLoader } from "@/components/full-size-loader.component";

export function HomeContent() {
  const { data: projects } = useGetAllProjects();

  if (!projects) return <FullSizeLoader />;

  const welcomeProjects = projects.filter(
    (project: ProjectDto) => project.showOnMain
  );

  return (
    <>
      <Welcome mockProjects={welcomeProjects} />
      <Popular />
      <About />
      <Principles />
      <Feedback />
    </>
  );
}

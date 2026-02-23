"use client";

import { Container } from "@/containers/hoc/container/container";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { ProjectTabs } from "@/features/project/project-tabs.component";
import { useGetProjectById } from "@/api/use-get-project-by-id";
import { setViewProject } from "@/redux/actions";
import {
  getProjectInLocalStorage,
  setProjectInLocalStorage,
} from "@/services/util/localStorage";
import { useDispatch } from "react-redux";
import classes from "@/features/project/project.module.scss";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { useTranslation } from "react-i18next";
import { FullSizeLoader } from "@/components/full-size-loader.component";

export default function ProjectPageContent() {
  const { projectId } = useParams() as { projectId: string };
  const { data: project } = useGetProjectById(+projectId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const projectInLocalStorage: number[] = getProjectInLocalStorage();
    if (project) {
      const filterProjectInLocalStorage = projectInLocalStorage?.filter(
        (elem) => elem !== project?.id
      );
      setProjectInLocalStorage([project?.id, ...filterProjectInLocalStorage]);
      dispatch(setViewProject(project));
    }
  }, [project, dispatch]);

  if (!project) {
    return <FullSizeLoader />;
  }

  return (
    <section className={classes.Project}>
      <Container>
        <div className={classes.Project_Breadcrumbs}>
          <Breadcrumbs
            items={[
              { href: "/catalogue", label: t("header.catalogue_link") },
              { href: `/catalogue/${project.id}`, label: project.title },
            ]}
          />
        </div>
        <h1 className={classes.Project_Title}>{project.title}</h1>
        <div className={classes.Project_Body}>
          {project && <ProjectTabs project={project} />}
        </div>
      </Container>
    </section>
  );
}

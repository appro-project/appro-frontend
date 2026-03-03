import classes from "./project-item.module.scss";
import { Overlay } from "@/components/ui/overlay/overlay.component";
import { ProjectDetails } from "./project-details.component";
import { ProjectDto } from "@/api/model";
import type { TranslationsRecord } from "@/i18n/create-t";
import type { Locale } from "@/i18n/locales";

interface PropsType {
  project: ProjectDto;
  translations: TranslationsRecord;
  lang: Locale;
}

export const ProjectItem = ({ project, translations, lang }: PropsType) => {
  return (
    <div>
      <div className={classes["welcome__project-image"]}>
        <img src={project.mainImage?.path} alt="slide 1" />
        <Overlay />
      </div>
      <div className={classes["welcome__project-details-wrapper"]}>
        <ProjectDetails project={project} translations={translations} lang={lang} />
      </div>
    </div>
  );
};

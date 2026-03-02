import { Button } from "@/components/ui/button/button.component";
import classes from "./project-details.module.scss";
import Link from "next/link";
import { ProjectDto } from "@/api/model";
import { FC } from "react";
import { createT } from "@/i18n/create-t";
import type { TranslationsRecord } from "@/i18n/create-t";
import { getDescription } from "@/utils/project-util";
import { localePath, type Locale } from "@/i18n/locales";

interface Props {
  project: ProjectDto;
  translations: TranslationsRecord;
  lang: Locale;
}

export const ProjectDetails: FC<Props> = ({ project, translations, lang }) => {
  const t = createT(translations);

  return (
    <div className={classes["project-details"]}>
      <div className={classes["project-details__header"]}>
        <div className={classes["project-details__title"]}>
          {t("catalogue.form.project_name")} {project.title}
        </div>

        {/*TODO: Fix square*/}
        <div className={classes["project-details__square"]}>
          {project.generalArea} м<sup>2</sup>
        </div>
      </div>
      <div className={classes["project-details__description"]}>
        {getDescription(project, lang)}
      </div>

      <div className={classes["project-details__footer"]}>
        <div className={classes["project-details__price"]}>
          {project.projectPrice} грн.
          <span className={classes["project-details__price-info"]}>
            {t("catalogue.project.price")}
          </span>
        </div>
        <Link
          href={localePath(`/catalogue/${project.id}`, lang)}
          className={classes["project-details__link"]}
        >
          <Button title={t("catalogue.project.more_details")} />
        </Link>
      </div>
    </div>
  );
};

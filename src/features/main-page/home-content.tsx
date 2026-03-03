"use client";

import { Welcome } from "@/features/main-page/welcome/welcome-page.component";
import { Popular } from "@/features/main-page/popular/popular.component";
import { Principles } from "@/features/main-page/principles/principles.component";
import { Feedback } from "@/features/main-page/feedback-form/feedback-form.component";
import { About } from "@/features/main-page/about/about.component";
import { useGetAllProjects } from "@/api/use-get-all-projects";
import { ProjectDto } from "@/api/model";
import { FullSizeLoader } from "@/components/full-size-loader.component";
import type { PrinciplesTranslations } from "@/i18n/server";
import type { TranslationsRecord } from "@/i18n/create-t";
import type { Locale } from "@/i18n/locales";

type HomeContentProps = {
  principlesTranslations: PrinciplesTranslations;
  translations: TranslationsRecord;
  lang: Locale;
};

export function HomeContent({ principlesTranslations, translations, lang }: HomeContentProps) {
  const { data: projects } = useGetAllProjects();

  if (!projects) return <FullSizeLoader />;

  const welcomeProjects = projects.filter(
    (project: ProjectDto) => project.showOnMain
  );

  return (
    <>
      <Welcome mockProjects={welcomeProjects} translations={translations} lang={lang} />
      <Popular translations={translations} lang={lang} />
      <About translations={translations} lang={lang} />
      <Principles principlesTranslations={principlesTranslations} />
      <Feedback translations={translations} lang={lang} />
    </>
  );
}

import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchAllProjects, PROJECTS_QUERY_KEY } from "@/api/projects-query";
import { HomeContent } from "@/features/main-page/home-content";
import { createQueryClient } from "@/utils/react-query/react-query-util";
import { getPrinciplesTranslations, getAppTranslations } from "@/i18n/server";
import { DEFAULT_LOCALE } from "@/i18n/locales";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function LangHomePage({ params }: Props) {
  const { lang: langParam } = await params;
  const lang = langParam === "ru" ? "ru" : DEFAULT_LOCALE;
  const queryClient = createQueryClient();
  const [_, principlesTranslations] = await Promise.all([
    queryClient.prefetchQuery({
      queryKey: PROJECTS_QUERY_KEY,
      queryFn: fetchAllProjects,
    }),
    getPrinciplesTranslations(lang),
  ]);
  const translations = getAppTranslations(lang);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContent principlesTranslations={principlesTranslations} translations={translations} lang={lang} />
    </HydrationBoundary>
  );
}

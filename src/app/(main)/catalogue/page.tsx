import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchAllProjects, PROJECTS_QUERY_KEY } from "@/api/projects-query";
import { Catalogue } from "@/features/catalogue/catalogue.component";
import { Suspense } from "react";
import { FullSizeLoader } from "@/components/full-size-loader.component";
import { createQueryClient } from "@/utils/react-query/react-query-util";
import { getAppTranslations } from "@/i18n/server";
import { DEFAULT_LOCALE } from "@/i18n/locales";

export default async function CataloguePage() {
  const lang = DEFAULT_LOCALE;
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: fetchAllProjects,
  });

  const translations = getAppTranslations(lang);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<FullSizeLoader />}>
        <Catalogue translations={translations} lang={lang} />
      </Suspense>
    </HydrationBoundary>
  );
}

import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchAllProjects, PROJECTS_QUERY_KEY } from "@/api/projects-query";
import { Catalogue } from "@/features/catalogue/catalogue.component";
import { Suspense } from "react";
import { FullSizeLoader } from "@/components/full-size-loader.component";
import { createQueryClient } from "@/utils/react-query/react-query-util";
import type { Metadata } from 'next'
import { getAppTranslations, getServerTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { getAlternates, getBaseOpenGraph } from '@/utils/seo/alternates'

type MetadataProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { lang: langParam } = await params
  const locale = langParam === 'ru' ? 'ru' : DEFAULT_LOCALE
  const t = await getServerTranslations(locale)
  return {
    title: t('meta.catalogue_title'),
    description: t('meta.catalogue_description'),
    alternates: getAlternates('/catalogue'),
    openGraph: {
      ...getBaseOpenGraph(locale as 'ua' | 'ru'),
      title: t('meta.catalogue_title'),
      description: t('meta.catalogue_description'),
      type: 'website',
    },
  }
}

export default async function LangCataloguePage({ params }: MetadataProps) {
  const { lang: langParam } = await params
  const lang = langParam === 'ru' ? 'ru' : DEFAULT_LOCALE
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: fetchAllProjects,
  });

  const translations = getAppTranslations(lang)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<FullSizeLoader />}>
        <Catalogue translations={translations} lang={lang} />
      </Suspense>
    </HydrationBoundary>
  );
}

import type { Metadata } from 'next'
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import { fetchAllProjects, PROJECTS_QUERY_KEY } from '@/api/projects-query'
import { HomeContent } from '@/features/main-page/home-content'
import { createQueryClient } from '@/utils/react-query/react-query-util'
import { getServerTranslations, getPrinciplesTranslations, getAppTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations(DEFAULT_LOCALE)
  return {
    title: t('meta.site_title'),
    description: t('meta.site_description'),
    openGraph: {
      title: t('meta.site_title'),
      description: t('meta.site_description'),
    },
  }
}

export default async function HomePage() {
  const lang = DEFAULT_LOCALE
  const queryClient = createQueryClient()
  const [, principlesTranslations] = await Promise.all([
    queryClient.prefetchQuery({
      queryKey: PROJECTS_QUERY_KEY,
      queryFn: fetchAllProjects,
    }),
    getPrinciplesTranslations(lang),
  ])
  const translations = getAppTranslations(lang)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContent principlesTranslations={principlesTranslations} translations={translations} lang={lang} />
    </HydrationBoundary>
  )
}

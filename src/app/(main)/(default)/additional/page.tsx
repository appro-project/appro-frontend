import type { Metadata } from 'next'
import { Container } from '@/containers/hoc/container/container'
import { VisitedProjects } from '@/containers/visited-projects/visited-projects'
import { Additional } from '@/features/project/additional/additional.component'
import { getAppTranslations, getServerTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { getAlternates, getBaseOpenGraph } from '@/utils/seo/alternates'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations(DEFAULT_LOCALE)
  return {
    title: t('meta.additional_title'),
    description: t('meta.additional_description'),
    alternates: getAlternates('/additional'),
    openGraph: {
      ...getBaseOpenGraph(DEFAULT_LOCALE),
      title: t('meta.additional_title'),
      description: t('meta.additional_description'),
      type: 'website',
    },
  }
}

export default async function AdditionalPage() {
  const lang = DEFAULT_LOCALE
  const translations = getAppTranslations(lang)
  return (
    <section>
      <Container>
        <Additional translations={translations} />
        <VisitedProjects translations={translations} lang={lang} />
      </Container>
    </section>
  )
}

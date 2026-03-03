import type { Metadata } from 'next'
import { AboutUs } from '@/features/about-us-page/about-us.component'
import { getAppTranslations, getServerTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { getAlternates, getBaseOpenGraph } from '@/utils/seo/alternates'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations(DEFAULT_LOCALE)
  return {
    title: t('meta.about_title'),
    description: t('meta.about_description'),
    alternates: getAlternates('/about'),
    openGraph: {
      ...getBaseOpenGraph(DEFAULT_LOCALE),
      title: t('meta.about_title'),
      description: t('meta.about_description'),
      type: 'website',
    },
  }
}

export default function AboutUsPage() {
  const lang = DEFAULT_LOCALE
  const translations = getAppTranslations(lang)
  return <AboutUs translations={translations} lang={lang} />
}

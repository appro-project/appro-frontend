import type { Metadata } from 'next'
import { IndividualProject } from '@/features/individual-project/individual-project.component'
import { getAppTranslations, getServerTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { getAlternates, getBaseOpenGraph } from '@/utils/seo/alternates'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations(DEFAULT_LOCALE)
  return {
    title: t('meta.individual_title'),
    description: t('meta.individual_description'),
    alternates: getAlternates('/individual-project'),
    openGraph: {
      ...getBaseOpenGraph(DEFAULT_LOCALE),
      title: t('meta.individual_title'),
      description: t('meta.individual_description'),
      type: 'website',
    },
  }
}

export default function IndividualProjectPage() {
	const lang = DEFAULT_LOCALE
	const translations = getAppTranslations(lang)
	return <IndividualProject translations={translations} lang={lang} />
}

import type { Metadata } from 'next'
import { IndividualProject } from '@/features/individual-project/individual-project.component'
import { getAppTranslations, getServerTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { getAlternates, getBaseOpenGraph } from '@/utils/seo/alternates'

type Props = {
	params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params
  const locale = langParam === 'ru' ? 'ru' : DEFAULT_LOCALE
  const t = await getServerTranslations(locale)
  return {
    title: t('meta.individual_title'),
    description: t('meta.individual_description'),
    alternates: getAlternates('/individual-project'),
    openGraph: {
      ...getBaseOpenGraph(locale as 'ua' | 'ru'),
      title: t('meta.individual_title'),
      description: t('meta.individual_description'),
      type: 'website',
    },
  }
}

export default async function LangIndividualProjectPage({ params }: Props) {
	const { lang: langParam } = await params
	const lang = langParam === 'ru' ? 'ru' : DEFAULT_LOCALE
	const translations = getAppTranslations(lang)
	return <IndividualProject translations={translations} lang={lang} />
}

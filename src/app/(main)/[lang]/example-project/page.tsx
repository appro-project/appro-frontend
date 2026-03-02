import type { Metadata } from 'next'
import { ExampleProject } from '@/features/example-project/example-project.component'
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
    title: t('meta.example_title'),
    description: t('meta.example_description'),
    alternates: getAlternates('/example-project'),
    openGraph: {
      ...getBaseOpenGraph(locale as 'ua' | 'ru'),
      title: t('meta.example_title'),
      description: t('meta.example_description'),
      type: 'website',
    },
  }
}

export default async function LangExampleProjectPage({ params }: Props) {
  const { lang: langParam } = await params
  const lang = langParam === 'ru' ? 'ru' : DEFAULT_LOCALE
  const translations = getAppTranslations(lang)
  return <ExampleProject translations={translations} lang={lang} />
}

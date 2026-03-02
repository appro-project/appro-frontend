import type { Metadata } from 'next'
import { AboutUs } from '@/features/about-us-page/about-us.component'
import { getServerTranslations } from '@/i18n/server'
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
    title: t('meta.about_title'),
    description: t('meta.about_description'),
    alternates: getAlternates('/about'),
    openGraph: {
      ...getBaseOpenGraph(locale as 'ua' | 'ru'),
      title: t('meta.about_title'),
      description: t('meta.about_description'),
      type: 'website',
    },
  }
}

export default function LangAboutUsPage() {
  return <AboutUs />
}

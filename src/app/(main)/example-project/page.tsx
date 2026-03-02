import type { Metadata } from 'next'
import { ExampleProject } from '@/features/example-project/example-project.component'
import { getServerTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { getAlternates, getBaseOpenGraph } from '@/utils/seo/alternates'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations(DEFAULT_LOCALE)
  return {
    title: t('meta.example_title'),
    description: t('meta.example_description'),
    alternates: getAlternates('/example-project'),
    openGraph: {
      ...getBaseOpenGraph(DEFAULT_LOCALE),
      title: t('meta.example_title'),
      description: t('meta.example_description'),
      type: 'website',
    },
  }
}

export default function ExampleProjectPage() {
  return <ExampleProject />
}

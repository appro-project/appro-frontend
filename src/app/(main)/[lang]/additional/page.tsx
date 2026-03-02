import type { Metadata } from 'next'
import { Container } from '@/containers/hoc/container/container'
import { VisitedProjects } from '@/containers/visited-projects/visited-projects'
import { Additional } from '@/features/project/additional/additional.component'
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
    title: t('meta.additional_title'),
    description: t('meta.additional_description'),
    alternates: getAlternates('/additional'),
    openGraph: {
      ...getBaseOpenGraph(locale as 'ua' | 'ru'),
      title: t('meta.additional_title'),
      description: t('meta.additional_description'),
      type: 'website',
    },
  }
}

export default function LangAdditionalPage() {
  return (
    <section>
      <Container>
        <Additional />
        <VisitedProjects />
      </Container>
    </section>
  )
}

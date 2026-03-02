import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServerTranslations } from '@/i18n/server'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

/** [lang] is only for RU; UA pages live at app root. */
export function generateStaticParams() {
  return [{ lang: 'ru' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (lang !== 'ru') return {}
  const t = await getServerTranslations('ru')
  return {
    title: t('meta.site_title'),
    description: t('meta.site_description'),
    openGraph: {
      title: t('meta.site_title'),
      description: t('meta.site_description'),
    },
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (lang !== 'ru') {
    notFound()
  }
  return <>{children}</>
}

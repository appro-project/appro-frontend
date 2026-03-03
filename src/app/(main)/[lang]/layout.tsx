import { notFound } from 'next/navigation'
import AppShell from '@/components/app-shell/app-shell'
import { getAppTranslations } from '@/i18n/server'
import { OrganizationJsonLd } from '@/components/seo/json-ld'
import type { Locale } from '@/i18n/locales'
import { LOCALES } from '@/i18n/locales'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return [{ lang: 'ru' }]
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  const locale = LOCALES.includes(lang as Locale) ? (lang as Locale) : null
  if (!locale) {
    notFound()
  }
  const translations = getAppTranslations(locale)
  return (
    <>
      <OrganizationJsonLd />
      <AppShell translations={translations} lang={locale}>
        {children}
      </AppShell>
    </>
  )
}

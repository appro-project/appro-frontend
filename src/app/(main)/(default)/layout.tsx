import AppShell from '@/components/app-shell/app-shell'
import { getAppTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { OrganizationJsonLd } from '@/components/seo/json-ld'

export default async function DefaultLocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lang = DEFAULT_LOCALE
  const translations = getAppTranslations(lang)
  return (
    <>
      <OrganizationJsonLd />
      <AppShell translations={translations} lang={lang}>
        {children}
      </AppShell>
    </>
  )
}

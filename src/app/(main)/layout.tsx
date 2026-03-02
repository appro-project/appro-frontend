import { headers } from 'next/headers'
import AppShell from '@/components/app-shell/app-shell'
import { getAppTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const lang = (headersList.get('x-current-lang') as 'ua' | 'ru') ?? DEFAULT_LOCALE
  const translations = getAppTranslations(lang)
  return <AppShell translations={translations} lang={lang}>{children}</AppShell>
}

import i18next from 'i18next'
import ua from './locales/ua/translation.json'
import ru from './locales/ru/translation.json'
import type { Locale } from './locales'
import { DEFAULT_LOCALE, LOCALES } from './locales'

/** Server-only: full translation object for the given locale (for client context). */
export function getAppTranslations(locale: string): Record<string, unknown> {
  const validLocale = LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE
  return (validLocale === 'ru' ? ru : ua) as Record<string, unknown>
}

const resources = {
  ua: { translations: ua },
  ru: { translations: ru },
}

function createServerInstance() {
  const i18n = i18next.createInstance()
  i18n.use({
    type: '3rdParty',
    init: () => {},
  })
  return i18n
}

async function initServerInstance(i18n: ReturnType<typeof createServerInstance>) {
  await i18n.init({
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    resources,
    defaultNS: 'translations',
    react: { useSuspense: false },
  })
}

/**
 * Returns a promise that resolves to the t function for the given locale.
 * Uses a new i18next instance per call to avoid race conditions in concurrent requests.
 */
export async function getServerTranslations(
  locale: string
): Promise<(key: string, options?: Record<string, unknown>) => string> {
  const validLocale = LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE
  const i18n = createServerInstance()
  await initServerInstance(i18n)
  await i18n.changeLanguage(validLocale)
  return i18n.t.bind(i18n)
}

/** Server-only: returns { lang, t } for the given locale. Use in server components/pages. */
export async function getServerTranslation(locale: string): Promise<{
  lang: Locale
  t: (key: string, options?: Record<string, unknown>) => string
}> {
  const validLocale = LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE
  const t = await getServerTranslations(validLocale)
  return { lang: validLocale, t }
}

const PRINCIPLES_KEYS = [
  { title: 'main.principles.advantage.title', description: 'main.principles.advantage.description' },
  { title: 'main.principles.strength.title', description: 'main.principles.strength.description' },
  { title: 'main.principles.beauty.title', description: 'main.principles.beauty.description' },
] as const

export type PrinciplesTranslations = {
  title: string
  items: { title: string; description: string }[]
}

/** Server-only: get translated strings for the Principles section. */
export async function getPrinciplesTranslations(locale: string): Promise<PrinciplesTranslations> {
  const t = await getServerTranslations(locale)
  return {
    title: t('main.principles.title'),
    items: PRINCIPLES_KEYS.map(({ title, description }) => ({
      title: t(title),
      description: t(description),
    })),
  }
}

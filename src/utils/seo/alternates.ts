import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://appro.com.ua'

/**
 * Returns canonical URL and hreflang alternates for a given path.
 * @param path — the path WITHOUT locale prefix (e.g. '/catalogue/2')
 */
export function getAlternates(path: string): NonNullable<Metadata['alternates']> {
  const normalized = path === '/' ? '' : path
  return {
    canonical: `${BASE_URL}${normalized || '/'}`,
    languages: {
      'uk': `${BASE_URL}${normalized || '/'}`,
      'ru': `${BASE_URL}/ru${normalized || ''}`,
      'x-default': `${BASE_URL}${normalized || '/'}`,
    },
  }
}

/**
 * Returns the base Open Graph fields shared across all pages.
 */
export function getBaseOpenGraph(locale: 'ua' | 'ru') {
  return {
    siteName: 'APPRO',
    locale: locale === 'ru' ? 'ru_RU' : 'uk_UA',
    alternateLocale: locale === 'ru' ? ['uk_UA'] : ['ru_RU'],
    url: BASE_URL,
  }
}

export { BASE_URL }

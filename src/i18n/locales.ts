export const LOCALES = ['ua', 'ru'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ua'

/**
 * Returns the path with locale prefix for use in URLs.
 * For default locale (ua) returns path as-is (no prefix).
 * For ru returns '/ru' or '/ru' + path (no double slash for home).
 */
export function localePath(path: string, locale: Locale): string {
	const normalized = path.startsWith('/') ? path : `/${path}`
	const isHome = normalized === '/' || normalized === ''
	if (locale === DEFAULT_LOCALE) return isHome ? '/' : normalized
	if (isHome) return `/${locale}`
	return `/${locale}${normalized}`
}

/**
 * Strips lang prefix from pathname to get the path without language segment.
 * e.g. '/ru/catalogue' -> '/catalogue', '/ru' -> '/', '/' -> '/'
 */
export function pathWithoutLang(pathname: string): string {
	if (pathname.startsWith('/ru')) {
		const rest = pathname.slice(3)
		return rest.startsWith('/') ? rest : rest ? `/${rest}` : '/'
	}
	return pathname
}

/**
 * Returns the language from pathname, or DEFAULT_LOCALE if no prefix.
 */
export function langFromPathname(pathname: string): Locale {
	if (pathname.startsWith('/ru')) return 'ru'
	return DEFAULT_LOCALE
}

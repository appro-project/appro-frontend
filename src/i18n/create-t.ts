'use client'

export type TranslationsRecord = Record<string, unknown>

function getNested(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc != null && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

/**
 * Creates a t function from server-provided translations object.
 * Use in components that receive translations and lang as props.
 */
export function createT(translations: TranslationsRecord | null): (key: string, options?: Record<string, unknown>) => string {
  return function t(key: string, options?: Record<string, unknown>): string {
    if (!translations) return key
    const value = getNested(translations, key)
    if (typeof value !== 'string') return key
    if (!options) return value
    return Object.entries(options).reduce(
      (str, [k, v]) => str.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, 'g'), String(v)),
      value
    )
  }
}

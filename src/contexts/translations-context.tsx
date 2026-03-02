'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'

export type TranslationsRecord = Record<string, unknown>

const TranslationsContext = createContext<TranslationsRecord | null>(null)

function getNested(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc != null && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

/**
 * Returns a t function that looks up keys in the server-provided translations.
 * Replaces react-i18next's useTranslation for app content (translations come from server).
 */
export function useT(): (key: string, options?: Record<string, unknown>) => string {
  const translations = useContext(TranslationsContext)
  return useMemo(() => {
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
  }, [translations])
}

type Props = {
  translations: TranslationsRecord
  children: ReactNode
}

export function TranslationsProvider({ translations, children }: Props) {
  const value = useMemo(() => translations, [translations])
  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  )
}

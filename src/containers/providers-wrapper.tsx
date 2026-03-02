'use client'
import { useEffect } from 'react'
import QueryProvider from '@/providers/query-provider'
import ReduxProvider from '@/providers/redux-provider'
import i18n from '@/i18n/config'
import type { Locale } from '@/i18n/locales'

type Props = {
	children: React.ReactNode
	locale?: Locale
}

export default function ProvidersWrapper({ children, locale }: Props) {
	useEffect(() => {
		if (locale) {
			i18n.changeLanguage(locale)
		}
	}, [locale])

	return (
		<QueryProvider>
			<ReduxProvider>{children}</ReduxProvider>
		</QueryProvider>
	)
}

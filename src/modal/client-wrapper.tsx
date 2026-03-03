'use client'
import OrderModalWrapper from '@/modal/order-modal-wrapper'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'

type ClientWrapperProps = {
	translations: TranslationsRecord
	lang: Locale
}

export default function ClientWrapper({ translations, lang }: ClientWrapperProps) {
	return <OrderModalWrapper translations={translations} lang={lang} />
}

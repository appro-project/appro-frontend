'use client'
import { useState } from 'react'
import { OrderModalContainer } from '@/modal/order-modal-container'
import SuccessPopup from '@/components/success-popup/success-popup.component'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'

type OrderModalWrapperProps = {
	translations: TranslationsRecord
	lang: Locale
}

export default function OrderModalWrapper({ translations, lang }: OrderModalWrapperProps) {
	const [successMessageVisible, setSuccessMessageVisible] = useState(false)

	const showSuccessMessage = () => {
		setSuccessMessageVisible(true)
		setTimeout(() => setSuccessMessageVisible(false), 5000)
	}

	return (
		<>
			<OrderModalContainer onFormSubmit={showSuccessMessage} translations={translations} lang={lang} />
			{successMessageVisible && <SuccessPopup translations={translations} lang={lang} />}
		</>
	)
}

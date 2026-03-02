import React from 'react'
import classes from './success-popup.module.scss'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'

type SuccessPopupProps = {
	translations: TranslationsRecord
	lang: Locale
}

const SuccessPopup = ({ translations, lang }: SuccessPopupProps) => {
	const t = createT(translations)

	return (
		<div className={classes.popup}>
			<p>{t('modal.popup__message')}</p>
		</div>
	)
}

export default SuccessPopup

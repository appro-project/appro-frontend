'use client'
import classes from '../order.module.scss'
import { TextInput } from '@/components/ui/text-input/text-input.component'
import { TextArea } from '@/components/ui/text-area/text-area.component'
import { Button, ButtonType } from '@/components/ui/button/button.component'
import { createT, type TranslationsRecord } from '@/i18n/create-t'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IFeedbackForm } from '@/features/main-page/feedback-form/feedback-form.component'
import {
	axiosPostFeedback,
	axiosPostTelegramFeedback
} from '@/services/server-data/server-data'

interface ContactFormProps {
	onFormSubmit: () => void
	translations: TranslationsRecord
}

export const ContactForm: React.FC<ContactFormProps> = ({ onFormSubmit, translations }) => {
	const t = createT(translations)
	const [loading, setLoading] = useState(false)
	const { control, handleSubmit, reset } = useForm<IFeedbackForm>({
		defaultValues: {
			name: '',
			phone: '',
			content: ''
		}
	})

	const onSubmit = async (value: IFeedbackForm) => {
		try {
			setLoading(true)

			await Promise.all([
				axiosPostFeedback({ ...value }),
				axiosPostTelegramFeedback({ ...value })
			])

			reset()
			onFormSubmit()
			setLoading(false)
		} catch (e) {
			console.log(e)
			setLoading(true)
		}
	}
	return (
		<form className={classes['order__form']} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes['order__input']}>
				<Controller
					name='name'
					control={control}
					rules={{
						required: t('form_error_messages.not_empty'),
						validate: value =>
							value.trim().length > 0 ||
							t('form_error_messages.without_tabulation')
					}}
					render={({ field, fieldState: { error } }) => (
						<>
							<TextInput
								{...field}
								placeholder={t('individual.contact_form.name')}
								error={!!error}
							/>
							{error && (
								<span className={classes['order__error']}>{error.message}</span>
							)}
						</>
					)}
				/>
			</div>

			<div className={classes['order__input']}>
				<Controller
					name='phone'
					control={control}
					rules={{
						required: t('form_error_messages.not_empty'),
						pattern: {
							value: /^\+380 \d{9}$/,
							message: t('form_error_messages.phone')
						}
					}}
					render={({ field: props, fieldState: { error } }) => (
						<>
							<TextInput
								error={!!error}
								{...props}
								mask={'+380 _________'}
								placeholder={t('individual.contact_form.phone')}
							/>
							{error && (
								<span className={classes['order__error']}>{error.message}</span>
							)}
						</>
					)}
				/>
			</div>

			<div className={classes['order__input']}>
				<Controller
					name='content'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<TextArea
							{...field}
							placeholder={t('individual.contact_form.message')}
							error={!!error}
						/>
					)}
				/>
			</div>

			<div className={classes['order__submit']}>
				<Button
					disabled={loading}
					title={t('individual.contact_form.button')}
					buttonType={ButtonType.BIG}
				/>
			</div>
		</form>
	)
}

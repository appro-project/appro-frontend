'use client'
import { useState } from 'react'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'

import classes from './feedback.module.scss'
import { Container } from '@/containers/hoc/container/container'
import { TextInput } from '@/components/ui/text-input/text-input.component'
import { Button, ButtonType } from '@/components/ui/button/button.component'
import SuccessPopup from '@/components/success-popup/success-popup.component'
import { Controller, useForm } from 'react-hook-form'
import {
		axiosPostFeedback,
		axiosPostTelegramFeedback
} from '@/services/server-data/server-data'

 export interface IFeedbackForm {
		name: string
		email?: string
		phone: string
		content?: string
		project?: string
 }

 type FeedbackProps = {
		translations: TranslationsRecord
		lang: Locale
	}

 export const Feedback = ({ translations, lang }: FeedbackProps) => {
		const [error, setError] = useState(false)
		const [loading, setLoading] = useState(false)
		const {
			handleSubmit,
			formState: { errors },
			control,
			reset
		} = useForm<IFeedbackForm>({
			defaultValues: {
				name: '',
				email: '',
				phone: '',
				content: ''
			},
			mode: 'all',
			reValidateMode: 'onChange'
		})

		const [successMessageVisible, setSuccessMessageVisible] = useState(false)
		const showSuccessMessage = () => {
			setSuccessMessageVisible(true)
			setTimeout(() => {
				setSuccessMessageVisible(false)
			}, 5000)
		}

		const onSubmit = async (value: IFeedbackForm) => {
			try {
				setError(false)
				setLoading(true)

				await Promise.all([
					axiosPostFeedback({ ...value }),
					axiosPostTelegramFeedback({ ...value })
				])

				setLoading(false)
			} catch (e) {
				console.log(e)
				setError(true)
				setLoading(true)
			}
			reset()
			showSuccessMessage()
		}

		const t = createT(translations)

		return (
			<section id={'feedback-form'} className={classes['feedback']}>
				<Container>
					<div className={classes['feedback__header']}>
						{t('main.feedback.title')}
					</div>

					<div className={classes['feedback__body']}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={classes['feedback__form']}
						>
							<div className={classes['feedback__input']}>
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
												placeholder={t('modal.name')}
												error={!!error}
											/>
											{error && (
												<span className={classes['feedback__error']}>
													{error.message}
												</span>
											)}
										</>
									)}
								/>
							</div>
							<div className={classes['feedback__input']}>
								<Controller
									name='email'
									control={control}
									defaultValue={''}
									rules={{
										required: t('form_error_messages.not_empty'),
										pattern: {
											value:
												/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
											message: t('form_error_messages.email')
										}
									}}
									render={({ field, fieldState: { error } }) => (
										<>
											<TextInput
												{...field}
												error={!!errors.email}
												placeholder='E-mail'
											/>
											{error && (
												<span className={classes['feedback__error']}>
													{error.message}
												</span>
											)}
										</>
									)}
								/>
							</div>
							<div className={classes['feedback__input']}>
								<Controller
									name='phone'
									control={control}
									defaultValue={''}
									rules={{
										pattern: {
											value: /^\+380 \d{9}$/,
											message: t('form_error_messages.phone')
										}
									}}
									render={({ field, fieldState: { error } }) => (
										<>
											<TextInput
												error={!!error}
												{...field}
												mask={'+380 _________'}
												placeholder={t('main.feedback.phone')}
											/>
											{error && (
												<span className={classes['feedback__error']}>
													{error.message}
												</span>
											)}
										</>
									)}
								/>
							</div>

							<div className={classes['feedback__input']}>
								<Controller
									name='content'
									control={control}
									defaultValue={''}
									rules={{
										required: t('form_error_messages.not_empty'),
										validate: (value: string | undefined) =>
											(value && value.trim().length > 0) ||
											t('form_error_messages.without_tabulation')
									}}
									render={({ field, fieldState: { error } }) => (
										<>
											<TextInput
												error={!!error}
												{...field}
												placeholder={t('main.feedback.message')}
											/>
											{error && (
												<span className={classes['feedback__error']}>
													{error.message}
												</span>
											)}
										</>
									)}
								/>
							</div>
							<Button
								disabled={loading}
								buttonType={ButtonType.BIG}
								title={t('main.feedback.button')}
							/>
						</form>
					</div>
					{successMessageVisible && <SuccessPopup />}
				</Container>
			</section>
		)
 }

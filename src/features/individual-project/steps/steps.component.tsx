import { memo } from 'react'
import { createT, type TranslationsRecord } from '@/i18n/create-t'

import classes from './steps.module.scss'
import { StepInfo, steps } from '@/constants/steps'

type Props = {
	translations: TranslationsRecord
}

export const Steps = memo(function Steps({ translations }: Props) {
	const t = createT(translations)
	return (
		<div className={classes['steps']}>
			<h3 className={classes['steps__title']}>{t('individual.steps.title')}</h3>
			<div className={classes['steps__step-items']}>
				{steps.map((s, index) => createStep(s, index + 1, t))}
			</div>
		</div>
	)
})

const createStep = (step: StepInfo, stepNumber: number, t: (key: string) => string) => {
	return (
		<div className={classes['steps__step-item']} key={stepNumber}>
			<div className={classes['steps__step-number']}>{stepNumber}</div>
			<div className={classes['steps__step-title']}>{t(step.title)}</div>
			<div className={classes['steps__step-description']}>
				{t(step.description)}
			</div>
		</div>
	)
}

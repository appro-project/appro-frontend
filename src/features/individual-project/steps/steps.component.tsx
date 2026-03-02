import { memo } from 'react'
import { useT } from '@/contexts/translations-context'

import classes from './steps.module.scss'
import { StepInfo, steps } from '@/constants/steps'
import { TFunction } from 'i18next'

export const Steps = memo(function Steps() {
	const t = useT()
	return (
		<div className={classes['steps']}>
			<h3 className={classes['steps__title']}>{t('individual.steps.title')}</h3>
			<div className={classes['steps__step-items']}>
				{steps.map((s, index) => createStep(s, index + 1, t))}
			</div>
		</div>
	)
})

const createStep = (step: StepInfo, stepNumber: number, t: TFunction) => {
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

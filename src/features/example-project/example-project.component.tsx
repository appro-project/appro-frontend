'use client'
import { Container } from '@/containers/hoc/container/container'
import React from 'react'
import { createT, type TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'
import classes from './example-project.module.scss'
import ImageCarousel from './image-carousel/image-carousel.component'
import { plan1, plan2, plan3, plan4 } from './import-images'

type Props = {
	translations: TranslationsRecord
	lang: Locale
}

export const ExampleProject = ({ translations }: Props) => {
	const t = createT(translations);

	return (
		<div className={classes.exampleProject}>
			<Container>
				<div className={classes['example-project__header']}>
					<h1>{t('example-project.header')}</h1>
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>{t('example-project.section1_title')}</h2>
					</div>
					<ImageCarousel images={plan1} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>{t('example-project.section2_title')}</h2>
					</div>
					<ImageCarousel images={plan2} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>{t('example-project.section3_title')}</h2>
					</div>
					<ImageCarousel images={plan3} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>{t('example-project.section4_title')}</h2>
					</div>
					<ImageCarousel images={plan4} />
				</div>
			</Container>
		</div>
	)
}

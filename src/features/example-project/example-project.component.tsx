import { Container } from '@/containers/hoc/container/container'
import React from 'react'
import { useT } from '@/contexts/translations-context'
import classes from './example-project.module.scss'
import ImageCarousel from './image-carousel/image-carousel.component'
import { plan1, plan2, plan3, plan4 } from './import-images'

export const ExampleProject = () => {
	const t = useT();

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

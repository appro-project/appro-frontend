'use client'
import { Container } from '@/containers/hoc/container/container'
import classes from './principles.module.scss'
import { PrincipleItem } from './principle-item/principle-item.component'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getPrinciplesData } from '@/redux/selectors'

export const Principles = () => {
	const { t } = useTranslation()
	const principlesData = useSelector(getPrinciplesData)

	return (
		<section className={classes.principles}>
			<Container>
				<div className={classes.principles__container}>
					<div className={classes.principles__title}>
						{t('main.principles.title')}
					</div>

					<div className={classes.principles__body}>
						{principlesData.map((principle, index) => (
							<PrincipleItem key={index} principleItem={principle} />
						))}
					</div>
				</div>
			</Container>
		</section>
	)
}

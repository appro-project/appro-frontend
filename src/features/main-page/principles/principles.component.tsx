'use client'

import { Container } from '@/containers/hoc/container/container'
import classes from './principles.module.scss'
import { PrincipleItem } from './principle-item/principle-item.component'
import { useSelector } from 'react-redux'
import { getPrinciplesData } from '@/redux/selectors'
import type { PrinciplesTranslations } from '@/i18n/server'

type Props = {
	principlesTranslations: PrinciplesTranslations
}

export const Principles = ({ principlesTranslations }: Props) => {
	const principlesData = useSelector(getPrinciplesData)
	const { title, items } = principlesTranslations

	return (
		<section className={classes.principles}>
			<Container>
				<div className={classes.principles__container}>
					<div className={classes.principles__title}>{title}</div>

					<div className={classes.principles__body}>
						{principlesData.map((principle, index) => (
							<PrincipleItem
								key={index}
								title={items[index]?.title ?? ''}
								description={items[index]?.description ?? ''}
								backgroundUrl={principle.backgroundUrl}
							/>
						))}
					</div>
				</div>
			</Container>
		</section>
	)
}

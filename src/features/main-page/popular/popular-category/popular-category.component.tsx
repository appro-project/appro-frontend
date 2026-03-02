import classes from './popular-category.module.scss'
import { Overlay } from '@/components/ui/overlay/overlay.component'
import { PopularCategoryData } from '@/entity/PopularCategoryData/popular-category-data'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import Link from 'next/link'
import Image from 'next/image'
import { localePath, type Locale } from '@/i18n/locales'

interface Props {
	categoryData: PopularCategoryData
	translations: TranslationsRecord
	lang: Locale
}

export const PopularCategory = ({ categoryData, translations, lang }: Props) => {
	const t = createT(translations)

	return (
		<Link
			href={localePath(categoryData.link || '/', lang)}
			className={classes['popular-category']}
		>
			<div className={classes['popular-category__body']}>
				<div className={classes['popular-category__img-wrapper']}>
					<Image src={categoryData.image} alt='' />
					<Overlay />
				</div>
				<div className={classes['popular-category__title']}>
					{t(categoryData.title)}
				</div>
			</div>
		</Link>
	)
}

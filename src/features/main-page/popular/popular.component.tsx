"use client";
import { Container } from '@/containers/hoc/container/container'
import { PopularCategory } from './popular-category/popular-category.component'
import classes from './popular.module.scss'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'
import { useSelector } from 'react-redux'
import { getPopularCategories } from '@/redux/selectors'

type PopularProps = {
	translations: TranslationsRecord
	lang: Locale
}

export const Popular = ({ translations, lang }: PopularProps) => {
	const t = createT(translations)
	const popularCategories = useSelector(getPopularCategories)

	return (
		<section id={'popular-category'} className={classes['popularCategories']}>
			<Container>
				<div className={classes['popular-categories__container']}>
					<div className={classes['popular-categories__title']}>
						{t('main.popular_categories.title')}
					</div>

					<div className={classes['popular-categories__items']}>
						{popularCategories.map((category, index) => (
							<PopularCategory categoryData={category} key={index} translations={translations} lang={lang} />
						))}
					</div>
				</div>
			</Container>
		</section>
	)
}

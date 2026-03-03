import { useEffect } from 'react'
import classes from './filter-list.module.scss'
import {
	FilterType,
	RangeOption,
	SingleOption
} from '@/constants/filter-data/catalogue-filter-info'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getSearchUri } from '@/services/data'
import { RangeFilterBlock } from './range-filter/range-filter-block'
import { CheckboxFilterBlock } from './checkbox-filter/checkbox-filter-block'
import { getValidRangeSearchParam } from '@/services/util'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'

interface SearchOption {
	id: string
	type: FilterType
	value: string | RangeOption
}

interface StateProps {
	applyFilter(searchParams: URLSearchParams): void
	closeDrawer?: () => void
	translations: TranslationsRecord
	lang: Locale
}

export const FilterList = ({ applyFilter, closeDrawer, translations, lang }: StateProps) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()

	const urlFilters = new URLSearchParams(searchParams.toString())

	useEffect(() => {
		applyFilter(urlFilters)
	}, [])

	const getUri = (searchOption: SearchOption, isChecked: boolean) => {
		const currentSearchParams = new URLSearchParams(searchParams)

		return getSearchUri(searchOption, isChecked, currentSearchParams)
	}

	const singleOptionClicked = (
		filterId: string,
		filterType: FilterType,
		option: SingleOption
	) => {
		const searchUri = getUri(
			{
				id: filterId,
				value: option.id,
				type: filterType
			},
			option.isSelected
		)

		searchUri.set('page', '1')
		router.push(`${pathname}?${searchUri.toString()}`)
		applyFilter(searchUri)
	}

	const rangeOptionClicked = (filterId: string, option: RangeOption) => {
		const search = getUri(
			{
				id: filterId,
				value: option,
				type: FilterType.RANGE
			},
			true
		)

		search.set('page', '1')
		router.push(`${pathname}?${search.toString()}`)

		applyFilter(search)
	}

	// todo: ids to enum!
	const floorInitFilter = urlFilters.get('floor')
	const bedroomInitFilter = urlFilters.get('bedroom')
	const styleInitFilter = urlFilters.get('style')

	const garageInitFilter = urlFilters.get('garage')

	const areaInitRange = getValidRangeSearchParam(urlFilters.get('area'))
	const projectPriceInitRange = getValidRangeSearchParam(
		urlFilters.get('projectPrice')
	)
	const buildingPriceInitRange = getValidRangeSearchParam(
		urlFilters.get('buildingPrice')
	)

	return (
		<div>
			<div className={classes['filters-list__items']}>
				<div className={classes['filters__close']} onClick={closeDrawer} />
				<RangeFilterBlock
					filterId={'area'}
					initialRange={areaInitRange ? areaInitRange : undefined}
					applyFilter={option => rangeOptionClicked('area', option)}
					translations={translations}
					lang={lang}
				/>
				<CheckboxFilterBlock
					filterId={'floor'}
					initialOptions={
						floorInitFilter ? floorInitFilter.split(',') : undefined
					}
					applyFilter={option =>
						singleOptionClicked('floor', FilterType.CHECKBOX, option)
					}
					translations={translations}
					lang={lang}
				/>
				<CheckboxFilterBlock
					filterId={'bedroom'}
					initialOptions={
						bedroomInitFilter ? bedroomInitFilter.split(',') : undefined
					}
					applyFilter={option =>
						singleOptionClicked('bedroom', FilterType.CHECKBOX, option)
					}
					translations={translations}
					lang={lang}
				/>
				<CheckboxFilterBlock
					filterId={'garage'}
					initialOptions={garageInitFilter ? [garageInitFilter] : undefined}
					applyFilter={option =>
						singleOptionClicked('garage', FilterType.CHECKBOX, option)
					}
					translations={translations}
					lang={lang}
				/>
				<RangeFilterBlock
					filterId={'projectPrice'}
					initialRange={
						projectPriceInitRange ? projectPriceInitRange : undefined
					}
					applyFilter={option => rangeOptionClicked('projectPrice', option)}
					translations={translations}
					lang={lang}
				/>

				<RangeFilterBlock
					filterId={'buildingPrice'}
					initialRange={
						buildingPriceInitRange ? buildingPriceInitRange : undefined
					}
					applyFilter={option => rangeOptionClicked('buildingPrice', option)}
					translations={translations}
					lang={lang}
				/>

				<CheckboxFilterBlock
					filterId={'style'}
					initialOptions={
						styleInitFilter ? styleInitFilter.split(',') : undefined
					}
					applyFilter={option =>
						singleOptionClicked('style', FilterType.CHECKBOX, option)
					}
					translations={translations}
					lang={lang}
				/>
			</div>
		</div>
	)
}

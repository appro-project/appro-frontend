import React, { useState } from 'react'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'
import {
	SortDetails,
	SortDirection
} from '@/constants/sort-data/catalogue-sort-info'
import { getSortUri } from '@/services/data'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import classes from './catalogue-header.module.scss'

interface StateProps {
	count: number
	sortDetails?: SortDetails
	applySort(search: URLSearchParams): void
	translations: TranslationsRecord
	lang: Locale
}

export const CatalogueHeader = ({
	count,
	sortDetails,
	applySort,
	translations,
	lang
}: StateProps) => {
	const t = createT(translations)
	const [rotatedItems, setRotatedItems] = useState<{ [key: string]: boolean }>({})
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()

	const toggleRotation = (sortInfoId: string) => {
		setRotatedItems(prev => ({
			...prev,
			[sortInfoId]: !prev[sortInfoId]
		}))

		handleSort(
			sortInfoId,
			rotatedItems[sortInfoId] ? SortDirection.ASC : SortDirection.DESC
		)
	}

	const handleSort = (id: string, direction: SortDirection) => {
		const currentSearchParams = new URLSearchParams(searchParams)
		const currentSearch = currentSearchParams.get(id)

		// If there's an active sort param, remove it before setting a new one
		if (!currentSearch && sortDetails) {
			currentSearchParams.delete(sortDetails.id)
		}

		const searchUri = getSortUri(id, direction, currentSearchParams)
		// Reset to page 1 when sorting
		searchUri.set('page', '1')
		applySort(searchUri)

		router.push(`${pathname}?${decodeURIComponent(searchUri.toString())}`)
	}

	/**
	 * Arrow rotation classes
	 * (rotate-0 vs. rotate-90, etc.)
	 */
	const getIconClasses = (id: string) => {
		const isRotated = rotatedItems[id]
		// We rotate from 90 to 0 degrees, matching your SCSS logic
		// (transform: rotate(90deg) => is default, rotate(0deg) => rotated)
		return `text-[22px] transition-transform transform ${
			isRotated ? 'rotate-0' : 'rotate-90'
		}`
	}

	return (
		<div className='w-full'>
			{/*"Found" projects: Hidden for smaller screens (shown at xl and above)*/}
			<div className={classes.CatalogueHeader_Found}>
				{t('catalogue.found_projects')} {count}{' '}
			</div>

			{/* Sorting Block */}
			<div className={classes.CatalogueHeader_Sorting}>
				<span className={classes.CatalogueHeader_Sorting_Title}>
					{t('catalogue.sorting.title')}{' '}
				</span>

				<div className={classes.CatalogueHeader_Sorting_Wrapper}>
					<ul className={classes.CatalogueHeader_SortingItems}>
						{/* Area Sort */}
						<li className={classes.CatalogueHeader_SortingItem} onClick={() => toggleRotation('area_sort')}>
							{t('catalogue.sorting.area')}
							<ArrowOutwardIcon className={getIconClasses('area_sort')} />
						</li>

						{/* Price Sort */}
						<li className={classes.CatalogueHeader_SortingItem} onClick={() => toggleRotation('projectPrice_sort')}>
							{t('catalogue.sorting.price')}
							<ArrowOutwardIcon className={getIconClasses('projectPrice_sort')}/>
						</li>
					</ul>
				</div>
			</div>

			{/*Show "No projects found" only if count === 0. Visible on smaller screens (hidden at xl and above).*/}
			{count === 0 && (
				<div className={classes.found_no_projects}>
					{t('catalogue.found_no_projects')}
				</div>
			)}
		</div>
	)
}

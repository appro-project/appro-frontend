import { FC, memo, useState } from 'react'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'
import classes from './catalogue.module.scss'
import { Container } from '@/containers/hoc/container/container'
import { Breadcrumbs } from '@/components/ui/breadcrumbs/breadcrumbs'
import { FilterList } from '@/features/catalogue/filter-list/filter-list.component'
import { CatalogueHeader } from '@/features/catalogue/catalogue-header/catalogue-header.component'
import { ProjectList } from '@/features/catalogue/project-list/project-list.component'
import { Pagination } from '@/components/ui/pagination/pagination.component'
import { VisitedProjects } from '@/containers/visited-projects/visited-projects'
import { SortDetails } from '@/constants/sort-data/catalogue-sort-info'
import { Button } from '@/components/ui/button/button.component'
import { ProjectDto } from '@/api/model'
import { Box, Drawer } from '@mui/material'

interface PropsType {
	applyFilter: (searchParams: URLSearchParams) => void
	currentProjects: ProjectDto[]
	sortDetails: SortDetails | undefined
	applySort: (searchParams: URLSearchParams) => void
	currentProjectsPaged: ProjectDto[]
	currentPage: number
	projectsPerPage: number
	handlePageChange: (nextPage: number) => void
	translations: TranslationsRecord
	lang: Locale
}

const CatalogueItem: FC<PropsType> = memo(
	function CatalogueItem({
		applyFilter,
		currentProjects,
		sortDetails,
		applySort,
		currentProjectsPaged,
		currentPage,
		projectsPerPage,
		handlePageChange,
		translations,
		lang
	}) {
		const [openFilter, setOpenFilter] = useState(false)

		const t = createT(translations)

		return (
			<div className={classes.Catalogue}>
				<Container>
					<div className={classes.Catalogue_Breadcrumbs}>
						<Breadcrumbs
							items={[
								{ href: '/catalogue', label: t('header.catalogue_link') }
							]}
							translations={translations}
							lang={lang}
						/>
					</div>
					<div>
						<h1 className={classes['catalogue__title']}>
							{t('catalogue.title')}
						</h1>
					</div>
					<div className={classes['catalogue-main']}>
						<div className={classes['filter-wrapper']}>
							<div className={classes['filter-button']}>
								<Button
									actionHandler={() => setOpenFilter(true)}
									title={t('catalogue.filters.title')}
								/>
							</div>
							<Drawer open={openFilter} onClose={() => setOpenFilter(false)}>
								{openFilter && (
									<FilterList
										applyFilter={applyFilter}
										closeDrawer={() => setOpenFilter(false)}
										translations={translations}
										lang={lang}
									/>
								)}
							</Drawer>
							<Box sx={{ display: { xs: 'none', lg: 'block' } }}>
								<FilterList applyFilter={applyFilter} translations={translations} lang={lang} />
							</Box>
						</div>
						<div>
							<CatalogueHeader
								count={currentProjects.length}
								sortDetails={sortDetails}
								applySort={applySort}
								translations={translations}
								lang={lang}
							/>
							<ProjectList projects={currentProjectsPaged} translations={translations} lang={lang}/>
							<Pagination
								itemsLength={currentProjects.length}
								currentPage={currentPage}
								itemsPerPage={projectsPerPage}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>

					<VisitedProjects translations={translations} lang={lang} />
				</Container>
			</div>
		)
	}
)

export default CatalogueItem

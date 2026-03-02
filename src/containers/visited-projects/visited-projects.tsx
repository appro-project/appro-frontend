'use client'
import classes from './visited-projects.module.scss'
import { ProjectDetails } from '@/containers/project-details/project-details'
import { useGetAllProjects } from '@/api/use-get-all-projects'
import { ProjectDto } from '@/api/model'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'
import { FullSizeLoader } from '@/components/full-size-loader.component'

type VisitedProjectsProps = {
	translations: TranslationsRecord
	lang: Locale
}

export const VisitedProjects = ({ translations, lang }: VisitedProjectsProps) => {
	const { data: projects } = useGetAllProjects()
	const t = createT(translations)

	if (!projects) return <FullSizeLoader />

	return (
		<section>
			{projects && (
				<>
					<h2 className={classes['visited-projects__title']}>
						{t('individual.visited_projects.title')}
					</h2>

					<div className={classes['visited-projects__items']}>
						{projects
							.filter((x: ProjectDto, index: number) => index < 3)
							.map((project: ProjectDto, idx: number) => (
								<div
									className={classes.VisitedProjects_ProjectWrapper}
									key={idx}
								>
									<ProjectDetails projectData={project} translations={translations} lang={lang} />
								</div>
							))}
					</div>
				</>
			)}
		</section>
	)
}

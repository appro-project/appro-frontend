import classes from './project-list.module.scss'
import { ProjectDetails } from '@/containers/project-details/project-details'
import { memo } from 'react'
import { ProjectDto } from '@/api/model'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'

interface Props {
	projects: ProjectDto[]
	translations: TranslationsRecord
	lang: Locale
}
export const ProjectList = memo(function ProjectList({ projects, translations, lang }: Props) {
	return (
		<div className={classes['project-list__items']}>
			{projects.map((project: ProjectDto, idx: number) => (
				<ProjectDetails key={idx} projectData={project} translations={translations} lang={lang} />
			))}
		</div>
	)
})

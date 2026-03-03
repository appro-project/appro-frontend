import classes from './project-details.module.scss'
import { Button, ButtonType } from '@/components/ui/button/button.component'
import Link from 'next/link'

import { FC, memo } from 'react'
import { ProjectDto } from '@/api/model'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'
import { localePath } from '@/i18n/locales'

interface ProjectDetailsProps {
	projectData: ProjectDto
	translations: TranslationsRecord
	lang: Locale
}

export const ProjectDetails: FC<ProjectDetailsProps> = memo(
	function ProjectDetails({ projectData, translations, lang }) {
		const t = createT(translations)

		return (
			<Link
				href={localePath(`/catalogue/${projectData.id}`, lang)}
				className={classes['project-details']}
			>
				<div className={classes['project-details__content']}>
					<div className={classes['project-details__img']}>
						<img src={projectData.mainImage?.path} alt={projectData.id + ''} />
					</div>
					<div className={classes['project-details__info']}>
						{/*<span>{ projectData.title }</span>*/}
						<div className={classes['project-details__info-text']}>
							{projectData.title}
							<span>
								<br />
								{t('catalogue.project.name')}
							</span>
						</div>

						<div className={classes['project-details__info-text']}>
							{projectData.generalArea} м<sup>2</sup>
							<span>
								<br />
								{t('catalogue.project.area')}
							</span>
						</div>

						<div className={classes['project-details__info-text']}>
							{projectData.projectPrice} грн.
							<span>
								<br />
								{t('catalogue.project.price')}
							</span>
						</div>
						<div className={classes['project-details__details-button']}>
							<Button
								title={t('catalogue.project.more_details')}
								buttonType={ButtonType.SMALL}
							/>
						</div>
					</div>
				</div>
			</Link>
		)
	}
)

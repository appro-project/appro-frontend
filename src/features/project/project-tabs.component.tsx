import { useState } from 'react'
import { GeneralInfo } from '@/features/project/general-info/general-info.component'
import { ProjectLayout } from '@/features/project/project-layout/project-layout.component'
import { ProjectStructure } from '@/features/project/project-structure/project-structure.component'
import { Changes } from '@/features/project/changes/changes.component'
import { Additional } from '@/features/project/additional/additional.component'
import { VisitedProjects } from '@/containers/visited-projects/visited-projects'
import { IProjectTubsName, tubsArray } from '@/features/project/interfaces'
import classes from '@/components/ui/tabs/tabs.module.scss'
import { Tab } from '@/components/ui/tabs/tab/tab.component'
import { ProjectDto } from '@/api/model'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import { getDescription } from '@/utils/project-util'
import type { Locale } from '@/i18n/locales'

interface Props {
	project: ProjectDto
	translations: TranslationsRecord
	lang: Locale
}

export const ProjectTabs = ({ project, translations, lang }: Props) => {
	const [activeTab, setActiveTab] = useState<IProjectTubsName>(tubsArray[0])

	const onClickTabItem = (value: IProjectTubsName) => {
		setActiveTab(value)
	}

	const t = createT(translations)

	return (
		<>
			<div id='scroll-to-top' className={classes.Tabs}>
				<ol className={classes.TabsList}>
					{tubsArray
						.filter(
							element =>
								project.isFinished ||
								element !== IProjectTubsName.PROJECT_IN_PROGRESS
						)
						.map((element, index) => {
							return (
								<Tab
									activeTab={activeTab === element}
									key={index}
									label={t(element)}
									onClick={() => onClickTabItem(element)}
								/>
							)
						})}
				</ol>
				<div className='tab-content'>
					{activeTab === IProjectTubsName.All_ABOUT_PROJECT && (
						<>
							<GeneralInfo
								title={project.title}
								generalArea={project.generalArea}
								projectPrice={project.projectPrice}
								timeToCreate={project.timeToCreate}
								mainImage={project.mainImage?.path}
								images={project.images.map(image => image.path)}
								videoUrl={project.videoUrl}
								description={getDescription(project, lang)}
								translations={translations}
								lang={lang}
							/>
							<ProjectLayout project={project} translations={translations} lang={lang} />
							<ProjectStructure project={project} translations={translations} lang={lang} />
							<Changes project={project} translations={translations} lang={lang} />
							<Additional translations={translations} lang={lang} />
							{project.isFinished && (
								<GeneralInfo
									title={project.title}
									generalArea={project.generalArea}
									projectPrice={project.projectPrice}
									timeToCreate={project.timeToCreate}
									images={project.photos.map(image => image.path)}
									translations={translations}
									lang={lang}
								/>
							)}
						</>
					)}
					{activeTab === IProjectTubsName.LAYAOUT && (
						<ProjectLayout project={project} translations={translations} lang={lang} />
					)}
					{/*{activeTab === IProjectTubsName.SIMILAR_PROJECTS && <VisitedProjects />}*/}
					{activeTab === IProjectTubsName.ADDITIONAL_SERVICES && <Additional translations={translations} lang={lang} />}
					{activeTab === IProjectTubsName.COMPOSITION_OF_PROJECT && (
						<ProjectStructure project={project} translations={translations} lang={lang} />
					)}
					{activeTab === IProjectTubsName.ALTERNATIVE && (
						<Changes project={project} translations={translations} lang={lang} />
					)}
					{project.isFinished &&
						activeTab === IProjectTubsName.PROJECT_IN_PROGRESS && (
							<GeneralInfo
								title={project.title}
								generalArea={project.generalArea}
								projectPrice={project.projectPrice}
								timeToCreate={project.timeToCreate}
								images={project.photos.map(photo => photo.path)}
								translations={translations}
								lang={lang}
							/>
						)}
				</div>
				<VisitedProjects translations={translations} lang={lang} />
			</div>
		</>
	)
}

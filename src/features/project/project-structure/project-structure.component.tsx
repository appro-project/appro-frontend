import './project-structure.scss'

import sketch_image from '@/assets/img/project-page/sketch.svg'
import draw_image from '@/assets/img/project-page/draw.svg'
import { InfoCard } from '@/features/project/general-info/info-card.component'
import { ProjectDto } from '@/api/model'
import Image from 'next/image'
import Link from 'next/link'
import { createT, type TranslationsRecord } from '@/i18n/create-t'
import { localePath, type Locale } from '@/i18n/locales'

interface Props {
	project: ProjectDto
	translations: TranslationsRecord
	lang: Locale
}
export const ProjectStructure = ({ project, translations, lang }: Props) => {
	const t = createT(translations)

	return (
		<section className='project-section project-structure'>
			<h3 className='project-section__title project-structure__title'>
				{t('project.composition.title')}
			</h3>
			<div className='project-section__container'>
				<div>
					<div className='project-section__text'>
						<p>{t('project.composition.description1')}</p>
						<p>{t('project.composition.description2')}</p>
						<Link
							href={localePath('/example-project', lang)}
							className='project-structure__button yellow-button yellow-button_16'
						>
							{t('project.composition.view_project_button')}
						</Link>
					</div>
					<div className='project-structure__wrapper'>
						<div className='illustrated-list'>
							<div className='illustrated-list__top'>
								<div className='illustrated-list__img'>
									<Image src={sketch_image} alt='' width={60} height={60}/>
								</div>
								<div className='illustrated-list__title'>
									{t('project.architectural_section.title')}
								</div>
							</div>
							<ol className='illustrated-list__content'>
								<li>{t('project.architectural_section.item1')}</li>
								<li>{t('project.architectural_section.item2')}</li>
								<li>{t('project.architectural_section.item3')}</li>
								<li>{t('project.architectural_section.item4')}</li>
								<li>{t('project.architectural_section.item5')}</li>
								<li>{t('project.architectural_section.item6')}</li>
								<li>{t('project.architectural_section.item7')}</li>
								<li>{t('project.architectural_section.item8')}</li>
							</ol>
						</div>
						<div className='illustrated-list'>
							<div className='illustrated-list__top'>
								<div className='illustrated-list__img'>
									<Image src={draw_image} alt='' width={60} height={60}/>
								</div>
								<div className='illustrated-list__title'>
									{t('project.structural_section.title')}
								</div>
							</div>
							<ol className='illustrated-list__content'>
								<li>{t('project.structural_section.item1')}</li>
								<li>{t('project.structural_section.item2')}</li>
								<li>{t('project.structural_section.item3')}</li>
								<li>{t('project.structural_section.item4')}</li>
								<li>{t('project.structural_section.item5')}</li>
								<li>{t('project.structural_section.item6')}</li>
								<li>{t('project.structural_section.item7')}</li>
								<li>{t('project.structural_section.item8')}</li>
								<li>{t('project.structural_section.item9')}</li>
								<li>{t('project.structural_section.item10')}</li>
							</ol>
						</div>
					</div>
				</div>
				<InfoCard
					title={project.title}
					generalArea={project.generalArea}
					projectPrice={project.projectPrice}
					timeToCreate={project.timeToCreate}
					translations={translations}
				/>
			</div>
		</section>
	)
}

import { useTranslation } from 'react-i18next'
import './changes.scss'
import project_modification from '@/assets/img/project-page/project-modification.jpg'
import { Button, ButtonType } from '@/components/ui/button/button.component'
import { ProjectDto } from '@/api/model'
import { usePathname } from 'next/navigation'
import { siteHost } from '@/services/server-data/server-data'
import { useModalStore } from '@/modal/order-modal-container.store'
import Image from 'next/image'

interface IChangesProps {
	project: ProjectDto
}

export const Changes = ({ project }: IChangesProps) => {
	const { t } = useTranslation()

	const pathname = usePathname()
	const projectLink = siteHost + pathname

	const { openModal } = useModalStore()
	const handleOpenModal = () => {
		openModal(projectLink, t('modal.title_order'))
	}

	return (
		<section className='project-section project-modification'>
			<h3 className='project-section__title project-modification__title'>
				{t('catalogue.changes.title')}
			</h3>
			<div className='project-section__text'>
				<p>{t('catalogue.changes.description1')}</p>
				<p>{t('catalogue.changes.description2')}</p>
				<div className='project-modification__wrapper'>
					<div className='project-modification__img'>
						<Image src={project_modification} alt='' width={730} height={520} />
					</div>
					<div className='project-modification__info'>
						<div className='project-modification__info-title'>
							{t('catalogue.changes.list.title')}
						</div>
						<ul className='project-modification__info-list'>
							<li>{t('catalogue.changes.list.item1')}</li>
							<li>{t('catalogue.changes.list.item2')}</li>
							<li>{t('catalogue.changes.list.item3')}</li>
							<li>{t('catalogue.changes.list.item4')}</li>
							<li>{t('catalogue.changes.list.item5')}</li>
							<li>{t('catalogue.changes.list.item6')}</li>
							<li>{t('catalogue.changes.list.item7')}</li>
							<li>{t('catalogue.changes.list.item8')}</li>
							<li>{t('catalogue.changes.list.item9')}</li>
						</ul>
					</div>
				</div>
				<p>{t('catalogue.changes.price_info')}</p>
				<p>
					<a href='tel:+380502684926'>+38 (050) 268 49 26</a>
					<br />
					<a href='tel:+380952684926'>+38 (095) 268 49 26</a>
				</p>
				<p>{t('catalogue.changes.contact_info')}</p>
				<Button
					buttonType={ButtonType.BIG}
					title={t('catalogue.changes.button_title')}
					actionHandler={handleOpenModal}
				/>
			</div>
		</section>
	)
}

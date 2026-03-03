'use client'
import { createT, type TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'
import Image from 'next/image'

import { Container } from '@/containers/hoc/container/container'
import about_main_1 from '@/assets/img/about-us/about-main-1.jpg'
import about_main_2 from '@/assets/img/about-us/about-main-2.jpg'
import member_1 from '@/assets/img/about-us/member-1.jpg'
import member_2 from '@/assets/img/about-us/member-2.jpg'
import './about-us.scss'
import '@/features/project/project-structure/project-structure.scss'

type Props = {
	translations: TranslationsRecord
	lang: Locale
}

export const AboutUs = ({ translations }: Props) => {
	const t = createT(translations)

	return (
		<div>
			<Container>
				<section className='project-section about-main'>
					<h3 className='project-section__title about-main__title'>
						{t('about_us.title')}
					</h3>
					<div className='project-section__wrapper'>
						<div className='about-main__left'>
							<div className='about-main__image-container'>
								<Image
									src={about_main_1}
									alt=''
									className='about-main__image-container__image'
								/>
							</div>
							<div className='about-main__image-container about-main__image_certificate'>
								<Image
									src={about_main_2}
									alt=''
									className='about-main__image-container_certificate__image'
								/>
							</div>
						</div>
						<div className='about-main__right'>
							<div className='about-main__info'>
								<p>{t('about_us.paragraph1')}</p>
								<p>{t('about_us.paragraph2')}</p>
								<p>{t('about_us.paragraph3')}</p>
							</div>
						</div>
					</div>
				</section>

				<section className='project-section about-team'>
					<h3 className='project-section__title about-team__title'>
						{t('about_us.team.title')}
					</h3>
					<div className='about-team__list'>
						<div className='team-member'>
							<div className='team-member__image-container'>
								<Image
									src={member_1}
									alt=''
									className='team-member__image-container__image'
								/>
							</div>
							<div className='team-member__name'>
								{t('about_us.team.member1.name')}
							</div>
							<div className='team-member__position'>
								{t('about_us.team.member1.position')}
							</div>
							<div className='team-member__description'>
								{t('about_us.team.member1.description')}
							</div>
						</div>
						<div className='team-member'>
							<div className='team-member__image-container'>
								<Image
									src={member_2}
									alt=''
									className='team-member__image-container__image'
								/>
							</div>
							<div className='team-member__name'>
								{t('about_us.team.member2.name')}
							</div>
							<div className='team-member__position'>
								{t('about_us.team.member2.position')}
							</div>
							<div className='team-member__description'>
								{t('about_us.team.member2.description')}
							</div>
						</div>
					</div>
				</section>
			</Container>
		</div>
	)
}

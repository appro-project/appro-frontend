import classes from './general-info.module.scss'
import { ImageCarousel } from '@/features/project/image-carousel/image-carousel.component'
import { InfoCard, InfoCardProps } from '@/features/project/general-info/info-card.component'
import { FC } from 'react'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'

interface GeneralInfoProps extends InfoCardProps {
	mainImage?: string
	images: string[]
	videoUrl?: string
	description?: string
	translations: TranslationsRecord
	lang: Locale
}

export const GeneralInfo: FC<GeneralInfoProps> = ({
	mainImage,
	images,
	videoUrl,
	description,
	title,
	generalArea,
	timeToCreate,
	projectPrice,
	translations,
	lang
}) => {
	const t = createT(translations)

	return (
		<section>
			<div className={classes.GeneralInfo_Wrapper}>
				<div className={classes.GeneralInfo_Images}>
					<ImageCarousel
						mainImage={mainImage}
						images={images}
						videoUrl={videoUrl}
					/>
				</div>
				<InfoCard
					title={title}
					generalArea={generalArea}
					timeToCreate={timeToCreate}
					projectPrice={projectPrice}
					translations={translations}
					lang={lang}
				/>
			</div>
			{description && (
				<>
					<p className={classes.GeneralInfo_Text}>
						{t('project.composition.description1')}
					</p>
					<p className={classes.GeneralInfo_Text}>{description}</p>
				</>
			)}
		</section>
	)
}

export default GeneralInfo

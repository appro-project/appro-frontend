import classes from './principle-item.module.scss'
import type { StaticImageData } from 'next/image'

interface Props {
	title: string
	description: string
	backgroundUrl: StaticImageData
}

export const PrincipleItem = ({ title, description, backgroundUrl }: Props) => {
	const backgroundStyles = {
		backgroundImage: `url(${backgroundUrl.src})`,
		backgroundPosition: 'center center',
		backgroundSize: 'cover'
	}

	return (
		<div className={classes.principle} style={backgroundStyles}>
			<div className={classes.principle__body}>
				<div className={classes.principle__title}>{title}</div>
				<div className={classes.principle__description}>{description}</div>
			</div>
		</div>
	)
}

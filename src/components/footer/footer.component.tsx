'use client'
import { Container } from '@/containers/hoc/container/container'

import { useTranslation } from 'react-i18next'

import Logo from '@/assets/img/logo.svg'
import { contactInfo, MenuLinkInfo, menuLinks } from '@/constants'

import classes from './footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
	const { t } = useTranslation()
	return (
		<footer className={classes.footer}>
			<Container>
				<div className={classes.footer__container}>
					<div className={classes.footer__logo}>
						<Image src={Logo} alt='logo' className={classes['footer__logo-img']} />
						<div className={classes['footer__logo-slogan']}>
							{t('footer.slogan')}
						</div>
					</div>

					<nav className={classes.footer__nav}>
						<ul className={classes['footer__menu-list']}>
							{menuLinks.map((link, index) => (
								<MenuItem key={index} name={t(link.name)} path={link.path} />
							))}
						</ul>
					</nav>
					<div className={classes.footer__address}>
						<div className={classes['footer__address-item']}>
							{t(contactInfo.address)}
						</div>
						<div className={classes['footer__address-item']}>
							<a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
						</div>
						<div className={classes['footer__address-item']}>
							{t(contactInfo.copyright)}
						</div>
					</div>
				</div>
			</Container>
		</footer>
	)
}

// TODO: How can we pass object here?
const MenuItem = (props: MenuLinkInfo) => {
	return (
		<li>
			<Link href={props.path} className={classes['footer__menu-link']}>
				{props.name}
			</Link>
		</li>
	)
}

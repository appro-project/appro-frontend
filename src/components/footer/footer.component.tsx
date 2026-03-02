'use client'
import { Container } from '@/containers/hoc/container/container'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import Logo from '@/assets/img/logo.svg'
import { contactInfo, menuLinks } from '@/constants'
import classes from './footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/locales'

type FooterProps = {
	translations: TranslationsRecord
	lang: Locale
}

export const Footer = ({ translations, lang }: FooterProps) => {
	const t = createT(translations)
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
								<MenuItem key={index} name={t(link.name)} href={localePath(link.path, lang)} />
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

const MenuItem = ({ name, href }: { name: string; href: string }) => (
	<li>
		<Link href={href} className={classes['footer__menu-link']}>
			{name}
		</Link>
	</li>
)

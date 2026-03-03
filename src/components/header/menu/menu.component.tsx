'use client'
import classes from './menu.module.scss'
import Logo from '@/assets/img/logo.svg'
import { contactInfo, menuLinks } from '@/constants'
import Link from 'next/link'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import Image from 'next/image'
import { localePath, type Locale } from '@/i18n/locales'

interface Props {
	isOpened: boolean
	closeMenu(): void
	translations: TranslationsRecord
	lang: Locale
}

export const Menu = (props: Props) => {
	const menuClasses: string[] = [classes['menu']]
	if (props.isOpened) {
		menuClasses.push(classes['active'])
	}
	const t = createT(props.translations)
	const lang = props.lang
	return (
		<div className={menuClasses.join(' ')}>
			<div className={classes['menu__header']}>
				<Link href={localePath('/', lang)} className={classes['menu__logo']}>
					<Image src={Logo} alt='logo' />
				</Link>
				<div className={classes['menu__close']} onClick={props.closeMenu} />
			</div>
			<nav className={classes['menu__body']}>
				<ul className={classes['menu__list']}>
					{menuLinks.map((link, index) => (
						<div onClick={props.closeMenu} key={'menu-' + index}>
							<MenuItem name={t(link.name)} href={localePath(link.path, lang)} />
						</div>
					))}
				</ul>
			</nav>

			<div className={classes['menu__footer']}>
				<div className={classes['menu__footer-item']}>
					{t(contactInfo.address)}
				</div>
				<div className={classes['menu__footer-item']}>
					<a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
				</div>
				<div className={classes['menu__footer-item']}>
					{t(contactInfo.copyright)}
				</div>
			</div>
		</div>
	)
}

const MenuItem = ({ name, href }: { name: string; href: string }) => (
	<li>
		<Link href={href} className={classes['menu__link']}>
			{name}
		</Link>
	</li>
)

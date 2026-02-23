'use client'
import { useState } from 'react'
import Logo from '@/assets/img/logo.svg'
import classes from './header.module.scss'
import { Container } from '@/containers/hoc/container/container'
import { ButtonType, Button } from '@/components/ui/button/button.component'
import MenuIcon from '@/components/header/menu-icon/menu-icon.component'
import { Menu } from './menu/menu.component'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './language-switcher.component'
import { useModalStore } from '@/modal/order-modal-container.store'
import Image from 'next/image'

export const Header = () => {
	const [isOpened, setIsOpened] = useState(false)
	const pathname = usePathname()
	const { t } = useTranslation()

	const headerClasses = [classes['header']]
	// if main page header should be transparent

	if ('/' === pathname) {
		headerClasses.push(classes['header--transparent'])
	}

	const { openModal } = useModalStore()
	const handleOpenModal = () => {
        //TODO: fix type
		openModal('', t('modal.title_contact'))
	}

	return (
		<header className={headerClasses.join(' ')}>
			<Container>
				<div className={classes['header__container']}>
					<div className={classes['header__top']}>
						<Link href={'/'} className={createHeaderTopItemClass('header__logo')}>
							<Image src={Logo} alt='logo' className={classes['header__logo-img']} />
						</Link>

						<a
							className={createHeaderTopItemClass('header__top-item-phone')}
							href='tel:+38 (050) 26-84-926'
						>
							+38 (050) 26-84-926
						</a>

						<LanguageSwitcher
							style={createHeaderTopItemClass('header__top-item-lang')}
						/>

						<div
							className={createHeaderTopItemClass('header__top-item-contact')}
						>
							<Button
								title={t('header.feedback_button')}
								actionHandler={handleOpenModal}
								buttonType={ButtonType.TRANSPARENT}
							/>
						</div>
						<div
							className={createHeaderTopItemClass('header__top-item-menu')}
							onClick={() => setIsOpened(true)}
						>
							<MenuIcon />
						</div>
					</div>

					<Menu isOpened={isOpened} closeMenu={() => setIsOpened(false)} />
				</div>
			</Container>
		</header>
	)
}

function createHeaderTopItemClass(additionalClass: string) {
	const basicClass: string = classes['header__top-item']

	return [basicClass, classes[additionalClass]].join(' ')
}

'use client'

import { FC, ReactNode } from 'react'
import Link from 'next/link'
import classes from './breadcrumbs.module.scss'
import arrow from '@/assets/img/breadcrumbs/arrow.svg'
import Image from 'next/image'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import { localePath, type Locale } from '@/i18n/locales'

interface Crumb {
	href: string
	label: ReactNode
}

interface BreadcrumbsProps {
	items?: Crumb[]
	translations: TranslationsRecord
	lang: Locale
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items = [], translations, lang }) => {
	const t = createT(translations)

	return (
		<div className={classes.Breadcrumbs}>
            <div className="flex items-center gap-1">
                <Link href={localePath('/', lang)}>{t('header.main_link')}</Link>
                <Image src={arrow} alt='arrow' />
            </div>
			{items.map((crumb, idx) => (
				<div key={idx} className="flex items-center gap-1">
					<Link href={localePath(crumb.href, lang)}>{crumb.label}</Link>
					<Image src={arrow} alt='arrow' />
				</div>
			))}
		</div>
	)
}

'use client'
import { createT } from '@/i18n/create-t'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'
import classes from './individual-project.module.scss'
import { Container } from '@/containers/hoc/container/container'
import { Differences } from './differences/differences.component'
import { Steps } from './steps/steps.component'
import { Order } from './order/order.component'
import { VisitedProjects } from '@/containers/visited-projects/visited-projects'
import { Breadcrumbs } from '@/components/ui/breadcrumbs/breadcrumbs'

type IndividualProjectProps = {
	translations: TranslationsRecord
	lang: Locale
}

export const IndividualProject = ({ translations, lang }: IndividualProjectProps) => {
	const t = createT(translations);

	return (
		<div className={classes.IndividualProject}>
			<Container>
				<div className={classes.IndividualProject_Breadcrumbs}>
					<Breadcrumbs items={[{ href: '/individual-project', label: t('header.individual_project_link') }]} translations={translations} lang={lang} />
				</div>
				<div className={classes['individual-project__header']}>
					{t('individual.title')}
				</div>
				<p className={classes['individual-project__description']}>
					{t('individual.description')}
				</p>

				<div className={classes['individual-project__differences-wrapper']}>
					<Differences translations={translations} />
				</div>

				<p className={classes['individual-project__description']}>
					{t('individual.paragraph1')}
				</p>
				<p className={classes['individual-project__description']}>
					{t('individual.paragraph2')}
				</p>
				<p className={classes['individual-project__description']}>
					{t('individual.paragraph3')}
				</p>

				<div className={classes['individual-project__steps-wrapper']}>
					<Steps translations={translations} />
				</div>

				<div className={classes['individual-project__order-wrapper']}>
					<Order translations={translations} />
				</div>
			</Container>
            
			{/* Kind of page Footer, should be out of container */}
			<div className={classes['individual-project__visited-wrapper']}>
				<Container>
					<VisitedProjects translations={translations} lang={lang} />
				</Container>
			</div>
		</div>
	)
}

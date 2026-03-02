import { IndividualProject } from '@/features/individual-project/individual-project.component'
import { getAppTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'

type Props = {
	params: Promise<{ lang: string }>
}

export default async function LangIndividualProjectPage({ params }: Props) {
	const { lang: langParam } = await params
	const lang = langParam === 'ru' ? 'ru' : DEFAULT_LOCALE
	const translations = getAppTranslations(lang)
	return <IndividualProject translations={translations} lang={lang} />
}

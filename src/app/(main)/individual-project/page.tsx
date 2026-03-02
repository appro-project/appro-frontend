import { IndividualProject } from '@/features/individual-project/individual-project.component'
import { getAppTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'

export default function IndividualProjectPage() {
	const lang = DEFAULT_LOCALE
	const translations = getAppTranslations(lang)
	return <IndividualProject translations={translations} lang={lang} />
}

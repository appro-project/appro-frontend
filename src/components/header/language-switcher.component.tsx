import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { localePath, pathWithoutLang, type Locale } from '@/i18n/locales'

const languages: Record<Locale, string> = {
	ru: 'RU',
	ua: 'UA'
}

interface LanguageSwitcherProps {
	style?: string
	lang: Locale
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ style, lang }) => {
	const pathname = usePathname()
	const router = useRouter()

	const changeLanguage = (event: SelectChangeEvent<string>) => {
		const newLocale = event.target.value as Locale
		const path = pathWithoutLang(pathname)
		router.push(localePath(path, newLocale))
	}

	return (
		<Select
			labelId='language-select-label'
			id='language-select'
			value={lang}
			onChange={changeLanguage}
			IconComponent={() => null}
			sx={{
				'& > fieldset': { border: 'none' },
				'& .MuiSelect-select': { padding: 0 + ' !important' }
			}}
			MenuProps={{
				disableScrollLock: true
			}}
			classes={{ root: style }}
		>
			{(Object.keys(languages) as Locale[]).map((lng) => (
				<MenuItem key={lng} value={lng}>
					{languages[lng]}
				</MenuItem>
			))}
		</Select>
	)
}

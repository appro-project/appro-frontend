import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { TextField } from '@mui/material'
import { createT, type TranslationsRecord } from '@/i18n/create-t'

interface Props {
	title: string
	label?: string
	value: string
	options: ReadonlyArray<string>
	required?: boolean
	disabled?: boolean
	translations: TranslationsRecord

	handleProperty(event: React.ChangeEvent<HTMLInputElement>): void
}

const getSelectOptions = (
	options: ReadonlyArray<string>,
	label: string,
	t: (key: string) => string
) => {
	const renderOptions = [] as React.ReactElement[]
	options.forEach((option: string | number, idx: number) =>
		renderOptions.push(
			<MenuItem key={`${option}${idx}`} value={option}>
				{t(`options.${label}.${option}`)}
			</MenuItem>
		)
	)

	return renderOptions
}

const SelectProperty = ({
	title,
	value,
	required,
	disabled,
	options,
	label,
	translations,
	handleProperty
}: Props) => {
	const t = createT(translations)

	return (
		<TextField
			required={required}
			disabled={disabled}
			fullWidth
			variant={'outlined'}
			label={title}
			value={value}
			select
			onChange={handleProperty}
		>
			{getSelectOptions(options, label!, t)}
		</TextField>
	)
}

export default SelectProperty

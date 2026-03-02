import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { TextField } from '@mui/material'
import { useT } from '@/contexts/translations-context'
import { TFunction } from 'i18next'

interface Props {
	title: string
	label?: string
	value: string
	options: ReadonlyArray<string>
	required?: boolean
	disabled?: boolean

	handleProperty(event: React.ChangeEvent<HTMLInputElement>): void
}

const getSelectOptions = (
	options: ReadonlyArray<string>,
	label: string,
	t: TFunction
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
	handleProperty
}: Props) => {
	const t = useT()

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

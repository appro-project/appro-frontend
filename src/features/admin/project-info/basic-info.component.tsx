import Grid from '@mui/material/Grid'
import { TextField } from '@mui/material'
import TextProperty from '@/features/admin/view-add-edit-project/text-property'
import NumericProperty from '@/features/admin/view-add-edit-project/numeric-property'
import CheckProperty from '@/features/admin/view-add-edit-project/check-property'
import SelectProperty from '@/features/admin/view-add-edit-project/select-property'
import React, { FC } from 'react'
import { ProjectProps } from './model'
import { styleOptions } from '@/api/model'

export const BasicInfo: FC<ProjectProps> = ({ projectDto, dispatch, mode, translations }) => {
	const view = mode === 'view'

	return (
		<Grid size={{ xs: 12 }} container spacing={5} columns={{xs: 2, sm: 4, md: 8, lg: 12}}>
			<Grid size={{ xs: 6, md: 12, lg: 6 }}>
				<TextProperty
					title={'Название проекта'}
					value={projectDto.title}
					handleProperty={e =>
						dispatch({ type: 'title', payload: e.target.value })
					}
					required={true}
					disabled={view}
				/>
			</Grid>

			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<CheckProperty
					title={'На главной'}
					checked={projectDto.showOnMain}
					disabled={view}
					handleProperty={checked =>
						dispatch({ type: 'showOnMain', payload: checked })
					}
				/>
			</Grid>

			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<CheckProperty
					title={'Законченный'}
					checked={projectDto.isFinished}
					disabled={view}
					handleProperty={checked =>
						dispatch({ type: 'isFinished', payload: checked })
					}
				/>
			</Grid>

			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<NumericProperty
					title={'Подготовка проекта, дн'}
					value={projectDto.timeToCreate}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'timeToCreate', payload: e.target.value })
					}
				/>
			</Grid>

			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<SelectProperty
					title={'Стиль'}
					label='style'
					value={projectDto.style}
					options={styleOptions}
					required={true}
					disabled={view}
					translations={translations}
					handleProperty={e =>
						dispatch({ type: 'style', payload: e.target.value })
					}
				/>
			</Grid>

			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<NumericProperty
					title={'Общая площадь проекта, кв.м.'}
					value={projectDto.generalArea}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'generalArea', payload: e.target.value })
					}
				/>
			</Grid>

			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<NumericProperty
					title={'Цена проекта, грн'}
					value={projectDto.projectPrice}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'projectPrice', payload: e.target.value })
					}
				/>
			</Grid>

			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<NumericProperty
					title={'Цена строительства, грн'}
					value={projectDto.buildingPrice}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'buildingPrice', payload: e.target.value })
					}
				/>
			</Grid>

			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<TextField
					label={'Описание (ru)'}
					name={'Описание (ru)'}
					value={projectDto.descriptionRU}
					onChange={e =>
						dispatch({ type: 'descriptionRU', payload: e.target.value })
					}
					required={true}
					disabled={view}
					variant={'outlined'}
					fullWidth
					multiline={true}
				/>
			</Grid>
			
			<Grid size={{ xs: 6, md: 4, lg: 3 }}>
				<TextField
					label={'Описание (ua)'}
					name={'Описание (ua)'}
					value={projectDto.descriptionUA}
					onChange={e =>
						dispatch({ type: 'descriptionUA', payload: e.target.value })
					}
					required={true}
					disabled={view}
					variant={'outlined'}
					fullWidth
					multiline={true}
				/>
			</Grid>
		</Grid>
	)
}

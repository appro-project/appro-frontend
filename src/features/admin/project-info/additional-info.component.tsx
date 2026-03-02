import { FC } from 'react'
import { ProjectProps } from './model'
import Grid from '@mui/material/Grid'
import NumericProperty from '@/features/admin/view-add-edit-project/numeric-property'
import CheckProperty from '@/features/admin/view-add-edit-project/check-property'
import SelectProperty from '@/features/admin/view-add-edit-project/select-property'
import InputLabel from '@mui/material/InputLabel'
import {
	ceilingOptions,
	foundationOptions,
	insulationOptions,
	roofOptions,
	wallMaterialOptions
} from '@/api/model'
import TextProperty from '@/features/admin/view-add-edit-project/text-property'

export const AdditionalInfo: FC<ProjectProps> = ({
	projectDto,
	dispatch,
	mode,
	translations
}) => {
	const view = mode === 'view';
	return (
		<Grid container spacing={2} columns={{xs: 4, sm: 6, md: 8, lg: 12}}>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<NumericProperty
					title={'Жилая площадь, кв.м.'}
					value={projectDto.livingArea}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'livingArea', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<NumericProperty
					title={'Площадь застройки, кв.м.'}
					value={projectDto.buildingArea}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'buildingArea', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<NumericProperty
					title={'Площадь терассы, кв.м.'}
					value={projectDto.terraceArea}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'terraceArea', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<SelectProperty
					title={'Фундамент'}
					label={'foundation'}
					value={projectDto.foundation}
					options={foundationOptions}
					required={true}
					disabled={view}
					translations={translations}
					handleProperty={e =>
						dispatch({ type: 'foundation', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<SelectProperty
					title={'Перекрытия'}
					label={'ceiling'}
					value={projectDto.ceiling}
					options={ceilingOptions}
					required={true}
					disabled={view}
					translations={translations}
					handleProperty={e =>
						dispatch({ type: 'ceiling', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<SelectProperty
					title={'Кровля'}
					label={'roof'}
					value={projectDto.roof}
					options={roofOptions}
					required={true}
					disabled={view}
					translations={translations}
					handleProperty={e =>
						dispatch({ type: 'roof', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<NumericProperty
					title={'Количество спален'}
					value={projectDto.bedroomCount}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'bedroomCount', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<SelectProperty
					title={'Материал стен'}
					label={'wall-material'}
					value={projectDto.wallMaterial}
					options={wallMaterialOptions}
					required={true}
					disabled={view}
					translations={translations}
					handleProperty={e =>
						dispatch({ type: 'wallMaterial', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<NumericProperty
					title={'Толщина стен, мм'}
					value={projectDto.wallThickness}
					required={true}
					disabled={view}
					handleProperty={event =>
						dispatch({ type: 'wallThickness', payload: event.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<SelectProperty
					title={'Материал утеплителя'}
					label={'insulation'}
					value={projectDto.insulation}
					options={insulationOptions}
					required={true}
					disabled={view}
					translations={translations}
					handleProperty={e =>
						dispatch({ type: 'insulation', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<NumericProperty
					title={'Толщина утеплителя, мм'}
					value={projectDto.insulationThickness}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'insulationThickness', payload: e.target.value })
					}
				/>
			</Grid>

			<Grid size={{ xs: 12 }}>
				<InputLabel>Габариты застройки</InputLabel>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<NumericProperty
					title={'длина, м'}
					value={projectDto.length}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'length', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<NumericProperty
					title={'ширина, м'}
					value={projectDto.width}
					required={true}
					disabled={view}
					handleProperty={e =>
						dispatch({ type: 'width', payload: e.target.value })
					}
				/>
			</Grid>
			<Grid size={{ xs: 4, sm: 3, md: 4, lg: 2.4 }}>
				<CheckProperty
					title={'Гараж'}
					checked={projectDto.isGaragePresent}
					disabled={view}
					handleProperty={checked =>
						dispatch({ type: 'isGaragePresent', payload: checked })
					}
				/>
			</Grid>
			<Grid size={{ xs: 12 }}>
				<InputLabel>YouTube видео</InputLabel>
			</Grid>
			<Grid size={{ xs: 4, sm: 10, md: 12, lg: 12 }}>
				<TextProperty
					title={'Ссылка на видео'}
					value={projectDto.videoUrl}
					handleProperty={e =>
						dispatch({ type: 'videoUrl', payload: e.target.value })
					}
					required={true}
					disabled={view}
				/>
			</Grid>
		</Grid>
	)
}

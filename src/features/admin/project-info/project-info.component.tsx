'use client'
import React, { FC, useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Paper, Tab, Tabs } from '@mui/material'
import { initialState, ProjectPropAction } from './model'
import { BasicInfo } from './basic-info.component'
import { ImageData } from './images-data.component'
import { AdditionalInfo } from './additional-info.component'
import { FloorsInfo } from './floors-info.component'
import { useCreateProject, useSaveProject } from '@/api/use-save-project'
import { ProjectDto } from '@/api/model'
import { useGetProjectById } from '@/api/use-get-project-by-id'
import { CustomSnackbar } from '@/components/custom-snackbar.component'
import { AlertDialog } from '@/components/admin/dialog.component'
import { useDeleteProject } from '@/api/use-delete-project'
import { FullSizeLoader } from '@/components/full-size-loader.component'
import { getAppTranslations } from '@/i18n/server'
import { DEFAULT_LOCALE } from '@/i18n/locales'

const translations = getAppTranslations(DEFAULT_LOCALE)

interface ProjectInfoProps {
	projectId?: string
	isNew?: boolean
}

export const ProjectInfo: FC<ProjectInfoProps> = ({ projectId, isNew }) => {
	const router = useRouter()

	const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
	const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

	const { mutate: saveProject, isPending: isSavePending } = useSaveProject(
		() => {
			setOpenSuccessSnackbar(true)
		},
		() => {
			setOpenErrorSnackbar(true)
		}
	)

	const {
		data: savedProject,
		mutate: createProject,
		isPending: isCreatePending
	} = useCreateProject(
		() => {
			setOpenSuccessSnackbar(true)
		},
		() => {
			setOpenErrorSnackbar(true)
		}
	)

	const [openSuccessDeleteSnackbar, setOpenSuccessDeleteSnackbar] =
		useState(false)
	const [openErrorDeleteSnackbar, setOpenErrorDeleteSnackbar] = useState(false)

	const { mutate: deleteProject } = useDeleteProject(
		Number(projectId),
		() => {
			setOpenSuccessDeleteSnackbar(true)
			router.push('/admin')
		},
		() => {
			setOpenErrorDeleteSnackbar(true)
		}
	)

	const isPending = isSavePending || isCreatePending

	const [tabIndex, setTabIndex] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue)
	}

	const { data: project } = useGetProjectById(Number(projectId))

	const [currentProject, localDispatch] = useReducer(
		(prevState: ProjectDto, action: ProjectPropAction) => {
			if (action.initState) {
				return {
					...action.initState
				}
			}

			return {
				...prevState,
				[action.type]: action.payload
			}
		},
		project ? (project as ProjectDto) : initialState
	)

	useEffect(() => {
		if (!project) return
		localDispatch({ type: 'id', payload: 1, initState: { ...project } })
	}, [project])

	useEffect(() => {
		if (!savedProject) return
		router.push(`/admin/project/${savedProject.id}`)
	}, [savedProject])

	if (!currentProject) {
		return <FullSizeLoader />
	}

	const saveProjectHandler = () => {
		console.log('currentProject', currentProject)
		const basicProjectProperties = _objectWithoutProperties(currentProject, [
			'edit',
			'add',
			'imagesToDelete',
			'photosToDelete',
			'imagesToAdd',
			'photosToAdd'
		])
		console.log('basicProjectProperties =>>>>>>', basicProjectProperties)
		if (isNew) {
			createProject(basicProjectProperties as ProjectDto)
		} else {
			saveProject(basicProjectProperties as ProjectDto)
		}
	}

	const deleteProjectHandler = () => {
		setOpenSuccessDeleteSnackbar(true)
		deleteProject(Number(projectId))
	}

	return (
		<Box>
			<Box
				display={'flex'}
				gap={1}
				zIndex={100000000000}
				className="flex-col sm:flex-row sm:justify-end"
				sx={{
					marginBottom: '10px'
				}}
			>
				<Button
					color={'success'}
					variant={'contained'}
					disabled={isPending}
					onClick={saveProjectHandler}
				>
					Зберегти зміни
				</Button>
				<AlertDialog
					triggerButtonTitle='Видалити проект'
					text='Ви впевнені, що хочете видалити проект?'
					handler={deleteProjectHandler}
				/>
			</Box>

			<CustomSnackbar
				title={'Проект збережено'}
				open={openSuccessSnackbar}
				handleClose={() => setOpenSuccessSnackbar(false)}
			/>

			<CustomSnackbar
				title={'Помилка. Перевірте чи всі данні заповнені'}
				open={openErrorSnackbar}
				severity={'error'}
				handleClose={() => setOpenErrorSnackbar(false)}
			/>

			<CustomSnackbar
				title={'Проект видалений'}
				open={openSuccessDeleteSnackbar}
				handleClose={() => {
					setOpenSuccessDeleteSnackbar(false)
					router.push('/admin')
				}}
			/>

			<CustomSnackbar
				title={'Помилка при видаленні проекту'}
				open={openErrorDeleteSnackbar}
				severity={'error'}
				handleClose={() => setOpenErrorDeleteSnackbar(false)}
			/>

			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={tabIndex}
					onChange={handleChange}
					allowScrollButtonsMobile
					variant='scrollable'
				>
					<Tab label='Основне' />
					<Tab label='Додаткове' />
					<Tab label='Поверхи' />
					<Tab label='Картинки' />
				</Tabs>
			</Box>
			<Box pt={2}>
				<CustomTabPanel index={0} tabIndex={tabIndex}>
					<BasicInfo
						projectDto={currentProject}
						dispatch={localDispatch}
						mode={'edit'}
						translations={translations}
					/>
				</CustomTabPanel>
				<CustomTabPanel index={1} tabIndex={tabIndex}>
					<AdditionalInfo
						projectDto={currentProject}
						dispatch={localDispatch}
						mode={'edit'}
						translations={translations}
					/>
				</CustomTabPanel>
				<CustomTabPanel index={2} tabIndex={tabIndex}>
					<FloorsInfo
						projectDto={currentProject}
						dispatch={localDispatch}
						mode={'edit'}
						translations={translations}
					/>
				</CustomTabPanel>
				<CustomTabPanel index={3} tabIndex={tabIndex}>
					<ImageData
						projectDto={currentProject}
						dispatch={localDispatch}
						mode={'edit'}
						translations={translations}
					/>
				</CustomTabPanel>
			</Box>
		</Box>
	)
}

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	tabIndex: number
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, tabIndex, index, ...other } = props

	return (
		<div role='tabpanel' hidden={tabIndex !== index} {...other}>
			<Paper sx={{ p: 4 }}>{tabIndex === index && children}</Paper>
		</div>
	)
}

function _objectWithoutProperties(obj, keys) {
	var target = {}
	for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue
		if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
		target[i] = obj[i]
	}
	return target
}

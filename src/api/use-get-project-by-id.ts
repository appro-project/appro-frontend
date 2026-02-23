import { useQuery } from '@tanstack/react-query'
import { axiosWithSetting } from '@/services/server-data/server-data'
import { projectByIdQueryKey } from './project-by-id-query'

export const useGetProjectById = (id: number) => {
	return useQuery({
		queryKey: projectByIdQueryKey(id),
		queryFn: () =>
			axiosWithSetting.get(`project/${id}`).then((response) => response.data),
		enabled: !!id,
	})
}

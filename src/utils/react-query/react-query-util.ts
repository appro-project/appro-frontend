import { QueryClient } from '@tanstack/react-query'

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// important for SSR
				staleTime: 60 * 1000,

				// to avoid immediate refetch after hydration
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchOnWindowFocus: false
			}
		}
	})
}

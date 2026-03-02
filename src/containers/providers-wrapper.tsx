'use client'
import QueryProvider from '@/providers/query-provider'
import ReduxProvider from '@/providers/redux-provider'

type Props = {
	children: React.ReactNode
}

export default function ProvidersWrapper({ children }: Props) {
	return (
		<QueryProvider>
			<ReduxProvider>{children}</ReduxProvider>
		</QueryProvider>
	)
}

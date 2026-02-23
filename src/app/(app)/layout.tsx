
import { Wrapper } from '@/containers/hoc/wrapper/wrapper'
import { Header } from '@/components/header/header.component'
import { Footer } from '@/components/footer/footer.component'
import classes from '@/styles/layout.module.scss'
import ClientWrapper from '@/modal/client-wrapper'

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<Wrapper>
			<Header />
			<main className={classes.content}>{children}</main>
			<Footer />
			<ClientWrapper />
		</Wrapper>
	)
}

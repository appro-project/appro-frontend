'use client'
import { Container } from '@/containers/hoc/container/container'
import { VisitedProjects } from '@/containers/visited-projects/visited-projects'
import { Additional } from '@/features/project/additional/additional.component'

export default function AdditionalPage() {
	return (
		<section>
			<Container>
				<Additional />
				<VisitedProjects />
			</Container>
		</section>
	)
}

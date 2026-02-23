import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import {
  fetchProjectById,
  projectByIdQueryKey,
} from "@/api/project-by-id-query";
import ProjectPageContent from "../../../../features/catalogue/project-page-content";
import { createQueryClient } from "@/utils/react-query/react-query-util";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const id = Number(projectId);
  if (Number.isNaN(id)) {
    return null; // or redirect to 404
  }

  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: projectByIdQueryKey(id),
    queryFn: () => fetchProjectById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectPageContent />
    </HydrationBoundary>
  );
}

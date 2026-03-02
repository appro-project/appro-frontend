import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import {
  fetchProjectById,
  projectByIdQueryKey,
} from "@/api/project-by-id-query";
import ProjectPageContent from "@/features/catalogue/project-page-content";
import { createQueryClient } from "@/utils/react-query/react-query-util";

type Props = {
  params: Promise<{ lang: string; projectId: string }>;
};

export default async function LangProjectPage({ params }: Props) {
  const { projectId } = await params;
  const id = Number(projectId);
  if (Number.isNaN(id)) {
    return null;
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

import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchAllProjects, PROJECTS_QUERY_KEY } from "@/api/projects-query";
import { HomeContent } from "@/features/main-page/home-content";
import { createQueryClient } from "@/utils/react-query/react-query-util";

export default async function Home() {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: fetchAllProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContent />
    </HydrationBoundary>
  );
}

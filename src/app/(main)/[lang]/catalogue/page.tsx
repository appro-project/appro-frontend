import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchAllProjects, PROJECTS_QUERY_KEY } from "@/api/projects-query";
import { Catalogue } from "@/features/catalogue/catalogue.component";
import { Suspense } from "react";
import { FullSizeLoader } from "@/components/full-size-loader.component";
import { createQueryClient } from "@/utils/react-query/react-query-util";

export default async function LangCataloguePage() {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: fetchAllProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<FullSizeLoader />}>
        <Catalogue />
      </Suspense>
    </HydrationBoundary>
  );
}

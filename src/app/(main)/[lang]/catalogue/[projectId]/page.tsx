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
import type { Metadata } from 'next'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { generateProjectMetadata } from '@/utils/seo/generate-project-metadata'

type Props = {
  params: Promise<{ lang: string; projectId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, projectId } = await params
  const locale = langParam === 'ru' ? 'ru' : DEFAULT_LOCALE
  const id = Number(projectId)
  if (Number.isNaN(id)) return {}
  try {
    const project = await fetchProjectById(id)
    return generateProjectMetadata(project, locale)
  } catch {
    return {}
  }
}

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

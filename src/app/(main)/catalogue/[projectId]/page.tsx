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
import { getAppTranslations } from "@/i18n/server";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import type { Metadata } from 'next'
import { generateProjectMetadata } from '@/utils/seo/generate-project-metadata'

type Props = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params
  const id = Number(projectId)
  if (Number.isNaN(id)) return {}
  try {
    const project = await fetchProjectById(id)
    return generateProjectMetadata(project, DEFAULT_LOCALE)
  } catch {
    return {}
  }
}

export default async function ProjectPage({ params }: Props) {
  const lang = DEFAULT_LOCALE;
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

  const translations = getAppTranslations(lang);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectPageContent translations={translations} lang={lang} />
    </HydrationBoundary>
  );
}

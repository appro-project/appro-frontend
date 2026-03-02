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
import { getAppTranslations } from '@/i18n/server'
import { generateProjectMetadata } from '@/utils/seo/generate-project-metadata'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

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
  const { lang: langParam, projectId } = await params;
  const locale = langParam === 'ru' ? 'ru' : DEFAULT_LOCALE;
  const id = Number(projectId);
  if (Number.isNaN(id)) {
    return null;
  }

  const queryClient = createQueryClient();

  const project = await queryClient.fetchQuery({
    queryKey: projectByIdQueryKey(id),
    queryFn: () => fetchProjectById(id),
  });

  const translations = getAppTranslations(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://appro.com.ua'

  return (
    <>
      {project && (
        <>
          <ProductJsonLd project={project} locale={locale as 'ua' | 'ru'} />
          <BreadcrumbJsonLd
            items={[
              { name: locale === 'ru' ? 'Главная' : 'Головна', url: `${baseUrl}/ru` },
              { name: locale === 'ru' ? 'Каталог домов' : 'Каталог будинків', url: `${baseUrl}/ru/catalogue` },
              { name: project.title, url: `${baseUrl}/ru/catalogue/${project.id}` },
            ]}
          />
        </>
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectPageContent translations={translations} lang={locale} />
      </HydrationBoundary>
    </>
  );
}

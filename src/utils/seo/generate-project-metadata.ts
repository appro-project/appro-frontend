import type { Metadata } from 'next'
import type { ProjectDto } from '@/api/model'
import { getServerTranslations } from '@/i18n/server'
import { getAlternates, getBaseOpenGraph, BASE_URL } from './alternates'

function getFloorInfo(project: ProjectDto): { count: number; hasAttic: boolean } {
  const floors = project.floors ?? []
  const hasAttic = floors.some((f) => f.isAttic)
  const regularFloors = floors.filter((f) => !f.isAttic && !f.isBasement)
  return { count: regularFloors.length, hasAttic }
}

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA').replace(/,/g, ' ')
}

export async function generateProjectMetadata(
  project: ProjectDto,
  locale: 'ua' | 'ru',
): Promise<Metadata> {
  const t = await getServerTranslations(locale)
  const { count, hasAttic } = getFloorInfo(project)

  let titleKey = 'meta.project_title_one_floor'
  if (hasAttic) {
    titleKey = 'meta.project_title_with_attic'
  } else if (count >= 2) {
    titleKey = 'meta.project_title_two_floor'
  }

  const title = t(titleKey, {
    title: project.title,
    area: String(project.generalArea),
  })

  const wallMaterial = t(`options.wall-material.${project.wallMaterial}`)
  const foundation = t(`options.foundation.${project.foundation}`)
  const roof = t(`options.roof.${project.roof}`)

  const description = t('meta.project_description', {
    title: project.title,
    area: String(project.generalArea),
    wallMaterial,
    wallThickness: String(project.wallThickness),
    foundation,
    roof,
    price: formatPrice(project.projectPrice),
  })

  const path = `/catalogue/${project.id}`
  const url = locale === 'ru' ? `${BASE_URL}/ru${path}` : `${BASE_URL}${path}`
  const imageUrl = project.mainImage?.path

  return {
    title,
    description,
    alternates: getAlternates(path),
    openGraph: {
      ...getBaseOpenGraph(locale),
      title,
      description,
      url,
      type: 'website',
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}

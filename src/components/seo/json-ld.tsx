import type { ProjectDto } from '@/api/model'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://appro.com.ua'

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'APPRO',
        url: BASE_URL,
        logo: `${BASE_URL}/_next/static/media/logo.d3f0ea41.svg`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+380502684926',
          contactType: 'sales',
          availableLanguage: ['Ukrainian', 'Russian'],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'вул. Ярославська, 3',
          addressLocality: 'Ірпінь',
          addressCountry: 'UA',
        },
      }}
    />
  )
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/#business`,
        name: 'APPRO — Архітектурне бюро',
        url: BASE_URL,
        telephone: '+380502684926',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'вул. Ярославська, 3',
          addressLocality: 'Ірпінь',
          addressCountry: 'UA',
        },
        priceRange: '$$',
        image: `${BASE_URL}/_next/static/media/logo.d3f0ea41.svg`,
      }}
    />
  )
}

export function ProductJsonLd({ project, locale }: { project: ProjectDto; locale: 'ua' | 'ru' }) {
  const description = locale === 'ru' ? project.descriptionRU : project.descriptionUA
  const path = `/catalogue/${project.id}`
  const url = locale === 'ru' ? `${BASE_URL}/ru${path}` : `${BASE_URL}${path}`

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: locale === 'ru'
          ? `Проект дома ${project.title}`
          : `Проект будинку ${project.title}`,
        description: description?.slice(0, 200),
        url,
        image: project.mainImage?.path,
        brand: {
          '@type': 'Organization',
          name: 'APPRO',
        },
        offers: {
          '@type': 'Offer',
          price: project.projectPrice,
          priceCurrency: 'UAH',
          availability: 'https://schema.org/InStock',
          url,
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: locale === 'ru' ? 'Общая площадь' : 'Загальна площа',
            value: `${project.generalArea} м²`,
          },
          {
            '@type': 'PropertyValue',
            name: locale === 'ru' ? 'Жилая площадь' : 'Житлова площа',
            value: `${project.livingArea} м²`,
          },
          {
            '@type': 'PropertyValue',
            name: locale === 'ru' ? 'Габариты' : 'Габарити',
            value: `${project.width} x ${project.length} м`,
          },
        ],
      }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}

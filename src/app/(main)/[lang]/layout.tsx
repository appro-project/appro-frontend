import { notFound } from 'next/navigation'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return [{ lang: 'ru' }]
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (lang !== 'ru') {
    notFound()
  }
  return <>{children}</>
}

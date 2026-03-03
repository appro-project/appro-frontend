import type { Metadata } from 'next'
import { headers } from 'next/headers'
import '@/styles/globals.scss'
import { Montserrat } from 'next/font/google'
import ProvidersWrapper from '@/containers/providers-wrapper'

const montserrat = Montserrat({
	subsets: ["latin", "cyrillic"],
	variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: {
    default: 'APPRO — Проекти будинків | Архітектурне бюро',
    template: '%s',
  },
  description: 'Готові та індивідуальні проекти житлових будинків від архітектурного бюро APPRO.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://appro.com.ua'),
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers()
  const currentLang = headersList.get('x-current-lang') ?? 'ua'
  const htmlLang = currentLang === 'ru' ? 'ru' : 'uk'

  return (
    <html lang={htmlLang} className={montserrat.variable}>
      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}

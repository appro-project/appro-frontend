'use client'

import { Wrapper } from '@/containers/hoc/wrapper/wrapper'
import { Header } from '@/components/header/header.component'
import { Footer } from '@/components/footer/footer.component'
import classes from '@/styles/layout.module.scss'
import ClientWrapper from '@/modal/client-wrapper'
import ProvidersWrapper from '@/containers/providers-wrapper'
import type { TranslationsRecord } from '@/i18n/create-t'
import type { Locale } from '@/i18n/locales'

type AppShellProps = {
  children: React.ReactNode
  translations: TranslationsRecord
  lang: Locale
}

export default function AppShell({ children, translations, lang }: AppShellProps) {
  return (
    <ProvidersWrapper>
      <Wrapper>
        <Header translations={translations} lang={lang} />
        <main className={classes.content}>{children}</main>
        <Footer translations={translations} lang={lang} />
        <ClientWrapper translations={translations} lang={lang} />
      </Wrapper>
    </ProvidersWrapper>
  )
}

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru/translation.json'
import ua from './locales/ua/translation.json'
import { DEFAULT_LOCALE } from './locales'

i18n.use(initReactI18next).init({
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  resources: {
    ru: { translations: ru },
    ua: { translations: ua },
  },
  defaultNS: 'translations',
})

export default i18n

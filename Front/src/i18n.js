import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './Translation/en.json'
import es from './Translation/es.json'
import it from './Translation/it.json'
import fr from './Translation/fr.json'


i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // backend: {
    //     loadPath: `${URL}/locales/{{lng}}/{{ns}}.json`
    // }
    resources: {
      en: {
        translation:en
      },
      es: {
        translation:es
      },
      it: {
        translation:it
      },
      fr: {
        translation: fr
      },
    }
  });

export default i18n;
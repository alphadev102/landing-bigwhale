import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
	.use(Backend)
	.use (initReactI18next)
	.init({
    lng: 'en',
		fallbackLng: 'en',
		debug: false,

		detection: {
			order: ["localStorage", "cookie", "navigator"],
			caches: ["localStorage", "cookie"],
		},
		interpolation: {
			escapeValue: false
		}
	})

export default i18n

import i18n from "i18next";
import enLocale from "./locales/en.json";
import thLocale from "./locales/th.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    resources: {
        en: {
            translation: enLocale,
        },
        th: {
            translation: thLocale,
        },
    },
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "language",
    },
});

export default i18n;

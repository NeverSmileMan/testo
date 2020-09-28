import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './enum.i18n';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ua',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export * from 'i18next';

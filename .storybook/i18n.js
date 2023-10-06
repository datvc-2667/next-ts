import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'ja',
    fallbackLng: 'ja',
    ns: [
      'common',
      'account',
      'nft-detail',
      'validation-message',
      'collection',
      'asset',
      'home',
      'listing-nft',
      'transfer-nft',
      'collection-detail',
    ],
    defaultNS: 'common',
  });

export default i18n;

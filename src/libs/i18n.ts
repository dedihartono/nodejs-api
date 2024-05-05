import { I18n } from 'i18n';
import path from 'path';

const i18n = new I18n();

i18n.configure({
  staticCatalog: {
    en: {
      ...require(path.join(__dirname, '..', 'locales', 'en', 'common.json')),
      ...require(path.join(__dirname, '..', 'locales', 'en', 'messages.json')),
    },
    id: {
      ...require(path.join(__dirname, '..', 'locales', 'id', 'common.json')),
      ...require(path.join(__dirname, '..', 'locales', 'id', 'messages.json')),
    },
  },
  defaultLocale: 'en',
  autoReload: true,
  syncFiles: true,
  objectNotation: true,
});

export default i18n;

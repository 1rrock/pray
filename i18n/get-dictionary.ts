import 'server-only';
import type { Locale } from './config';
type DictionaryLoader = () => Promise<any>;
const dictionaries: Record<Locale, DictionaryLoader> = {
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};
export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

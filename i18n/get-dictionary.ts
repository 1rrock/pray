import 'server-only';
import type { Locale } from './config';
import ko from './dictionaries/ko.json';
import en from './dictionaries/en.json';

type Dictionary = {
  common: Record<string, string>;
  home: Record<string, string>;
  prayer: Record<string, string>;
  footer: Record<string, string>;
};

const dictionaries: Record<Locale, Dictionary> = {
  ko: ko as Dictionary,
  en: en as Dictionary,
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale];
};

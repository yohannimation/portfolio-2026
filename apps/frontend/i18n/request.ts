import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {headers} from 'next/headers';

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async (config) => {
  const head = await headers();
  const { locale } = config;

  // Fallback chain:
  // 1. Locale from config (URL segment [locale])
  // 2. Locale from middleware header (x-next-intl-locale)
  // 3. Default locale
  const localeFromHeader = head.get('x-next-intl-locale');

  const locales = routing.locales;

  let activeLocale: Locale = routing.defaultLocale;

  if (locale && locales.includes(locale as Locale)) {
    activeLocale = locale as Locale;
  } else if (localeFromHeader && locales.includes(localeFromHeader as Locale)) {
    activeLocale = localeFromHeader as Locale;
  }

  console.log(`[i18n-request] Config locale: ${locale}, Header locale: ${localeFromHeader}, Chosen: ${activeLocale}`);

  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default
  };
});

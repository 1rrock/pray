'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type Locale, locales, localeNames } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Remove current locale from pathname and add new locale
    const segments = pathname.split('/').filter(Boolean);
    const isLocaleInPath = locales.includes(segments[0] as Locale);

    let newPathname: string;
    if (isLocaleInPath) {
      segments[0] = newLocale;
      newPathname = `/${segments.join('/')}`;
    } else {
      newPathname = `/${newLocale}${pathname}`;
    }

    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200 dark:border-amber-700/50"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {localeNames[currentLocale]}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-amber-200 dark:border-amber-700/50 overflow-hidden z-50 min-w-[140px]">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors ${locale === currentLocale
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 font-semibold'
                    : 'text-gray-700 dark:text-gray-300'
                  }`}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


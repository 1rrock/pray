'use client';

import { Coffee } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/i18n/config';

const texts = {
    ko: '후원하기',
    en: 'Support',
};

export default function BuyMeCoffeeButton() {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();

    // Extract language from pathname
    const lang: Locale = pathname.startsWith('/en') ? 'en' : 'ko';
    const text = texts[lang];

    return (
        <a
            href="https://buymeacoffee.com/1rrock"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={`Buy Me a Coffee - ${text}`}
        >
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-amber-400/50 dark:border-amber-500/50">
                {/* Coffee Icon */}
                <div className="relative">
                    <Coffee
                        className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                        strokeWidth={2.5}
                    />
                    {isHovered && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-200 rounded-full animate-ping" />
                    )}
                </div>

                {/* Text */}
                <span className="font-semibold text-sm whitespace-nowrap">
          {text}
        </span>
            </div>
        </a>
    );
}


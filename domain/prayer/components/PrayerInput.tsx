'use client';

import { useRouter } from 'next/navigation';
import { Mic, Edit3 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { type Locale } from '@/i18n/config';

const texts = {
    ko: {
        voice: '음성으로 기도하기',
        text: '글로 기도하기',
        help: '원하는 방법을 선택하여 기도를 시작하세요'
    },
    en: {
        voice: 'Pray with Voice',
        text: 'Pray with Text',
        help: 'Choose your preferred method to start praying'
    }
};

export function PrayerInput({ lang }: { lang: Locale }) {
    const router = useRouter();
    const t = texts[lang];

    return (
        <div className="max-w-2xl mx-auto px-2">
            {/* 입력 방법 버튼 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 음성 기도 버튼 */}
                <Button
                    type="button"
                    size="lg"
                    onClick={() => router.push(`/${lang}/pray/voice`)}
                    className="group h-24 bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-2 border-amber-300/50 hover:border-amber-400/70 hover:scale-[1.02] px-6 py-5"
                >
                    <div className="flex flex-col items-center gap-2.5">
                        <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Mic className="h-5 w-5" />
                        </div>
                        <span className="text-base leading-tight">{t.voice}</span>
                    </div>
                </Button>

                {/* 텍스트 기도 버튼 */}
                <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => router.push(`/${lang}/pray/text`)}
                    className="group h-24 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-amber-300 dark:border-amber-700 hover:bg-white dark:hover:bg-gray-800 hover:border-amber-400 dark:hover:border-amber-600 font-semibold text-amber-900 dark:text-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl hover:scale-[1.02] px-6 py-5"
                >
                    <div className="flex flex-col items-center gap-2.5">
                        <div className="w-11 h-11 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors">
                            <Edit3 className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                        </div>
                        <span className="text-base leading-tight">{t.text}</span>
                    </div>
                </Button>
            </div>

            {/* 안내 텍스트 */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-5">
                {t.help}
            </p>
        </div>
    );
}


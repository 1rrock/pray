'use client';

import {useRouter} from 'next/navigation';
import {Mic, Edit3} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';

export function PrayerInput() {
    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto px-4">
            {/* 입력 방법 버튼 - 개선된 디자인 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 음성 기도 버튼 - Primary */}
                <Button
                    type="button"
                    size="lg"
                    onClick={() => router.push('/pray/voice')}
                    className="group h-24 bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-2 border-amber-300/50 hover:border-amber-400/70 hover:scale-[1.02] px-6 py-5"
                >
                    <div className="flex flex-col items-center gap-2.5">
                        <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Mic className="h-5 w-5"/>
                        </div>
                        <span className="text-base leading-tight">음성으로 기도하기</span>
                    </div>
                </Button>

                {/* 텍스트 기도 버튼 - Secondary */}
                <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => router.push('/pray/text')}
                    className="group h-24 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-amber-300 dark:border-amber-700 hover:bg-white dark:hover:bg-gray-800 hover:border-amber-400 dark:hover:border-amber-600 font-semibold text-amber-900 dark:text-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl hover:scale-[1.02] px-6 py-5"
                >
                    <div className="flex flex-col items-center gap-2.5">
                        <div className="w-11 h-11 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors">
                            <Edit3 className="h-5 w-5 text-amber-700 dark:text-amber-300"/>
                        </div>
                        <span className="text-base leading-tight">글로 기도하기</span>
                    </div>
                </Button>
            </div>

            {/* 안내 텍스트 */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-5">
                원하는 방법을 선택하여 기도를 시작하세요
            </p>
        </div>
    );
}


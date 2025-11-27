'use client';

import {useRouter} from 'next/navigation';
import {Mic, Edit3} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';

export function PrayerInput() {
    const router = useRouter();

    return (
        <div className="space-y-4">
            {/* 입력 방법 버튼 */}
            <div className="grid grid-cols-2 gap-3">
                <Button
                    type="button"
                    size="lg"
                    onClick={() => router.push('/pray/voice')}
                    className="h-14 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700 text-amber-900 font-medium shadow-lg"
                >
                    <Mic className="mr-2 h-5 w-5"/>
                    음성으로 기도하기
                </Button>
                <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => router.push('/pray/text')}
                    className="h-14 bg-white dark:bg-amber-950 border-2 border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900 font-medium text-amber-900 dark:text-amber-100"
                >
                    <Edit3 className="mr-2 h-5 w-5"/>
                    글로 기도하기
                </Button>
            </div>
        </div>
    );
}


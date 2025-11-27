'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {motion} from 'framer-motion';
import {ResponseDisplay} from '@/domain/prayer/components/ResponseDisplay';
import {usePrayerStore} from '@/domain/prayer/store/prayerStore';
import {useEffect, useState, Suspense} from 'react';
import type {AIResponse} from '@/domain/prayer/api/type';

function ScriptureContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {response, reset} = usePrayerStore();
    const [hasCrisis, setHasCrisis] = useState(false);
    const [sharedResponse, setSharedResponse] = useState<AIResponse | null>(null);

    useEffect(() => {
        // URL 파라미터에서 공유된 데이터 확인
        const book = searchParams.get('book');
        const chapter = searchParams.get('chapter');
        const verse = searchParams.get('verse');
        const text = searchParams.get('text');
        const guidance = searchParams.get('guidance');
        const prayer = searchParams.get('prayer');

        // URL 파라미터가 있으면 공유된 데이터로 표시
        if (book && chapter && verse && text && guidance) {
            const sharedData: AIResponse = {
                bibleVerse: {
                    book,
                    chapter: parseInt(chapter),
                    verse: parseInt(verse),
                    text,
                },
                guidance,
                timestamp: new Date(),
            };
            setSharedResponse(sharedData);

            // 공유된 기도가 있으면 스토어에 저장
            if (prayer) {
                usePrayerStore.setState({
                    currentPrayer: {
                        text: prayer,
                        method: 'text',
                        timestamp: new Date(),
                    },
                });
            }
            return;
        }

        // 응답이 없으면 홈으로 리다이렉트
        if (!response) {
            router.push('/');
            return;
        }

        // 위기 감지
        const timer = setTimeout(() => {
            const prayerText = response.guidance || '';
            setHasCrisis(prayerText.includes('위기') || prayerText.includes('자살'));
        }, 0);

        return () => clearTimeout(timer);
    }, [response, router, searchParams]);

    const handleNewPrayer = () => {
        reset();
        router.push('/');
    };

    // 공유된 응답 또는 저장된 응답 사용
    const displayResponse = sharedResponse || response;

    if (!displayResponse) {
        return null;
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center py-8">
            <motion.div
                initial={{opacity: 0, y: 30, scale: 0.95}}
                animate={{opacity: 1, y: 0, scale: 1}}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full"
            >
                <ResponseDisplay
                    response={displayResponse}
                    hasCrisis={hasCrisis}
                    onNewPrayer={handleNewPrayer}
                />
            </motion.div>
        </div>
    );
}

export default function ScripturePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center">
                <div className="text-amber-600 text-xl">로딩 중...</div>
            </div>
        }>
            <ScriptureContent />
        </Suspense>
    );
}

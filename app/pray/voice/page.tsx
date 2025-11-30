'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { VoiceRecorder } from '@/domain/prayer/components/VoiceRecorder';
import { usePrayer } from '@/domain/prayer/hooks/usePrayer';
import { usePrayerStore } from '@/domain/prayer/store/prayerStore';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useState } from 'react';

export default function VoicePrayerPage() {
    const router = useRouter();
    const {submitPrayer, isLoading} = usePrayer();
    const {recipientName, setRecipientName} = usePrayerStore();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleVoiceTranscription = async (text: string) => {
        try {
            // 즉시 네비게이션 로딩을 표시합니다 (UI가 깜박이는 문제 방지)
            setIsNavigating(true);
            // submitPrayer가 완전히 완료될 때까지 기다립니다
            await submitPrayer(text, 'voice');
            // 응답이 완료된 후에만 페이지 이동
            router.push('/pray/scripture');
        } catch (error) {
            console.error('Submit error:', error);
            // 에러 발생 시 로딩 상태 해제
            setIsNavigating(false);
        }
    };

    const handleClose = () => {
        router.push('/');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipientName(e.target.value);
    };

    // 로딩 또는 네비게이션 진행 중일 때는 text 페이지와 동일한 로딩 화면을 표시
    if (isLoading || isNavigating) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    className="flex flex-col items-center justify-center space-y-6"
                >
                    <div className="text-center space-y-8 max-w-md">
                        {/* 로딩 스피너 */}
                        <div className="flex justify-center">
                            <div className="relative w-24 h-24">
                                <motion.div
                                    animate={{rotate: 360}}
                                    transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                                    className="absolute inset-0 rounded-full border-4 border-amber-200 dark:border-amber-900 border-t-amber-600 dark:border-t-amber-400"
                                />
                            </div>
                        </div>

                        {/* 메시지 */}
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                하나님의 계시를 받는 중...
                            </h2>
                            <p className="text-amber-700 dark:text-amber-300">
                                성경 말씀으로 응답하고 계십니다
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="w-full max-w-2xl space-y-4"
            >
                {/* 이름 입력 카드 */}
                <Card className="border-2 border-amber-200 dark:border-amber-800 bg-white/90 dark:bg-amber-950/90">
                    <CardContent className="pt-6 space-y-2">
                        <label htmlFor="voice-recipient-name" className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            계시를 받으실 분의 이름 (선택)
                        </label>
                        <input
                            id="voice-recipient-name"
                            type="text"
                            value={recipientName}
                            onChange={handleNameChange}
                            placeholder="예: 김철수, 베드로, 마리아"
                            className="w-full px-4 py-3 border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100 placeholder:text-amber-500/60 dark:placeholder:text-amber-500/60 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        />
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                            입력하시면 &quot;{recipientName || '000'}에게 전하는 계시록&quot;으로 응답받습니다
                        </p>
                    </CardContent>
                </Card>

                <VoiceRecorder
                    onTranscriptionComplete={handleVoiceTranscription}
                    onClose={handleClose}
                    isNavigating={isNavigating}
                />
            </motion.div>
        </div>
    );
}

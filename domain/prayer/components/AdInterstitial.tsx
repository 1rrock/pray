'use client';

import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

interface AdInterstitialProps {
    onComplete: () => void;
    duration?: number;
}

export function AdInterstitial({onComplete, duration = 3}: AdInterstitialProps) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownTimer);
                    // setTimeout으로 다음 틱에 실행하여 렌더링 중 상태 업데이트 방지
                    setTimeout(() => {
                        onComplete();
                    }, 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(countdownTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 z-50 flex items-center justify-center p-4"
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
                        기도를 올리는 중...
                    </h2>
                    <p className="text-amber-700 dark:text-amber-300">
                        하나님께서 응답하고 계십니다
                    </p>
                </div>

                {/* 카운트다운 */}
                <p className="text-sm text-amber-700 dark:text-amber-400">
                    {timeLeft}초 남음
                </p>
            </div>
        </motion.div>
    );
}


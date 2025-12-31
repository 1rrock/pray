'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AdInterstitialProps {
    onComplete: () => void;
    duration?: number;
}

const VERSES = [
    {
        ko: "구하라, 그리하면 너희에게 주실 것이요, 찾으라, 그리하면 찾아낼 것이요, 문을 두드리라, 그리하면 너희에게 열릴 것이니",
        en: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
        ref: "Matthew 7:7"
    },
    {
        ko: "주의 말씀은 내 발에 등이요 내 길에 빛이니이다",
        en: "Your word is a lamp to my feet and a light to my path.",
        ref: "Psalm 119:105"
    },
    {
        ko: "너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라",
        en: "Cast all your anxiety on him because he cares for you.",
        ref: "1 Peter 5:7"
    }
];

export function AdInterstitial({ onComplete, duration = 3 }: AdInterstitialProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [verseIndex, setVerseIndex] = useState(0);

    useEffect(() => {
        setVerseIndex(Math.floor(Math.random() * VERSES.length));

        const countdownTimer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownTimer);
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 z-50 flex items-center justify-center p-4"
        >
            <div className="text-center space-y-8 max-w-lg">
                {/* 로딩 스피너 */}
                <div className="flex justify-center">
                    <div className="relative w-24 h-24">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-4 border-amber-200 dark:border-amber-900 border-t-amber-600 dark:border-t-amber-400"
                        />
                    </div>
                </div>

                {/* 메시지 및 말씀 */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                            기도를 올리는 중...
                        </h2>
                        <p className="text-amber-700 dark:text-amber-300">
                            하나님께서 응답하고 계십니다
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 dark:border-amber-800"
                    >
                        <p className="text-sm italic text-amber-800 dark:text-amber-200 leading-relaxed mb-2">
                            "{VERSES[verseIndex].ko}"
                        </p>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                            — {VERSES[verseIndex].ref}
                        </p>
                    </motion.div>
                </div>

                {/* 카운트다운 */}
                <p className="text-sm text-amber-700 dark:text-amber-400">
                    {timeLeft}초 남음
                </p>
            </div>
        </motion.div>
    );
}


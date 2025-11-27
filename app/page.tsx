'use client';

import {motion, AnimatePresence} from 'framer-motion';
import {PrayerInput} from '@/domain/prayer/components/PrayerInput';
import {GoogleAd} from '@/shared/components/GoogleAd';
import {Church} from 'lucide-react';

export default function Home() {
    return (
        <div className="dark:bg-gray-900 p-4 h-dvh flex items-center flex-col justify-center">
            <main className="w-full max-w-lg">
                <AnimatePresence mode="wait">
                    <motion.div
                        key="input"
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.95}}
                        transition={{duration: 0.2}}
                        className="space-y-6"
                    >
                        {/* 로고 및 타이틀 */}
                        <div className="text-center space-y-4">
                            <div
                                className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                                <Church className="w-10 h-10 text-amber-500" strokeWidth={2}/>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Pray
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                하나님께 기도하고 말씀을 받으세요
                            </p>
                        </div>

                        <PrayerInput/>

                        {/* 하단 성경 구절 */}
                        <p className="text-center text-sm text-amber-700 dark:text-amber-400 px-4">
                            &quot;구하라, 그리하면 너희에게 주실 것이요, 찾으라, 그리하면 찾아낼 것이요, 문을 두드리라, 그리하면 너희에게 열릴 것이니&quot; <br/>-
                            마태복음 7:7
                        </p>

                        {/* 하단 광고 */}
                        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 rounded-2xl border-2 border-amber-300 dark:border-amber-700 shadow-md overflow-hidden min-h-[100px]">
                            <GoogleAd
                                slot="5375626932"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}


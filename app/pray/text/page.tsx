'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {motion} from 'framer-motion';
import {ArrowLeft, Send, Sparkles} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';
import {Textarea} from '@/shared/components/ui/textarea';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/shared/components/ui/card';
import {usePrayer} from '@/domain/prayer/hooks/usePrayer';
import {LIMITS, ERROR_MESSAGES} from '@/domain/prayer/api/constant';
import {usePrayerStore} from '@/domain/prayer/store/prayerStore';

export default function TextPrayerPage() {
    const router = useRouter();
    const [prayerText, setPrayerText] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);
    const {submitPrayer, isLoading} = usePrayer();
    const {recipientName, setRecipientName} = usePrayerStore();

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= LIMITS.MAX_TEXT_LENGTH) {
            setPrayerText(text);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipientName(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prayerText.trim()) {
            return;
        }

        if (prayerText.length > LIMITS.MAX_TEXT_LENGTH) {
            alert(ERROR_MESSAGES.TEXT_TOO_LONG);
            return;
        }

        try {
            // submitPrayer가 완전히 완료될 때까지 기다립니다
            await submitPrayer(prayerText, 'text');
            // 라우터 이동 시작 시 로딩 상태 유지
            setIsNavigating(true);
            router.push('/pray/scripture');
        } catch (error) {
            console.error('Submit error:', error);
            // 에러 발생 시에는 페이지 이동하지 않음
        }
    };

    return (
        <div
            className="h-dvh bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-4">
            {(isLoading || isNavigating) ? (
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
            ) : (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="w-full max-w-2xl"
                >
                    <form onSubmit={handleSubmit}>
                        <Card
                            className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-b from-white to-amber-50 dark:from-amber-950 dark:to-amber-900 shadow-2xl">
                            <CardHeader className="text-center space-y-2 pb-4">
                                <div className="flex justify-center mb-2">
                                    <div
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-400 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 flex items-center justify-center border-2 border-amber-400 dark:border-amber-500">
                                        <Sparkles className="w-8 h-8 text-amber-900 dark:text-amber-100"/>
                                    </div>
                                </div>
                                <CardTitle className="text-2xl text-amber-900 dark:text-amber-100">
                                    하나님께 기도를 올려주세요
                                </CardTitle>
                                <CardDescription className="text-amber-700 dark:text-amber-300">
                                    하나님의 계시로 응답하실 것입니다
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* 이름 입력 */}
                                <div className="space-y-2">
                                    <label htmlFor="recipient-name" className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                        계시를 받으실 분의 이름 (선택)
                                    </label>
                                    <input
                                        id="recipient-name"
                                        type="text"
                                        value={recipientName}
                                        onChange={handleNameChange}
                                        placeholder="예: 김철수, 베드로, 마리아"
                                        className="w-full px-4 py-3 border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100 placeholder:text-amber-500/60 dark:placeholder:text-amber-500/60 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                    />
                                    <p className="text-xs text-amber-600 dark:text-amber-400">
                                        입력하시면 "{recipientName || '000'}에게 전하는 계시록"으로 응답받습니다
                                    </p>
                                </div>

                                {/* 기도 입력 */}
                                <div className="relative">
                                    <Textarea
                                        value={prayerText}
                                        onChange={handleTextChange}
                                        placeholder="하나님께 드릴 기도를 입력해주세요...&#x0a;&#x0a;예시:&#x0a;하나님, 요즘 힘든 일들이 많아서 지쳐있습니다.&#x0a;힘과 용기를 주시고 올바른 길로 인도해주세요."
                                        className="min-h-[240px] resize-none border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100 placeholder:text-amber-500/60 dark:placeholder:text-amber-500/60 rounded-xl text-base leading-relaxed"
                                        autoFocus
                                    />
                                    <div
                                        className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-white/80 dark:bg-amber-950/80 px-2 py-1 rounded-lg">
                                        <span className="font-medium">{prayerText.length}</span>
                                        <span>/</span>
                                        <span>{LIMITS.MAX_TEXT_LENGTH}</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex-col gap-3">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-14 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700 text-amber-900 font-semibold shadow-lg text-base"
                                    disabled={!prayerText.trim()}
                                >
                                    <Send className="mr-2 h-5 w-5"/>
                                    하나님의 계시 받기
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => router.push('/')}
                                    className="text-sm text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 py-2 flex items-center gap-2 font-medium transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4"/>
                                    처음으로
                                </button>
                            </CardFooter>
                        </Card>
                    </form>
                </motion.div>
            )}
        </div>
    );
}


'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { usePrayer } from '@/domain/prayer/hooks/usePrayer';
import { LIMITS } from '@/domain/prayer/api/constant';
import { usePrayerStore } from '@/domain/prayer/store/prayerStore';
import { KakaoAdFit } from '@/shared/components/KakaoAdFit';

export default function TextPrayerClient() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.startsWith('/en') ? 'en' : 'ko';
    const [prayerText, setPrayerText] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);
    const { submitPrayer, isLoading } = usePrayer();
    const { recipientName, setRecipientName } = usePrayerStore();

    const texts = {
        ko: {
            loadingTitle: '말씀을 받는 중...',
            loadingDesc: '성경 말씀으로 응답하고 있습니다',
            title: '기도를 올려주세요',
            placeholder: '기도 제목이나 내용을 입력하세요',
            nameLabel: '응답을 받으실 분의 이름 (선택)',
            namePlaceholder: '예: 김철수, 베드로, 마리아',
            nameHint: '입력하시면 "{name}에게 전하는 말씀"으로 응답받습니다',
            textLengthError: '기도 내용이 너무 깁니다',
            submit: '기도하기',
            cancel: '돌아가기',
        },
        en: {
            loadingTitle: 'Receiving Scripture...',
            loadingDesc: 'Processing your prayer request',
            title: 'Share Your Prayer',
            placeholder: 'Enter your prayer or request',
            nameLabel: 'Your Name (Optional)',
            namePlaceholder: 'e.g., John, Mary, Peter',
            nameHint: 'Your response will be addressed to "{name}"',
            textLengthError: 'Prayer text is too long',
            submit: 'Pray',
            cancel: 'Back',
        }
    };

    const t = texts[locale];

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
            alert(t.textLengthError);
            return;
        }

        try {
            await submitPrayer(prayerText, 'text', locale);
            setIsNavigating(true);
            router.push(`/${locale}/pray/scripture`);
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    return (
        <>
            {(isLoading || isNavigating) ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-center space-y-6"
                >
                    <div className="text-center space-y-8 max-w-md">
                        <div className="flex justify-center">
                            <div className="relative w-24 h-24">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-4 border-amber-200 dark:border-amber-900 border-t-amber-600 dark:border-t-amber-400"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                {t.loadingTitle}
                            </h2>
                            <p className="text-amber-700 dark:text-amber-300">
                                {t.loadingDesc}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl"
                >
                    <form onSubmit={handleSubmit}>
                        <Card className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-b from-white to-amber-50 dark:from-amber-950 dark:to-amber-900 shadow-2xl">
                            <CardHeader className="text-center space-y-2">
                                <div className="flex justify-center mb-2">
                                    <div
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-400 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 flex items-center justify-center border-2 border-amber-400 dark:border-amber-500"
                                        role="img"
                                        aria-label={locale === 'ko' ? '반짝이는 별 아이콘' : 'Sparkling star icon'}>
                                        <Sparkles className="w-8 h-8 text-amber-900 dark:text-amber-100" aria-hidden="true" />
                                    </div>
                                </div>
                                <CardTitle className="text-2xl text-amber-900 dark:text-amber-100">
                                    {t.title}
                                </CardTitle>
                                <CardDescription className="text-amber-700 dark:text-amber-300">
                                    {locale === 'ko'
                                        ? '성경 말씀으로 응답합니다'
                                        : 'Receive Scripture responses'}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="recipient-name" className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                        {t.nameLabel}
                                    </label>
                                    <input
                                        id="recipient-name"
                                        type="text"
                                        value={recipientName}
                                        onChange={handleNameChange}
                                        placeholder={t.namePlaceholder}
                                        className="w-full px-2 py-3 border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100 placeholder:text-amber-500/60 dark:placeholder:text-amber-500/60 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                    />
                                    <p className="text-xs text-amber-600 dark:text-amber-400">
                                        {t.nameHint.replace('{name}', recipientName || '000')}
                                    </p>
                                </div>

                                <div className="relative">
                                    <Textarea
                                        value={prayerText}
                                        onChange={handleTextChange}
                                        placeholder={t.placeholder}
                                        className="min-h-[240px] resize-none border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100 placeholder:text-amber-500/60 dark:placeholder:text-amber-500/60 rounded-xl text-base leading-relaxed"
                                        autoFocus
                                    />
                                    <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-white/80 dark:bg-amber-950/80 px-2 py-1 rounded-lg">
                                        <span className="font-medium">{prayerText.length}</span>
                                        <span>/</span>
                                        <span>{LIMITS.MAX_TEXT_LENGTH}</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex-col gap-3">
                                <KakaoAdFit size="320x50" />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-14 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700 text-amber-900 font-semibold shadow-lg text-base"
                                    disabled={!prayerText.trim()}
                                >
                                    <Send className="mr-2 h-5 w-5" />
                                    {t.submit}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => router.push(`/${locale}`)}
                                    className="text-sm text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 py-2 flex items-center gap-2 font-medium transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    {t.cancel}
                                </button>
                            </CardFooter>
                        </Card>
                    </form>
                </motion.div>
            )}
        </>
    );
}

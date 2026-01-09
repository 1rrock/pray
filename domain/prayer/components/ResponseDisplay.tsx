'use client';

import React from 'react';
import { Book, Heart, Share2, Download, Home, Sparkles, Calendar, Church } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { AIResponse } from '../api/type';
import { CRISIS_RESOURCES } from '../api/constant';
import { useRouter, usePathname } from "next/navigation";
import { usePrayerStore } from '../store/prayerStore';
import { toast } from 'sonner';
import { InContentAd } from '@/shared/components/InContentAd';
import { KakaoAdFit } from '@/shared/components/KakaoAdFit';

interface ResponseDisplayProps {
    response: AIResponse;
    hasCrisis: boolean;
    onNewPrayer: () => void;
    locale?: 'ko' | 'en';
}

export function ResponseDisplay({
    response,
    hasCrisis,
    locale = 'ko',
}: ResponseDisplayProps) {
    const navigator = useRouter();
    const pathname = usePathname();
    const detectedLocale = locale || (pathname.startsWith('/en') ? 'en' : 'ko');
    const { currentPrayer, recipientName } = usePrayerStore();
    const { bibleVerse, guidance } = response;
    const [shortUrl, setShortUrl] = React.useState<string | null>(null);

    const today = new Date().toLocaleDateString(detectedLocale === 'ko' ? 'ko-KR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });

    const texts = {
        ko: {
            crisisTitle: '긴급 상담 안내',
            crisisDesc: '어려운 시간을 보내고 계신 것 같습니다. 전문가의 도움을 받으시길 권해드립니다.',
            responseTitle: (name: string | null) => name ? `${name}에게 전하는 말씀` : '성경 말씀 응답',
            verseInterpretation: '말씀 해석',
            myPrayer: '나의 기도',
            share: '공유하기',
            copiedUrl: '링크 복사',
            goHome: '처음으로',
            urlError: 'URL 생성에 실패했습니다.',
            copySuccess: '링크가 클립보드에 복사되었습니다!',
            copySuccessDesc: '원하는 곳에 붙여넣기(Ctrl+V)하여 공유하세요.',
            copyError: '복사에 실패했습니다.',
            copyErrorDesc: '다시 시도해주세요.',
        },
        en: {
            crisisTitle: 'Crisis Support',
            crisisDesc: 'It seems you may be going through a difficult time. We encourage you to reach out to professional help.',
            responseTitle: (name: string | null) => name ? `Scripture for ${name}` : 'Scripture Response',
            verseInterpretation: 'Scripture Interpretation',
            myPrayer: 'My Prayer',
            share: 'Share',
            copiedUrl: 'Copy Link',
            goHome: 'Home',
            urlError: 'Failed to generate URL.',
            copySuccess: 'Link copied to clipboard!',
            copySuccessDesc: 'Paste it (Ctrl+V) to share.',
            copyError: 'Copy failed.',
            copyErrorDesc: 'Please try again.',
        }
    };

    const t = texts[detectedLocale];

    const createShortUrl = async () => {
        if (shortUrl) {
            return shortUrl;
        }

        try {
            const response = await fetch('/api/share-prayer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    today,
                    book: bibleVerse.book,
                    chapter: bibleVerse.chapter,
                    verse: bibleVerse.verse,
                    text: bibleVerse.text,
                    guidance: guidance,
                    prayer: currentPrayer?.text || '',
                    recipientName: recipientName || undefined,
                    lang: detectedLocale,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setShortUrl(data.shortUrl);
                return data.shortUrl;
            }
        } catch (error) {
            console.error('Short URL generation error:', error);
        }
    };

    const handleShare = async () => {
        const shareUrl = await createShortUrl();

        if (!shareUrl) {
            toast.error(t.urlError);
            return;
        }

        const shareTitle = recipientName
            ? (detectedLocale === 'ko' ? `🙏 ${recipientName}에게 전하는 말씀` : `🙏 Scripture for ${recipientName}`)
            : (detectedLocale === 'ko' ? '🙏 성경 말씀 응답' : '🙏 Scripture Response');

        if (typeof window !== 'undefined' && window.navigator.share) {
            try {
                await window.navigator.share({
                    title: shareTitle,
                    url: shareUrl,
                });
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('Share error:', err);
                    await handleCopyToClipboard(shareUrl);
                }
            }
        } else {
            await handleCopyToClipboard(shareUrl);
        }
    };

    const handleSave = async () => {
        const shareUrl = await createShortUrl();

        if (!shareUrl) {
            toast.error(t.urlError);
            return;
        }

        await handleCopyToClipboard(shareUrl);
    };

    const handleCopyToClipboard = async (text: string) => {
        try {
            if (typeof window !== 'undefined' && window.navigator.clipboard) {
                await window.navigator.clipboard.writeText(text);
                toast.success(t.copySuccess, {
                    description: t.copySuccessDesc,
                    duration: 3000,
                });
            }
        } catch (err) {
            console.error('Clipboard error:', err);
            toast.error(t.copyError, {
                description: t.copyErrorDesc,
                duration: 3000,
            });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 px-2" id="prayer-response-card">
            {hasCrisis && (
                <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-3 text-xl">
                            <span className="text-3xl">⚠️</span>
                            {t.crisisTitle}
                        </CardTitle>
                        <CardDescription className="text-red-600 dark:text-red-400 text-base">
                            {t.crisisDesc}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Object.values(CRISIS_RESOURCES).map((resource) => (
                            <div key={resource.number}
                                className="flex items-center gap-3 bg-white dark:bg-red-950/30 p-3 rounded-xl border border-red-200 dark:border-red-800">
                                <span className="font-bold text-red-700 dark:text-red-400 min-w-[100px]">{resource.name}:</span>
                                <a
                                    href={`tel:${resource.number}`}
                                    className="text-red-800 dark:text-red-300 underline hover:text-red-900 dark:hover:text-red-200 font-semibold text-lg"
                                >
                                    {resource.number}
                                </a>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            <Card className="gap-0 border-2 border-amber-300 dark:border-amber-700 bg-gradient-to-b from-white via-amber-50/30 to-amber-100/50 dark:from-amber-950 dark:via-amber-900/50 dark:to-amber-900 shadow-2xl overflow-hidden">
                <CardHeader
                    className="relative bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 text-center space-y-4 pb-10 pt-8">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20" />
                    </div>

                    <div className="relative">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-white/95 dark:bg-amber-950/95 flex items-center justify-center shadow-2xl border-4 border-amber-200 dark:border-amber-800">
                                <Church className="w-10 h-10 text-amber-500 dark:text-amber-100" strokeWidth={2.5} />
                            </div>
                        </div>

                        <CardTitle className="text-3xl font-bold text-amber-900 dark:text-amber-950 mb-3">
                            {t.responseTitle(recipientName)}
                        </CardTitle>

                        <CardDescription className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-900 font-semibold text-base mt-3">
                            <Calendar className="w-4 h-4" />
                            {today}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8 pt-6 pb-8">
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 dark:from-amber-800/40 dark:via-yellow-800/40 dark:to-amber-800/40 rounded-2xl blur-sm" />
                            <div className="relative bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/60 dark:to-yellow-900/60 rounded-2xl p-6 text-center border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-500" />
                                </div>
                                <p className="text-xl font-bold text-amber-900 dark:text-amber-200 tracking-wide">
                                    {bibleVerse.book} {bibleVerse.chapter}:{bibleVerse.verse}
                                </p>
                            </div>
                        </div>

                        <blockquote className="relative bg-white/80 dark:bg-amber-950/40 rounded-2xl p-8 border-2 border-amber-200 dark:border-amber-800 shadow-md">
                            <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-600 dark:to-amber-700 rounded-full flex items-center justify-center border-2 border-white dark:border-amber-900 shadow-lg">
                                <span className="text-2xl text-amber-900 dark:text-amber-100 font-serif">&ldquo;</span>
                            </div>
                            <p className="text-xl leading-relaxed text-amber-900 dark:text-amber-100 text-center px-2 pt-4">
                                {bibleVerse.text}
                            </p>
                            <div className="absolute -bottom-4 right-8 w-12 h-12 bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-600 dark:to-amber-700 rounded-full flex items-center justify-center border-2 border-white dark:border-amber-900 shadow-lg">
                                <span className="text-2xl text-amber-900 dark:text-amber-100 font-serif">&rdquo;</span>
                            </div>
                        </blockquote>
                    </div>

                    <InContentAd />

                    <div className="flex items-center justify-center gap-4">
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent dark:via-amber-700 flex-1" />
                        <div className="flex gap-2">
                            <Heart className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-pulse" />
                            <Sparkles className="w-6 h-6 text-amber-500 fill-amber-500" />
                            <Heart className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </div>
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent dark:via-amber-700 flex-1" />
                    </div>

                    <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/40 dark:to-yellow-900/40 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                        <CardHeader className="pb-0">
                            <CardTitle className="flex items-center gap-3 text-amber-900 dark:text-amber-200 text-xl">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-600 dark:to-amber-700 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-amber-900 dark:text-amber-100" />
                                </div>
                                {t.verseInterpretation}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg leading-relaxed text-amber-900 dark:text-amber-200 whitespace-pre-wrap">
                                {guidance}
                            </p>
                        </CardContent>
                    </Card>

                    {currentPrayer && (
                        <Card className="border-l-4 border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-900/20">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                                    <Book className="w-5 h-5" />
                                    {t.myPrayer}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-amber-700 dark:text-amber-400 italic leading-relaxed">
                                    {currentPrayer.text}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>

                <CardFooter className="flex-col gap-4 pb-10 pt-0 bg-gradient-to-b from-transparent to-amber-50/50 dark:to-amber-950/50">
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Button
                            variant="outline"
                            onClick={handleShare}
                            className="h-14 border-2 border-amber-400 dark:border-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-100 font-semibold shadow-md text-base"
                        >
                            <Share2 className="mr-2 h-5 w-5" />
                            {t.share}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleSave}
                            className="h-14 border-2 border-amber-400 dark:border-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-100 font-semibold shadow-md text-base"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            {t.copiedUrl}
                        </Button>
                    </div>

                    <Button
                        onClick={() => navigator.push(`/${detectedLocale}`)}
                        size="lg"
                        className="w-full h-16 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700 text-amber-900 font-bold shadow-xl text-lg"
                    >
                        <Home className="mr-2 h-6 w-6" />
                        {t.goHome}
                    </Button>
                </CardFooter>
            </Card>
            <KakaoAdFit size="320x50" />
        </div>
    );
}

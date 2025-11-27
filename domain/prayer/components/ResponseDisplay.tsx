'use client';

import React from 'react';
import {Book, Heart, Share2, Download, Home, Sparkles, Calendar, Church} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/shared/components/ui/card';
import type {AIResponse} from '../api/type';
import {CRISIS_RESOURCES} from '../api/constant';
import {useRouter} from "next/navigation";
import {usePrayerStore} from '../store/prayerStore';
import {GoogleAd} from "@/shared/components/GoogleAd";
import { toast } from 'sonner';

interface ResponseDisplayProps {
    response: AIResponse;
    hasCrisis: boolean;
    onNewPrayer: () => void;
}

export function ResponseDisplay({
                                    response,
                                    hasCrisis,
                                }: ResponseDisplayProps) {
    const navigator = useRouter();
    const {currentPrayer, recipientName} = usePrayerStore();
    const {bibleVerse, guidance} = response;
    const [shortUrl, setShortUrl] = React.useState<string | null>(null);
    const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });

    // 공유 URL 가져오기 (짧은 URL이 있으면 짧은 URL, 없으면 긴 URL)
    const getShareUrl = () => {
        if (shortUrl) {
            return shortUrl;
        }
        // Fallback: 긴 URL
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const params = new URLSearchParams({
            today: today,
            book: bibleVerse.book,
            chapter: bibleVerse.chapter.toString(),
            verse: bibleVerse.verse.toString(),
            text: bibleVerse.text,
            guidance: guidance,
            prayer: currentPrayer?.text || '',
        });
        return `${baseUrl}/pray/scripture?${params.toString()}`;
    };

    const createShortUrl = async () => {
        // 이미 짧은 URL이 있으면 재사용
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
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // 생성된 URL을 상태에 저장
                setShortUrl(data.shortUrl);
                return data.shortUrl;
            }
        } catch (error) {
            console.error('Short URL generation error:', error);
        }
    };

    // 공유하기 버튼 핸들러
    const handleShare = async () => {
        // 짧은 URL 생성 (없으면 생성, 있으면 기존 것 사용)
        const shareUrl = await createShortUrl();


        if (!shareUrl) {
            toast.error('URL 생성에 실패했습니다.');
            return;
        }

        const shareTitle = recipientName
            ? `🙏 ${recipientName}에게 전하는 계시록`
            : '🙏 하나님의 계시';

        // Web Share API 지원 확인
        if (typeof window !== 'undefined' && window.navigator.share) {
            try {
                // URL만 공유 (복사 시 URL만 복사되도록)
                await window.navigator.share({
                    title: shareTitle,
                    url: shareUrl,
                });
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('Share error:', err);
                    // 공유 실패 시 클립보드에 URL만 복사
                    await handleCopyToClipboard(shareUrl);
                }
            }
        } else {
            // Web Share API 미지원 시 클립보드에 URL만 복사
            await handleCopyToClipboard(shareUrl);
        }
    };

    // 저장하기(URL 복사) 버튼 핸들러
    const handleSave = async () => {
        // 짧은 URL 생성 (없으면 생성, 있으면 기존 것 사용)
        const shareUrl = await createShortUrl();

        if (!shareUrl) {
            toast.error('URL 생성에 실패했습니다.');
            return;
        }

        await handleCopyToClipboard(shareUrl);
    };

    // 클립보드 복사
    const handleCopyToClipboard = async (text: string) => {
        try {
            if (typeof window !== 'undefined' && window.navigator.clipboard) {
                await window.navigator.clipboard.writeText(text);
                toast.success('링크가 클립보드에 복사되었습니다!', {
                    description: '원하는 곳에 붙여넣기(Ctrl+V)하여 공유하세요.',
                    duration: 3000,
                });
            }
        } catch (err) {
            console.error('Clipboard error:', err);
            toast.error('복사에 실패했습니다.', {
                description: '다시 시도해주세요.',
                duration: 3000,
            });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 px-4" id="prayer-response-card">
            {/* 위기 감지 카드 */}
            {hasCrisis && (
                <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-3 text-xl">
                            <span className="text-3xl">⚠️</span>
                            긴급 상담 안내
                        </CardTitle>
                        <CardDescription className="text-red-600 dark:text-red-400 text-base">
                            어려운 시간을 보내고 계신 것 같습니다. 전문가의 도움을 받으시길 권해드립니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Object.values(CRISIS_RESOURCES).map((resource) => (
                            <div key={resource.number}
                                 className="flex items-center gap-3 bg-white dark:bg-red-950/30 p-3 rounded-xl border border-red-200 dark:border-red-800">
                                <span
                                    className="font-bold text-red-700 dark:text-red-400 min-w-[100px]">{resource.name}:</span>
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

            {/* 메인 응답 카드 */}
            <Card className="border-2 border-amber-300 dark:border-amber-700 bg-gradient-to-b from-white via-amber-50/30 to-amber-100/50 dark:from-amber-950 dark:via-amber-900/50 dark:to-amber-900 shadow-2xl overflow-hidden gap-0">
                {/* 헤더 */}
                <CardHeader
                    className="relative bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 text-center space-y-4 pb-10 pt-8">
                    {/* 배경 장식 */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"/>
                        <div
                            className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"/>
                    </div>

                    <div className="relative">
                        {/* 아이콘 */}
                        <div className="flex justify-center mb-4">
                            <div
                                className="w-20 h-20 rounded-full bg-white/95 dark:bg-amber-950/95 flex items-center justify-center shadow-2xl border-4 border-amber-200 dark:border-amber-800">
                                <Church className="w-10 h-10 text-amber-500 dark:text-amber-100" strokeWidth={2.5}/>
                            </div>
                        </div>

                        {/* 계시록 타이틀 */}
                        <CardTitle className="text-3xl font-bold text-amber-900 dark:text-amber-950 mb-3">
                            {recipientName ? `${recipientName}에게 전하는 계시록` : '하나님의 계시록'}
                        </CardTitle>

                        <CardDescription
                            className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-900 font-semibold text-base mt-3">
                            <Calendar className="w-4 h-4"/>
                            {today}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8 pt-6 pb-8">
                    {/* 성경 구절 섹션 */}
                    <div className="space-y-6">
                        {/* 성경 위치 */}
                        <div className="relative">
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 dark:from-amber-800/40 dark:via-yellow-800/40 dark:to-amber-800/40 rounded-2xl blur-sm"/>
                            <div
                                className="relative bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/60 dark:to-yellow-900/60 rounded-2xl p-6 text-center border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400"/>
                                    <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-500"/>
                                </div>
                                <p className="text-xl font-bold text-amber-900 dark:text-amber-200 tracking-wide">
                                    {bibleVerse.book} {bibleVerse.chapter}:{bibleVerse.verse}
                                </p>
                            </div>
                        </div>

                        {/* 성경 본문 */}
                        <blockquote
                            className="relative bg-white/80 dark:bg-amber-950/40 rounded-2xl p-8 border-2 border-amber-200 dark:border-amber-800 shadow-md">
                            <div
                                className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-600 dark:to-amber-700 rounded-full flex items-center justify-center border-2 border-white dark:border-amber-900 shadow-lg">
                                <span className="text-2xl text-amber-900 dark:text-amber-100 font-serif">&ldquo;</span>
                            </div>
                            <p className="font-scripture text-xl leading-relaxed text-amber-900 dark:text-amber-100 text-center px-4 pt-4">
                                {bibleVerse.text}
                            </p>
                            <div
                                className="absolute -bottom-4 right-8 w-12 h-12 bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-600 dark:to-amber-700 rounded-full flex items-center justify-center border-2 border-white dark:border-amber-900 shadow-lg">
                                <span className="text-2xl text-amber-900 dark:text-amber-100 font-serif">&rdquo;</span>
                            </div>
                        </blockquote>
                    </div>

                    {/* 구분선 */}
                    <div className="flex items-center justify-center gap-4">
                        <div
                            className="h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent dark:via-amber-700 flex-1"/>
                        <div className="flex gap-2">
                            <Heart className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-pulse"/>
                            <Sparkles className="w-6 h-6 text-amber-500 fill-amber-500"/>
                            <Heart className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-pulse"
                                   style={{animationDelay: '0.5s'}}/>
                        </div>
                        <div
                            className="h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent dark:via-amber-700 flex-1"/>
                    </div>

                    <Card
                        className="bg-gradient-to-br gap-2 from-amber-50 to-yellow-50 dark:from-amber-900/40 dark:to-yellow-900/40 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                        <CardHeader className="pb-0">
                            <CardTitle className="flex items-center gap-3 text-amber-900 dark:text-amber-200 text-xl">
                                <div
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-600 dark:to-amber-700 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-amber-900 dark:text-amber-100"/>
                                </div>
                                하나님의 계시
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-guidance text-lg leading-relaxed text-amber-900 dark:text-amber-200 whitespace-pre-wrap">
                                {guidance}
                            </p>
                        </CardContent>
                    </Card>

                    {/* 나의 기도 */}
                    {currentPrayer && (
                        <Card
                            className="border-l-4 border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-900/20 gap-0">
                            <CardHeader className="pb-3">
                                <CardTitle
                                    className="text-base font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                                    <Book className="w-5 h-5"/>
                                    나의 기도
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

                <CardFooter
                    className="flex-col gap-4 pb-10 pt-6 bg-gradient-to-b from-transparent to-amber-50/50 dark:to-amber-950/50">
                    {/* 액션 버튼 */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Button
                            variant="outline"
                            onClick={handleShare}
                            className="h-14 border-2 border-amber-400 dark:border-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-100 font-semibold shadow-md text-base"
                        >
                            <Share2 className="mr-2 h-5 w-5"/>
                            공유하기
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleSave}
                            className="h-14 border-2 border-amber-400 dark:border-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-100 font-semibold shadow-md text-base"
                        >
                            <Download className="mr-2 h-5 w-5"/>
                            링크 복사
                        </Button>
                    </div>

                    {/* 처음으로 버튼 */}
                    <Button
                        onClick={() => {
                            navigator.push("/")
                        }}
                        size="lg"
                        className="w-full h-16 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700 text-amber-900 font-bold shadow-xl text-lg"
                    >
                        <Home className="mr-2 h-6 w-6"/>
                        처음으로
                    </Button>
                </CardFooter>
            </Card>

            {/* 광고 배너 영역 */}
            <GoogleAd
                slot="5375626932"
            />
        </div>
    );
}

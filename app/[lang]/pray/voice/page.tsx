import VoicePrayerClient from '@/domain/prayer/components/VoicePrayerClient';
import Link from 'next/link';
import Image from "next/image";
import logo from "@/app/logo.png";
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { InContentAd } from '@/shared/components/InContentAd';

export default async function VoicePrayerPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const dict = await getDictionary(locale);

    return (
        <div className="min-h-screen py-8 px-2">
            <main className="w-full max-w-3xl mx-auto space-y-8">
                {/* Simple logo header - matching main page */}
                <div className="flex justify-center">
                    <div
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
                        <Image src={logo} alt={dict.common.logo_alt} className="w-full h-full" />
                    </div>
                </div>

                <InContentAd />

                {/* Client interactive recorder */}
                <div className="flex justify-center w-full">
                    <VoicePrayerClient />
                </div>

                {/* Simple info card at bottom */}
                <div
                    className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30 space-y-4">
                    <div
                        className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/30">
                        <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                            💡 {locale === 'ko'
                                ? '음성 데이터는 암호화되어 처리되며, 응답 생성 후 즉시 삭제됩니다. '
                                : 'Your voice data is encrypted and deleted immediately after response generation. '}
                            {locale === 'ko'
                                ? <Link href={`/${locale}/privacy`}
                                    className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">개인정보처리방침</Link>
                                : <Link href={`/${locale}/privacy`}
                                    className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">Privacy
                                    Policy</Link>}
                            {locale === 'ko' && '을 참고해주세요.'}
                        </p>
                    </div>
                    <blockquote className="relative pl-6 py-2">
                        <div
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                        <p className="text-sm italic text-amber-800 dark:text-amber-200 leading-relaxed">
                            {locale === 'ko'
                                ? '"주의 말씀은 내 발에 등이요 내 길에 빛이니이다"'
                                : '"Your word is a lamp to my feet and a light to my path."'}
                        </p>
                        <cite
                            className="block text-xs text-amber-600 dark:text-amber-400 mt-2 not-italic font-semibold">
                            {locale === 'ko' ? '— 시편 119:105' : '— Psalm 119:105'}
                        </cite>
                    </blockquote>
                </div>
            </main>
        </div>
    );
}

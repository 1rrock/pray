import VoicePrayerClient from '@/domain/prayer/components/VoicePrayerClient';
import Link from 'next/link';
import Image from "next/image";
import logo from "@/app/logo.png";
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export default async function VoicePrayerPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const dict = await getDictionary(locale);

    return (
        <div className="min-h-screen py-8 px-4">
            <main className="w-full max-w-3xl mx-auto space-y-8">
                {/* Simple logo header - matching main page */}
                <div className="flex justify-center">
                    <div
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
                        <Image src={logo} alt={dict.common.logo_alt} className="w-full h-full" />
                    </div>
                </div>

                {/* Content area to satisfy AdSense content requirements */}
                <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 dark:border-amber-900/30 space-y-6">
                    <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                        {locale === 'ko' ? '목소리로 전하는 진심 어린 기도' : 'Sincere Prayer Delivered by Voice'}
                    </h2>
                    <div className="prose prose-amber dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4 text-sm leading-relaxed">
                        <p>
                            {locale === 'ko'
                                ? '우리의 목소리에는 글자로는 다 담을 수 없는 간절함과 마음의 떨림이 녹아 있습니다. 음성 기도는 가장 인간적이고 원초적인 하나님과의 소통 방식 중 하나입니다.'
                                : 'In our voices, there is a desperation and a trembling of the heart that cannot be fully captured in letters. Voice prayer is one of the most human and primal ways of communicating with God.'}
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                                    {locale === 'ko' ? '진솔한 고백' : 'Honest Confession'}
                                </h3>
                                <p>
                                    {locale === 'ko'
                                        ? '입 밖으로 소리 내어 드리는 기도는 우리의 생각을 정리해 줄 뿐만 아니라, 억눌려 있던 감정을 해소하고 영적인 자유를 느끼게 합니다.'
                                        : 'Prayer offered aloud not only helps organize our thoughts but also releases suppressed emotions and allows us to feel spiritual freedom.'}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                                    {locale === 'ko' ? '언제 어디서나' : 'Anytime, Anywhere'}
                                </h3>
                                <p>
                                    {locale === 'ko'
                                        ? '길을 걷거나 조용히 묵상할 때, 우리는 말로서 하나님을 찾을 수 있습니다. Amen AI는 당신의 음성을 소중히 듣고 그에 맞는 말씀을 전합니다.'
                                        : 'When walking or quietly meditating, we can seek God in words. Amen AI listens carefully to your voice and delivers the appropriate words.'}
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 pt-4 border-t border-amber-100 dark:border-amber-900/20 italic text-center">
                            {locale === 'ko'
                                ? '"주의 말씀은 내 발에 등이요 내 길에 빛이니이다" — 시편 119:105'
                                : '"Your word is a lamp to my feet and a light to my path." — Psalm 119:105'}
                        </p>
                    </div>
                </section>

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

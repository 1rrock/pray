import PrayerLandingClient from '@/domain/prayer/components/PrayerLandingClient';
import {InContentAd} from '@/shared/components/InContentAd';
import Image from "next/image";
import logo from '../logo.png';
import {Book, Shield, Sparkles, ChevronDown} from 'lucide-react';
import {type Locale} from '@/i18n/config';
import {getDictionary} from '@/i18n/get-dictionary';
import Link from "next/link";

export default async function Home({
                                       params,
                                   }: {
    params: Promise<{ lang: Locale }>;
}) {
    const {lang} = await params;
    const dict = await getDictionary(lang);

    return (
        <div className="dark:bg-gray-900 min-h-screen flex items-center flex-col justify-center py-12 px-4">
            <main id="main-content" className="w-full max-w-4xl" role="main" aria-label={`Amen ${dict.home.title}`}>
                {/* Hero Section */}
                <header className="text-center space-y-6 mb-12">
                    <div
                        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
                        <Image src={logo} alt={dict.common.logo_alt} className="w-full h-full"/>
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 dark:from-amber-300 dark:via-rose-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                            {dict.home.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            {dict.home.subtitle_line1}
                            <span className="block mt-1 text-amber-600 dark:text-amber-400 font-semibold">
                                {dict.home.subtitle_line2}
                            </span>
                        </p>
                    </div>
                </header>

                {/* CTA Section */}
                <div className="mb-16">
                    <PrayerLandingClient lang={lang}/>
                </div>

                {/* Features section */}
                <section className="mb-12 max-w-3xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-4">
                        <article
                            className="flex flex-col items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-shadow border border-amber-100 dark:border-amber-900/30">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-xl flex items-center justify-center mb-3">
                                <Book className="w-5 h-5 text-amber-700 dark:text-amber-300"/>
                            </div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">
                                {dict.home.feature1_title}
                            </h2>
                            <p className="text-xs text-center whitespace-pre text-gray-600 dark:text-gray-400 leading-relaxed">
                                {dict.home.feature1_desc}
                            </p>
                        </article>

                        <article
                            className="flex flex-col items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-shadow border border-amber-100 dark:border-amber-900/30">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-xl flex items-center justify-center mb-3">
                                <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-300"/>
                            </div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">
                                {dict.home.feature2_title}
                            </h2>
                            <p className="text-xs text-center whitespace-pre text-gray-600 dark:text-gray-400 leading-relaxed">
                                {dict.home.feature2_desc}
                            </p>
                        </article>

                        <article
                            className="flex flex-col items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-shadow border border-amber-100 dark:border-amber-900/30">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-xl flex items-center justify-center mb-3">
                                <Shield className="w-5 h-5 text-amber-700 dark:text-amber-300"/>
                            </div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">
                                {dict.home.feature3_title}
                            </h2>
                            <p className="text-xs text-center whitespace-pre text-gray-600 dark:text-gray-400 leading-relaxed">
                                {dict.home.feature3_desc}
                            </p>
                        </article>
                    </div>
                </section>

                <InContentAd className="max-w-3xl mx-auto" />

                {/* How it works section */}
                <details className="mb-8 max-w-3xl mx-auto group">
                    <summary className="cursor-pointer list-none">
                        <div
                            className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-all border border-amber-100 dark:border-amber-900/30">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {lang === 'ko' ? '어떻게 사용하나요?' : 'How does it work?'}
                            </h2>
                            <ChevronDown
                                className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-transform group-open:rotate-180"/>
                        </div>
                    </summary>
                    <div
                        className="mt-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-md">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                        {lang === 'ko' ? '기도 방법 선택' : 'Choose Prayer Method'}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {lang === 'ko' ? '음성 또는 텍스트로 기도하는 방법 선택' : 'Choose to pray by voice or text'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-md">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                        {lang === 'ko' ? '기도 제목 입력' : 'Enter Your Prayer'}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {lang === 'ko' ? '마음 속 기도 제목이나 고민을 자유롭게 입력' : 'Freely share your prayers and concerns'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-md">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                        {lang === 'ko' ? '말씀 응답 받기' : 'Receive Scripture Response'}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {lang === 'ko'
                                            ? 'AI가 분석하여 적합한 성경 구절과 해석을 제공합니다'
                                            : 'AI analyzes and provides relevant Bible verses and interpretation'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </main>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-amber-200 dark:border-amber-900/30 max-w-4xl mx-auto w-full">
                <nav
                    className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                    <Link
                        href={`/${lang}/about`}
                        className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                        {dict.footer.about}
                    </Link>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                    <Link
                        href={`/${lang}/privacy`}
                        className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                        {dict.footer.privacy}
                    </Link>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                    <a
                        href="mailto:zxcv1685@gmail.com"
                        className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                        {dict.footer.contact}
                    </a>
                </nav>
                <p className="text-center text-xs text-gray-500 dark:text-gray-500">
                    {dict.footer.copyright}
                </p>
            </footer>
        </div>
    );
}


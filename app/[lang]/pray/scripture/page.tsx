import React, { Suspense } from 'react';
import ScriptureClient from '@/domain/prayer/components/ScriptureClient';
import Image from "next/image";
import logo from "@/app/logo.png";
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export default async function ScripturePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const dict = await getDictionary(locale);

    return (
        <div className="min-h-screen flex items-center justify-center py-8">
            <main className="w-full max-w-4xl">
                <header className="flex justify-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
                        <Image src={logo} alt={dict.common.logo_alt} className="w-full h-full" />
                    </div>
                </header>

                <Suspense fallback={
                    <div className="flex items-center justify-center py-20">
                        <div className="text-amber-600 dark:text-amber-400 text-xl">
                            {locale === 'ko' ? '로딩 중...' : 'Loading...'}
                        </div>
                    </div>
                }>
                    <ScriptureClient />
                </Suspense>

                {/* Static note for crawlers/reviewers */}
                <section className="mt-8 text-sm text-amber-600 dark:text-amber-400">
                    <p className="text-center">
                        {locale === 'ko'
                            ? '이 페이지는 기도 응답으로 생성된 성경 구절과 해석을 표시합니다. 공유 URL로도 내용을 확인할 수 있습니다.'
                            : 'This page displays Scripture verses and interpretations generated from prayer responses. You can also view the content via shared URLs.'}
                    </p>
                </section>
            </main>
        </div>
    );
}


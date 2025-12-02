import React, {Suspense} from 'react';
import ScriptureClient from '@/domain/prayer/components/ScriptureClient';
import Image from "next/image";
import logo from "@/app/logo.png";

export default function ScripturePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center py-8">
            <main className="w-full max-w-4xl">
                <header className="flex justify-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
                        <Image src={logo} alt="Selah 로고" className="w-full h-full" />
                    </div>
                </header>

                <Suspense fallback={
                    <div className="flex items-center justify-center py-20">
                        <div className="text-amber-600 text-xl">로딩 중...</div>
                    </div>
                }>
                    <ScriptureClient />
                </Suspense>

                {/* Static note for crawlers/reviewers */}
                <section className="mt-8 text-sm text-amber-600 dark:text-amber-400">
                    <p className="text-center">이 페이지는 기도 응답으로 생성된 성경 구절과 해석을 표시합니다. 공유 URL로도 내용을 확인할 수 있습니다.</p>
                </section>
            </main>
        </div>
    );
}

import {Suspense} from 'react';
import ScriptureClient from '@/domain/prayer/components/ScriptureClient';

export default function ScripturePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center py-8">
            <main className="w-full max-w-4xl">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">응답된 성경 구절</h1>
                    <p className="mt-2 text-amber-700 dark:text-amber-300">Gido AI가 기도에 응답해 선택한 성경 구절과 해석을 제공합니다. 기도 내용과 함께 제공되는 성경 말씀을 통해 영적 인도를 받으세요.</p>
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
                    <p>이 페이지는 기도 응답으로 생성된 성경 구절과 해석을 표시합니다. 공유 URL로도 내용을 확인할 수 있습니다.</p>
                </section>
            </main>
        </div>
    );
}

import React from 'react';
import TextPrayerClient from '@/domain/prayer/components/TextPrayerClient';

export default function TextPrayerPage() {
    return (
        <div className="h-dvh flex justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl">
                {/* SEO-friendly static content for crawlers */}
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">글로 기도하기</h1>
                    <p className="mt-2 text-amber-700 dark:text-amber-300">
                        하나님께 드릴 기도를 글로 작성하면, 성경 말씀으로 하나님의 계시를 전달해드립니다.
                    </p>
                </header>

                {/* Interactive section description */}
                <section className="mb-6 text-amber-800 dark:text-amber-200">
                    <h2 className="text-xl font-semibold mb-2">기도 작성 가이드</h2>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>기도할 내용을 자유롭게 작성해주세요</li>
                        <li>고민이나 감사한 일, 간구하는 내용 등 모두 가능합니다</li>
                        <li>최대 1,000자까지 입력 가능합니다</li>
                        <li>AI가 기도 내용을 분석하여 적합한 성경 구절로 응답합니다</li>
                    </ul>
                </section>

                {/* Client interactive form */}
                <TextPrayerClient />

                {/* Additional informative content */}
                <section className="mt-8 space-y-4 text-sm text-amber-700 dark:text-amber-300">
                    <h3 className="font-semibold text-base">기도 응답 받기</h3>
                    <p>
                        Gido AI는 당신의 기도를 신중히 분석하여 성경 말씀 중 가장 적합한 구절을 선택합니다.
                        기도가 제출되면 하나님의 계시를 담은 성경 구절과 해석을 받으실 수 있습니다.
                    </p>
                    <blockquote className="italic border-l-4 border-amber-400 pl-4">
                        &quot;구하라, 그리하면 너희에게 주실 것이요, 찾으라, 그리하면 찾아낼 것이요,
                        문을 두드리라, 그리하면 너희에게 열릴 것이니&quot; - 마태복음 7:7
                    </blockquote>
                </section>
            </div>
        </div>
    );
}

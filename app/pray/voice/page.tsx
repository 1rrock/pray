import VoicePrayerClient from '@/domain/prayer/components/VoicePrayerClient';

export default function VoicePrayerPage() {
    return (
        <div className="h-dvh flex justify-center p-4 overflow-y-auto">
            <main className="w-full max-w-2xl">
                {/* SEO-friendly static content for crawlers */}
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">음성으로 기도하기</h1>
                    <p className="mt-2 text-amber-700 dark:text-amber-300">
                        마이크를 통해 음성으로 기도하면, AI가 자동으로 텍스트로 변환하여 성경 말씀으로 응답해드립니다.
                    </p>
                </header>

                {/* How to use section */}
                <section className="mb-6 text-amber-800 dark:text-amber-200">
                    <h2 className="text-xl font-semibold mb-2">음성 기도 사용 방법</h2>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>마이크 버튼을 누르고 기도 내용을 말씀해주세요</li>
                        <li>브라우저에서 마이크 권한을 허용해주세요</li>
                        <li>조용한 환경에서 명확하게 말씀하시면 더 정확합니다</li>
                        <li>녹음이 완료되면 자동으로 텍스트로 변환됩니다</li>
                        <li>변환된 텍스트를 확인하고 제출하시면 응답을 받으실 수 있습니다</li>
                    </ol>
                </section>

                {/* Client interactive recorder */}
                <VoicePrayerClient/>

                {/* Additional informative content */}
                <section className="mt-8 space-y-4 text-sm text-amber-700 dark:text-amber-300">
                    <h3 className="font-semibold text-base">음성 인식 기술</h3>
                    <p>
                        Gido AI는 최신 음성 인식 기술을 사용하여 한국어 음성을 정확하게 텍스트로 변환합니다.
                        변환된 텍스트는 서버에 저장되지 않으며, 기도 응답 생성 후 즉시 삭제됩니다.
                    </p>
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">개인정보 보호</h4>
                        <p>
                            음성 데이터와 기도 내용은 안전하게 처리되며, 응답 생성 후 즉시 삭제됩니다.
                            자세한 내용은 <a href="/privacy" className="underline hover:text-amber-900 dark:hover:text-amber-100">개인정보처리방침</a>을 참고해주세요.
                        </p>
                    </div>
                    <blockquote className="italic border-l-4 border-amber-400 pl-4">
                        &quot;주의 말씀은 내 발에 등이요 내 길에 빛이니이다&quot; - 시편 119:105
                    </blockquote>
                </section>
            </main>
        </div>
    );
}

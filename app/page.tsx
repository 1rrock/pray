import PrayerLandingClient from '@/domain/prayer/components/PrayerLandingClient';
import Image from "next/image";
import logo from './logo.png';

export default function Home() {
    return (
        <div className="dark:bg-gray-900 p-4 h-dvh flex items-center flex-col justify-center">
            <main id="main-content" className="w-full max-w-lg" role="main" aria-label="Gido 기도 AI 메인 페이지">
                {/* Server-rendered header and description for SEO / crawlers */}
                <header className="text-center space-y-4 mb-6">
                    <div
                        className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden"
                    >
                        <Image src={logo} alt="logo" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gido AI</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-base">
                        당신의 <strong>기도</strong>에<br />
                        <strong className="text-amber-600 dark:text-amber-400">하나님의 계시</strong>로 응답합니다
                    </p>
                </header>

                {/* Client-only interactive input (buttons / navigation) */}
                <PrayerLandingClient />

                {/* Server-rendered scripture / quote for crawlers */}
                <blockquote className="text-center text-sm text-amber-700 dark:text-amber-400 px-4 mt-6" role="contentinfo">
                    <p>&quot;구하라, 그리하면 너희에게 주실 것이요, 찾으라, 그리하면 찾아낼 것이요, 문을 두드리라, 그리하면 너희에게 열릴 것이니&quot;</p>
                    <cite className="block mt-1">- 마태복음 7:7</cite>
                </blockquote>
            </main>
        </div>
    );
}

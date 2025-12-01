import PrayerLandingClient from '@/domain/prayer/components/PrayerLandingClient';
import Image from "next/image";
import logo from './logo.png';
import {Book, Shield, Sparkles, ChevronDown} from 'lucide-react';

export default function Home() {
    return (
        <div className="dark:bg-gray-900 min-h-screen flex items-center flex-col justify-center py-12 px-4">
            <main id="main-content" className="w-full max-w-4xl" role="main" aria-label="Gido 기도 AI 메인 페이지">
                {/* Hero Section - Simplified */}
                <header className="text-center space-y-6 mb-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
                        <Image src={logo} alt="Gido AI 로고" className="w-full h-full" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                            기도 AI
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            당신의 기도에
                            <span className="block mt-1 text-amber-600 dark:text-amber-400 font-semibold">
                                하나님의 계시로 응답합니다
                            </span>
                        </p>
                    </div>
                </header>

                {/* CTA Section - Primary Action */}
                <div className="mb-16">
                    <PrayerLandingClient />
                </div>

                {/* Features section - Minimal cards */}
                <section className="mb-12 max-w-3xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-4">
                        <article className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-shadow border border-amber-100 dark:border-amber-900/30">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-xl flex items-center justify-center mb-3">
                                <Book className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                            </div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">성경 말씀 응답</h2>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                AI가 기도를 분석하여 적합한 성경 구절과 해석 제공
                            </p>
                        </article>

                        <article className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-shadow border border-amber-100 dark:border-amber-900/30">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-xl flex items-center justify-center mb-3">
                                <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                            </div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">텍스트 & 음성</h2>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                글 또는 음성으로 편리하게 기도 가능
                            </p>
                        </article>

                        <article className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-shadow border border-amber-100 dark:border-amber-900/30">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-xl flex items-center justify-center mb-3">
                                <Shield className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                            </div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">개인정보 보호</h2>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                암호화 처리 후 응답 즉시 삭제
                            </p>
                        </article>
                    </div>
                </section>

                {/* Scripture quote - Elegant design */}
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <blockquote className="relative">
                        <div className="absolute -top-2 -left-2 text-6xl text-amber-200 dark:text-amber-900 font-serif leading-none">&ldquo;</div>
                        <p className="text-base md:text-lg text-amber-800 dark:text-amber-300 font-serif italic px-8 py-4 leading-relaxed">
                            구하라, 그리하면 너희에게 주실 것이요, 찾으라, 그리하면 찾아낼 것이요, 문을 두드리라, 그리하면 너희에게 열릴 것이니
                        </p>
                        <cite className="block text-sm text-amber-700 dark:text-amber-400 font-semibold mt-2 not-italic">
                            — 마태복음 7:7
                        </cite>
                    </blockquote>
                </div>

                {/* Collapsible How it works section */}
                <details className="mb-8 max-w-3xl mx-auto group">
                    <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-all border border-amber-100 dark:border-amber-900/30">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                어떻게 사용하나요?
                            </h2>
                            <ChevronDown className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-transform group-open:rotate-180" />
                        </div>
                    </summary>
                    <div className="mt-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-md">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">기도 방법 선택</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        음성 또는 텍스트로 기도하는 방법 선택
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-md">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">기도 내용 입력</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        고민, 감사, 간구 등 자유롭게 표현
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-md">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">계시 받기</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        AI가 선택한 성경 구절과 해석 확인
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-md">
                                    4
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">공유 및 저장</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        받은 응답을 링크로 저장하거나 공유
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>

                {/* Collapsible FAQ section */}
                <details className="mb-8 max-w-3xl mx-auto group">
                    <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg transition-all border border-amber-100 dark:border-amber-900/30">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                자주 묻는 질문
                            </h2>
                            <ChevronDown className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-transform group-open:rotate-180" />
                        </div>
                    </summary>
                    <div className="mt-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30 space-y-5">
                        <article>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Gido AI란?</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                AI 기술을 활용하여 기도를 분석하고 성경 말씀으로 응답하는 서비스입니다.
                                언제 어디서나 하나님의 말씀을 통한 영적 인도를 받을 수 있습니다.
                            </p>
                        </article>

                        <article>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">누구를 위한 서비스인가요?</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                기독교 신앙을 가진 모든 분들을 위한 서비스입니다.
                                하나님의 뜻을 구하고, 성경 말씀을 통해 위로와 인도를 받고 싶은 분께 유용합니다.
                            </p>
                        </article>

                        <article>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">안전하고 신뢰할 수 있나요?</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                네, 모든 기도 내용은 암호화되어 전송되며 응답 생성 후 즉시 삭제됩니다.
                                서버에는 어떠한 기도 내용도 저장하지 않습니다.{' '}
                                <a href="/privacy" className="text-amber-600 dark:text-amber-400 underline hover:text-amber-700">
                                    개인정보처리방침 보기
                                </a>
                            </p>
                        </article>
                    </div>
                </details>

                {/* Clean footer */}
                <footer className="mt-12 pt-8 border-t border-amber-200 dark:border-amber-900/30">
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                        <a href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                            서비스 소개
                        </a>
                        <a href="/privacy" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                            개인정보처리방침
                        </a>
                        <a href="mailto:zxcv1685@gmail.com" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                            문의하기
                        </a>
                    </nav>
                    <p className="text-center text-xs text-gray-500 dark:text-gray-500">
                        © 2025 Gido AI. All rights reserved.
                    </p>
                </footer>

            </main>
        </div>
    );
}

import React from 'react';
import TextPrayerClient from '@/domain/prayer/components/TextPrayerClient';
import {PageHeader} from '@/shared/components/PageHeader';
import Image from "next/image";
import logo from "@/app/logo.png";

export default function TextPrayerPage() {
    return (
        <div className="min-h-screen py-8 px-4">
            <div className="w-full max-w-3xl mx-auto space-y-6">
                <header className="text-center space-y-6 mb-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
                        <Image src={logo} alt="Gido AI 로고" className="w-full h-full" />
                    </div>
                </header>

                {/* Client interactive form */}
                <div className="flex justify-center w-full">
                    <TextPrayerClient />
                </div>

                {/* Simple info card at bottom - same style as voice page */}
                <div className="mt-8 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30 space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/30">
                        <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                            💡 기도 내용과 입력하신 이름은 암호화되어 처리되며, 응답 생성 후 즉시 삭제됩니다.
                            자세한 내용은 <a href="/privacy" className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">개인정보처리방침</a>을 참고해주세요.
                        </p>
                    </div>
                    <blockquote className="relative pl-6 py-2">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                        <p className="text-sm italic text-amber-800 dark:text-amber-200 leading-relaxed">
                            &quot;구하라, 그리하면 너희에게 주실 것이요, 찾으라, 그리하면 찾아낼 것이요,
                            문을 두드리라, 그리하면 너희에게 열릴 것이니&quot;
                        </p>
                        <cite className="block text-xs text-amber-600 dark:text-amber-400 mt-2 not-italic font-semibold">
                            — 마태복음 7:7
                        </cite>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

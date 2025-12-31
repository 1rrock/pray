import React from 'react';
import TextPrayerClient from '@/domain/prayer/components/TextPrayerClient';
import Image from "next/image";
import logo from "@/app/logo.png";
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import Link from "next/link";

export default async function TextPrayerPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const dict = await getDictionary(locale);

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="w-full max-w-3xl mx-auto space-y-8">
                {/* Simple logo header - matching main page */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
                        <Image src={logo} alt={dict.common.logo_alt} className="w-full h-full" />
                    </div>
                </div>

                {/* Content area to satisfy AdSense content requirements */}
                <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 dark:border-amber-900/30 space-y-6">
                    <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                        {locale === 'ko' ? '기도의 힘과 소통' : 'The Power of Prayer and Communication'}
                    </h2>
                    <div className="prose prose-amber dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4 text-sm leading-relaxed">
                        <p>
                            {locale === 'ko'
                                ? '기도는 단순히 요구를 전달하는 것이 아니라, 하나님과의 깊은 대화이자 영적인 호흡입니다. Amen AI는 기술을 통해 당신의 마음을 성경의 지혜와 연결하는 징검다리 역할을 합니다.'
                                : 'Prayer is not just conveying requests; it is a deep conversation with God and spiritual breathing. Amen AI acts as a bridge connecting your heart with the wisdom of the Bible through technology.'}
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                                    {locale === 'ko' ? '마음의 평안' : 'Peace of Mind'}
                                </h3>
                                <p>
                                    {locale === 'ko'
                                        ? '우리는 끊임없이 변화하는 세상 속에서 불안을 느낍니다. 기도는 우리를 영원한 진리 위에 세우고, 세상이 줄 수 없는 평안을 선사합니다.'
                                        : 'We feel anxious in a constantly changing world. Prayer establishes us on eternal truth and gives peace that the world cannot provide.'}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                                    {locale === 'ko' ? '영적 인도' : 'Spiritual Guidance'}
                                </h3>
                                <p>
                                    {locale === 'ko'
                                        ? '때로는 어떤 길을 가야 할지 막막할 때가 있습니다. 성경 말씀은 우리의 길에 빛이 되어주며, 매일의 선택 속에서 올바른 방향을 제시합니다.'
                                        : 'Sometimes we are at a loss as to which path to take. Scripture becomes a light to our path and provides the right direction in our daily choices.'}
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 pt-4 border-t border-amber-100 dark:border-amber-900/20 italic">
                            {locale === 'ko'
                                ? '아래에서 마음속의 기도를 텍스트로 자유롭게 작성해 보세요. 당신의 상황에 꼭 맞는 하나님의 위로와 인도의 말씀을 성경에서 찾아 전해드립니다.'
                                : 'Feel free to write your heart\'s prayer in text below. We will find and deliver God\'s words of comfort and guidance from the Bible that perfectly fit your situation.'}
                        </p>
                    </div>
                </section>

                {/* Client interactive form */}
                <div className="flex justify-center w-full">
                    <TextPrayerClient />
                </div>

                {/* Simple info card at bottom - same style as voice page */}
                <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30 space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/30">
                        <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                            💡 {locale === 'ko'
                                ? '기도 내용과 입력하신 이름은 암호화되어 처리되며, 응답 생성 후 즉시 삭제됩니다. '
                                : 'Your prayers and name are encrypted and deleted immediately after response generation. '}
                            {locale === 'ko'
                                ? <Link href={`/${locale}/privacy`} className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">개인정보처리방침</Link>
                                : <Link href={`/${locale}/privacy`} className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">Privacy Policy</Link>}
                            {locale === 'ko' && '을 참고해주세요.'}
                        </p>
                    </div>
                    <blockquote className="relative pl-6 py-2">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                        <p className="text-sm italic text-amber-800 dark:text-amber-200 leading-relaxed">
                            {locale === 'ko'
                                ? '"구하라, 그리하면 너희에게 주실 것이요, 찾으라, 그리하면 찾아낼 것이요, 문을 두드리라, 그리하면 너희에게 열릴 것이니"'
                                : '"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."'}
                        </p>
                        <cite className="block text-xs text-amber-600 dark:text-amber-400 mt-2 not-italic font-semibold">
                            {locale === 'ko' ? '— 마태복음 7:7' : '— Matthew 7:7'}
                        </cite>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}


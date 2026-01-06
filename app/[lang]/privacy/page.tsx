"use client";
import logo from "@/app/logo.png";
import Image from "next/image";
import {ArrowLeft} from "lucide-react";
import React from "react";
import {useRouter, usePathname} from "next/navigation";
import { type Locale } from '@/i18n/config';
import { InContentAd } from '@/shared/components/InContentAd';

export default function PrivacyPage() {
    const router = useRouter();
    const pathname = usePathname();
    const locale: Locale = pathname.startsWith('/en') ? 'en' : 'ko';

    const isKo = locale === 'ko';

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 py-12 px-4">
            <div className="mx-auto max-w-4xl bg-white dark:bg-amber-950/90 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-10 md:p-14">
                    <header className="text-center border-b pb-8 mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden">
                            <Image src={logo} alt="logo"/>
                        </div>
                        <h1 className="text-3xl font-extrabold text-amber-900 dark:text-amber-100">
                            {isKo ? '개인정보처리방침' : 'Privacy Policy'}
                        </h1>
                        <p className="mt-3 text-amber-700 dark:text-amber-300">
                            {isKo
                                ? '사용자의 개인정보 보호를 중요시하며, 투명하게 수집·이용·파기합니다.'
                                : 'We protect your privacy and handle your information transparently.'}
                        </p>
                    </header>

                    <div className="prose dark:prose-invert max-w-none text-amber-800 dark:text-amber-200">
                        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-6 border-l-4 border-amber-300 mb-6">
                            <strong>Amen AI</strong>
                            {isKo
                                ? '는 사용자의 기도와 신앙 생활을 소중히 여기며, 개인정보 보호를 최우선으로 생각합니다. 본 개인정보처리방침은 관련 법령을 준수합니다.'
                                : ' values your spiritual life and prioritizes protecting your personal information. This Privacy Policy complies with applicable laws.'}
                        </div>

                        <h2>{isKo ? '1. 개인정보의 수집 및 이용 목적' : '1. Collection and Use of Personal Information'}</h2>
                        <p>{isKo ? 'Amen AI는 다음의 목적을 위해 개인정보를 처리합니다:' : 'We process your information for:'}</p>
                        <ul>
                            <li><strong>{isKo ? '서비스 제공:' : 'Service Provision:'}</strong> {isKo ? '기도 요청에 대한 AI 응답 생성 및 제공' : 'Generating and providing AI responses to prayer requests'}</li>
                            <li><strong>{isKo ? '서비스 개선:' : 'Service Improvement:'}</strong> {isKo ? 'AI 모델 개선 및 서비스 품질 향상' : 'Improving AI models and service quality'}</li>
                            <li><strong>{isKo ? '통계 분석:' : 'Analytics:'}</strong> {isKo ? '서비스 이용 현황 분석 (개인 식별 불가능한 형태)' : 'Service usage analysis (non-identifying)'}</li>
                        </ul>

                        <h2>{isKo ? '2. 수집하는 개인정보의 항목' : '2. Information We Collect'}</h2>
                        <h3>{isKo ? '2.1 필수 수집 항목' : '2.1 Required Information'}</h3>
                        <ul>
                            <li><strong>{isKo ? '기도 내용:' : 'Prayer Content:'}</strong> {isKo ? '사용자가 입력하는 기도문' : 'Prayer text you provide'}</li>
                            <li><strong>{isKo ? '접속 정보:' : 'Access Information:'}</strong> {isKo ? 'IP 주소, 접속 일시' : 'IP address, access time'}</li>
                        </ul>

                        <h2>{isKo ? '3. 개인정보의 보유 및 이용 기간' : '3. Data Retention'}</h2>
                        <ul>
                            <li><strong>{isKo ? '기도 내용:' : 'Prayer Content:'}</strong> {isKo ? '응답 생성 후 즉시 삭제' : 'Deleted immediately after response generation'}</li>
                            <li><strong>{isKo ? '접속 로그:' : 'Access Logs:'}</strong> {isKo ? '수집일로부터 3개월' : '3 months from collection'}</li>
                        </ul>

                        <h2>{isKo ? '4. 개인정보의 안전성 확보 조치' : '4. Security Measures'}</h2>
                        <ul>
                            <li><strong>{isKo ? '기술적 조치:' : 'Technical:'}</strong> {isKo ? 'HTTPS 암호화 통신' : 'HTTPS encryption'}</li>
                            <li><strong>{isKo ? '관리적 조치:' : 'Administrative:'}</strong> {isKo ? '개인정보 접근 권한 최소화' : 'Minimal access controls'}</li>
                        </ul>

                        <h2>{isKo ? '5. 개인정보 보호책임자' : '5. Privacy Contact'}</h2>
                        <div className="mt-6 rounded-lg bg-amber-600 text-white p-6">
                            <h3 className="text-lg font-semibold">📧 {isKo ? '문의처' : 'Contact'}</h3>
                            <p><strong>Email:</strong> zxcv1685@gmail.com</p>
                            <p><strong>{isKo ? '응답 시간:' : 'Response Time:'}</strong> {isKo ? '영업일 기준 3일 이내' : 'Within 3 business days'}</p>
                        </div>

                        <InContentAd 
                            adUnit="DAN-KjikwPCf2qoxvvyj"
                            width={300}
                            height={250}
                        />

                        <InContentAd 
                            adUnit="DAN-KjikwPCf2qoxvvyj"
                            width={300}
                            height={250}
                        />

                        <div className="mt-8 text-center">
                            <div className="italic text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/10 p-6 rounded-lg mb-6">
                                {isKo
                                    ? '"너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라" — 베드로전서 5:7'
                                    : '"Cast all your anxiety on him because he cares for you." — 1 Peter 5:7'}
                            </div>

                            <button
                                type="button"
                                onClick={() => router.push(locale === 'ko' ? '/ko' : '/en')}
                                className="text-sm text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 py-2 flex items-center gap-2 font-medium transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4"/>
                                {isKo ? '처음으로' : 'Back Home'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


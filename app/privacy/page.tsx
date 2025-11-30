"use client";
import type {Metadata} from 'next';
import logo from "@/app/logo.png";
import Image from "next/image";
import {ArrowLeft} from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";

export default function PrivacyPage() {
    const router = useRouter();

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 py-12 px-4">
            <div className="mx-auto max-w-4xl bg-white dark:bg-amber-950/90 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-10 md:p-14">
                    <header className="text-center border-b pb-8 mb-8">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden"
                        >
                            <Image src={logo} alt="logo"/>
                        </div>
                        <h1 className="text-3xl font-extrabold text-amber-900 dark:text-amber-100">개인정보처리방침</h1>
                        <p className="mt-3 text-amber-700 dark:text-amber-300">사용자의 개인정보 보호를 중요시하며, 투명하게
                            수집·이용·파기합니다.</p>
                    </header>

                    <div className="prose dark:prose-invert max-w-none text-amber-800 dark:text-amber-200">
                        <div
                            className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-6 border-l-4 border-amber-300 mb-6">
                            <strong>Gido AI</strong>는 사용자의 기도와 신앙 생활을 소중히 여기며, 개인정보 보호를 최우선으로 생각합니다. 본 개인정보처리방침은 관련 법령을
                            준수합니다.
                        </div>

                        <h2>1. 개인정보의 수집 및 이용 목적</h2>
                        <p>Gido AI는 다음의 목적을 위해 개인정보를 처리합니다:</p>
                        <ul>
                            <li><strong>서비스 제공:</strong> 기도 요청에 대한 AI 응답 생성 및 제공</li>
                            <li><strong>서비스 개선:</strong> AI 모델 개선 및 서비스 품질 향상</li>
                            <li><strong>통계 분석:</strong> 서비스 이용 현황 분석 (개인 식별 불가능한 형태)</li>
                            <li><strong>문의 응대:</strong> 사용자 문의사항 처리 및 공지사항 전달</li>
                        </ul>

                        <h2>2. 수집하는 개인정보의 항목</h2>
                        <h3>2.1 필수 수집 항목</h3>
                        <ul>
                            <li><strong>기도 내용:</strong> 사용자가 입력하는 기도문 및 질문</li>
                            <li><strong>접속 정보:</strong> IP 주소, 접속 일시, 서비스 이용 기록</li>
                        </ul>
                        <h3>2.2 선택 수집 항목</h3>
                        <ul>
                            <li><strong>이메일 주소:</strong> 문의사항 응답을 위한 연락처 (선택 제공 시)</li>
                        </ul>
                        <h3>2.3 자동 수집 항목</h3>
                        <ul>
                            <li>쿠키, 접속 로그, 기기 정보, OS 정보, 브라우저 정보</li>
                        </ul>

                        <h2>3. 개인정보의 보유 및 이용 기간</h2>
                        <div className="rounded-md bg-amber-100 dark:bg-amber-900/10 p-4 mb-4">
                            <p className="font-semibold">기본 원칙: 수집 및 이용 목적이 달성되면 지체없이 파기합니다.</p>
                        </div>
                        <ul>
                            <li><strong>기도 내용:</strong> 응답 생성 후 즉시 삭제 (서버에 저장하지 않음)</li>
                            <li><strong>접속 로그:</strong> 수집일로부터 3개월</li>
                            <li><strong>문의 내역:</strong> 문의 처리 완료 후 1년</li>
                        </ul>

                        <p>다만, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다:</p>
                        <ul>
                            <li>통신비밀보호법: 접속 로그 기록 - 3개월</li>
                            <li>전자상거래법: 소비자 불만 또는 분쟁처리 기록 - 3년</li>
                        </ul>

                        <h2>4. 개인정보의 제3자 제공</h2>
                        <p>Gido AI는 원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우 예외로 합니다:</p>
                        <ul>
                            <li>사용자의 사전 동의를 받은 경우</li>
                            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                        </ul>

                        <h2>5. 개인정보 처리의 위탁</h2>
                        <p>Gido AI는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다:</p>

                        <div className="overflow-x-auto my-6">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-amber-50 dark:bg-amber-900/10">
                                    <th className="p-3 border-b">수탁업체</th>
                                    <th className="p-3 border-b">위탁 업무</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border-b">
                                    <td className="p-3">Anthropic (Claude AI)</td>
                                    <td className="p-3">AI 응답 생성 서비스</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3">Vercel</td>
                                    <td className="p-3">웹 호스팅 및 서버 운영</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2>6. 개인정보의 안전성 확보 조치</h2>
                        <ul>
                            <li><strong>기술적 조치:</strong> HTTPS 암호화 통신, 해킹 방지를 위한 보안 프로그램 운영</li>
                            <li><strong>관리적 조치:</strong> 개인정보 접근 권한 최소화, 정기적인 보안 점검</li>
                            <li><strong>물리적 조치:</strong> 안전한 클라우드 서버 환경 구축</li>
                        </ul>

                        <h2>7. 이용자의 권리와 행사 방법</h2>
                        <p>사용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
                        <ul>
                            <li>개인정보 열람 요구</li>
                            <li>개인정보 정정 요구</li>
                            <li>개인정보 삭제 요구</li>
                            <li>개인정보 처리 정지 요구</li>
                        </ul>
                        <p>권리 행사는 아래 연락처를 통해 요청하실 수 있습니다.</p>

                        <h2>8. 쿠키의 운영 및 거부</h2>
                        <p>Gido AI는 사용자 경험 개선을 위해 쿠키를 사용할 수 있습니다. 쿠키 사용을 거부하시려면 브라우저 설정에서 쿠키 차단을 선택할 수 있으나, 이 경우 서비스 이용에
                            제한이 있을 수 있습니다.</p>

                        <h2>9. 개인정보 보호책임자</h2>
                        <p>Gido AI는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를
                            지정하고 있습니다.</p>

                        <div className="mt-6 rounded-lg bg-amber-600 text-white p-6">
                            <h3 className="text-lg font-semibold">📧 개인정보 보호책임자 및 문의</h3>
                            <p><strong>이메일:</strong> zxcv1685@gmail.com</p>
                            <p><strong>응답 시간:</strong> 영업일 기준 3일 이내</p>
                            <p className="mt-3">기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하시기 바랍니다:</p>
                            <ul className="mt-3 list-disc list-inside">
                                <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
                                <li>개인정보분쟁조정위원회 (www.kopico.go.kr / 1833-6972)</li>
                                <li>대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
                                <li>경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182)</li>
                            </ul>
                        </div>

                        <h2 className="mt-8">10. 개인정보처리방침의 변경</h2>
                        <p>본 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용이 추가, 삭제 및 수정될 수 있으며, 변경 시 웹사이트를 통해 공지하겠습니다.</p>

                        <div className="mt-8 text-center">
                            <div
                                className="italic text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/10 p-6 rounded-lg mb-6">&quot;너희
                                염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라&quot; — 베드로전서 5:7
                            </div>

                            <div className="text-sm text-amber-600 dark:text-amber-400">
                                <p><strong>공고일자:</strong> 2024년 11월 30일</p>
                                <p><strong>시행일자:</strong> 2024년 11월 30일</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="text-sm text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 py-2 flex items-center gap-2 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4"/>
                            처음으로
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

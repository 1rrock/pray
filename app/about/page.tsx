import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - Gido AI | 기도 AI 서비스 소개',
  description: 'Gido AI에 대해 — AI 기술로 성경 말씀을 통한 영적 인도를 제공하는 서비스의 사명, 기능, 개발자 정보 및 연락처 안내입니다.',
  alternates: { canonical: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/about` : 'https://gidoai.vercel.app/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-8">
      <main className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100 mb-4">Gido AI 소개</h1>
          <p className="text-lg text-amber-700 dark:text-amber-300">
            Gido AI는 기도 내용을 바탕으로 성경 말씀을 통해 영적 인도를 제공하는 AI 기반 서비스입니다.
          </p>
        </header>

        <article className="prose prose-amber dark:prose-invert max-w-none text-amber-800 dark:text-amber-200 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Our Mission - 우리의 사명</h2>
            <p className="text-base leading-relaxed">
              Gido AI의 목표는 사용자가 기도하고 영적 인도를 받는 경험을 최신 AI 기술로 보조하는 것입니다.
              인공지능을 통해 성경 구절과 신앙적인 통찰을 제공하며, 사용자의 영적 성장과 위로를 돕습니다.
            </p>
            <p className="text-base leading-relaxed">
              우리는 기술이 영적 삶을 풍요롭게 할 수 있다고 믿습니다. Gido AI는 전통적인 기도 생활과
              현대 기술을 접목하여, 언제 어디서나 하나님의 말씀을 통한 영적 안내를 받을 수 있도록 돕습니다.
            </p>
          </section>

          <section className="bg-amber-100 dark:bg-amber-900/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mt-0">주요 기능</h2>
            <ul className="space-y-3 text-base">
              <li><strong>텍스트 기도:</strong> 글로 작성한 기도를 AI가 분석하여 적합한 성경 구절로 응답합니다.</li>
              <li><strong>음성 기도:</strong> 음성으로 기도하면 자동으로 텍스트로 변환하여 처리합니다.</li>
              <li><strong>성경 말씀 응답:</strong> 기도 내용에 맞는 성경 구절과 해석을 제공합니다.</li>
              <li><strong>맞춤형 계시록:</strong> 개인 이름을 입력하면 &quot;OOO에게 전하는 계시록&quot; 형식으로 응답합니다.</li>
              <li><strong>공유 기능:</strong> 받은 응답을 다른 사람과 쉽게 공유할 수 있습니다.</li>
              <li><strong>위기 감지:</strong> 심각한 위기 상황을 감지하면 전문 상담 기관 연락처를 안내합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Service - 서비스 안내</h2>
            <p className="text-base leading-relaxed">
              본 서비스는 AI 기술을 활용한 자동화된 도구로서 성경 구절과 관련된 영적 안내를 제공합니다.
              그러나 Gido AI는 전문적인 목회 상담이나 심리 상담을 대체하지 않습니다.
            </p>
            <p className="text-base leading-relaxed">
              심각한 정신적, 영적 위기 상황이나 전문적인 상담이 필요한 경우에는
              적절한 전문가(목회자, 심리상담사, 정신건강의학과 전문의 등)의 도움을 받으실 것을 권장합니다.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 className="font-bold text-red-800 dark:text-red-300">긴급 상황 시</h3>
              <p className="text-red-700 dark:text-red-400">
                자살이나 자해 충동, 심각한 정신적 위기 상황에서는 반드시 전문 기관의 도움을 받으세요:
              </p>
              <ul className="list-disc list-inside text-red-700 dark:text-red-400 mt-2">
                <li>자살예방상담전화: 1393</li>
                <li>정신건강위기상담전화: 1577-0199</li>
                <li>생명의전화: 1588-9191</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Privacy & Security - 개인정보 보호</h2>
            <p className="text-base leading-relaxed">
              사용자의 프라이버시와 안전을 최우선으로 합니다. 모든 기도 내용은 암호화되어 전송되며,
              응답 생성 후 즉시 삭제됩니다. 서버에는 어떠한 기도 내용도 저장하지 않습니다.
            </p>
            <p className="text-base leading-relaxed">
              자세한 개인정보 처리 방침은 <a href="/privacy" className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">개인정보처리방침</a> 페이지에서 확인하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Technology - 기술 정보</h2>
            <p className="text-base leading-relaxed">
              Gido AI는 최신 AI 언어 모델과 자연어 처리 기술을 사용하여 기도 내용을 분석하고
              적합한 성경 구절을 선택합니다. 음성 기도의 경우 고급 음성 인식 기술로 한국어 음성을
              정확하게 텍스트로 변환합니다.
            </p>
          </section>

          <section className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mt-0">Developer & Contact - 개발자 및 문의</h2>
            <div className="space-y-4 text-base">
              <p>
                <strong>개발팀:</strong> Gido Team
              </p>
              <p>
                <strong>이메일 문의:</strong> <a href="mailto:zxcv1685@gmail.com" className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">zxcv1685@gmail.com</a>
              </p>
              <p>
                <strong>응답 시간:</strong> 영업일 기준 3일 이내
              </p>
              <div className="mt-6">
                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">문의 가능 사항</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>서비스 이용 관련 문의</li>
                  <li>기술적 오류 및 버그 신고</li>
                  <li>개인정보 관련 문의</li>
                  <li>제휴 및 협력 문의</li>
                  <li>기타 서비스 개선 제안</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="text-center py-6">
            <blockquote className="text-xl italic text-amber-700 dark:text-amber-400 border-l-4 border-amber-500 pl-6">
              &quot;주의 말씀은 내 발에 등이요 내 길에 빛이니이다&quot;
              <footer className="text-base mt-2 not-italic">- 시편 119:105</footer>
            </blockquote>
          </section>
        </article>

        <footer className="mt-12 text-center">
          <nav className="space-x-4 text-sm">
            <Link href="/" className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 hover:underline">홈으로</Link>
            <span className="text-amber-400">|</span>
            <Link href="/privacy" className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 hover:underline">개인정보처리방침</Link>
            <span className="text-amber-400">|</span>
            <Link href="/pray/text" className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 hover:underline">글로 기도하기</Link>
            <span className="text-amber-400">|</span>
            <Link href="/pray/voice" className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 hover:underline">음성으로 기도하기</Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}


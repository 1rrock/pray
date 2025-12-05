'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/i18n/config';

export default function AboutPage() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'ko';
  const isKo = locale === 'ko';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-8">
      <main className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            {isKo ? '소개' : 'About Amen'}
          </h1>
          <p className="text-lg text-amber-700 dark:text-amber-300">
            {isKo
              ? 'Amen AI는 기도 내용을 바탕으로 성경 말씀으로 응답하는 AI 기반 서비스입니다.'
              : 'Amen AI is an AI-powered service that responds to prayers with Scripture verses.'}
          </p>
        </header>

        <article className="prose prose-amber dark:prose-invert max-w-none text-amber-800 dark:text-amber-200 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {isKo ? 'Our Mission - 우리의 사명' : 'Our Mission'}
            </h2>
            <p className="text-base leading-relaxed">
              {isKo
                ? 'Amen AI의 목표는 사용자가 기도하고 영적 인도를 받는 경험을 최신 AI 기술로 보조하는 것입니다. 인공지능을 통해 성경 구절과 신앙적인 통찰을 제공하며, 사용자의 영적 성장과 위로를 돕습니다.'
                : 'Amen AI aims to support your prayer experience with modern AI technology, providing Scripture verses and spiritual insights to guide your faith journey.'}
            </p>
            <p className="text-base leading-relaxed">
              {isKo
                ? '우리는 기술이 영적 삶을 풍요롭게 할 수 있다고 믿습니다. Amen AI는 전통적인 기도 생활과 현대 기술을 접목하여, 언제 어디서나 하나님의 말씀을 통한 영적 안내를 받을 수 있도록 돕습니다.'
                : 'We believe technology can enrich your spiritual life. Amen AI combines traditional prayer with modern AI to help you find Scripture-based guidance anytime, anywhere.'}
            </p>
          </section>

          <section className="bg-amber-100 dark:bg-amber-900/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mt-0">
              {isKo ? '주요 기능' : 'Key Features'}
            </h2>
            <ul className="space-y-3 text-base">
              <li>
                <strong>{isKo ? '텍스트 기도:' : 'Text Prayer:'}</strong> {isKo ? '글로 작성한 기도를 AI가 분석하여 적합한 성경 구절로 응답합니다.' : 'Submit written prayers and receive relevant Scripture responses.'}
              </li>
              <li>
                <strong>{isKo ? '음성 기도:' : 'Voice Prayer:'}</strong> {isKo ? '음성으로 기도하면 자동으로 텍스트로 변환하여 처리합니다.' : 'Record voice prayers that are automatically converted to text.'}
              </li>
              <li>
                <strong>{isKo ? '성경 말씀 응답:' : 'Scripture Response:'}</strong> {isKo ? '기도 내용에 맞는 성경 구절과 해석을 제공합니다.' : 'Get Bible verses and interpretations matched to your prayer.'}
              </li>
              <li>
                <strong>{isKo ? '맞춤형 응답:' : 'Personalized Response:'}</strong> {isKo ? '개인 이름을 입력하면 개인화된 말씀 응답을 받을 수 있습니다.' : 'Receive personalized responses by providing your name.'}
              </li>
              <li>
                <strong>{isKo ? '공유 기능:' : 'Share Feature:'}</strong> {isKo ? '받은 응답을 다른 사람과 쉽게 공유할 수 있습니다.' : 'Easily share responses with others.'}
              </li>
              <li>
                <strong>{isKo ? '위기 감지:' : 'Crisis Detection:'}</strong> {isKo ? '심각한 위기 상황을 감지하면 전문 상담 기관 연락처를 안내합니다.' : 'Provides crisis resources when serious situations are detected.'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {isKo ? 'Service - 서비스 안내' : 'Service Information'}
            </h2>
            <p className="text-base leading-relaxed">
              {isKo
                ? '본 서비스는 AI 기술을 활용한 자동화된 도구로서 성경 구절과 관련된 영적 안내를 제공합니다. 그러나 Amen AI는 전문적인 목회 상담이나 심리 상담을 대체하지 않습니다.'
                : 'Amen AI is an automated AI tool that provides spiritual guidance through Scripture. However, it does not replace professional pastoral or psychological counseling.'}
            </p>
            <p className="text-base leading-relaxed">
              {isKo
                ? '심각한 정신적, 영적 위기 상황이나 전문적인 상담이 필요한 경우에는 적절한 전문가(목회자, 심리상담사, 정신건강의학과 전문의 등)의 도움을 받으실 것을 권장합니다.'
                : 'If you experience serious mental or spiritual crises, please seek help from qualified professionals (pastors, counselors, psychiatrists, etc.).'}
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 className="font-bold text-red-800 dark:text-red-300">
                {isKo ? '긴급 상황 시' : 'Emergency Resources'}
              </h3>
              <p className="text-red-700 dark:text-red-400 mb-2">
                {isKo
                  ? '자살이나 자해 충동, 심각한 정신적 위기 상황에서는 반드시 전문 기관의 도움을 받으세요:'
                  : 'If you are having thoughts of suicide or self-harm, please contact a crisis service:'}
              </p>
              <ul className="list-disc list-inside text-red-700 dark:text-red-400">
                {isKo ? (
                  <>
                    <li>자살예방상담전화: 1393</li>
                    <li>정신건강위기상담전화: 1577-0199</li>
                    <li>생명의전화: 1588-9191</li>
                  </>
                ) : (
                  <>
                    <li>National Suicide Prevention Lifeline: 988 (US)</li>
                    <li>International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/</li>
                  </>
                )}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {isKo ? 'Privacy & Security - 개인정보 보호' : 'Privacy & Security'}
            </h2>
            <p className="text-base leading-relaxed">
              {isKo
                ? '사용자의 프라이버시와 안전을 최우선으로 합니다. 모든 기도 내용은 암호화되어 전송되며, 응답 생성 후 즉시 삭제됩니다. 서버에는 어떠한 기도 내용도 저장하지 않습니다.'
                : 'Your privacy and security are our top priority. All prayers are encrypted, and deleted immediately after response generation. We do not store prayers on our servers.'}
            </p>
            <p className="text-base leading-relaxed">
              {isKo
                ? '자세한 개인정보 처리 방침은 '
                : 'For more details, see our '}
              <a href={`/${locale}/privacy`} className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">
                {isKo ? '개인정보처리방침' : 'Privacy Policy'}
              </a>
              {isKo ? ' 페이지에서 확인하실 수 있습니다.' : ' page.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {isKo ? 'Technology - 기술 정보' : 'Technology'}
            </h2>
            <p className="text-base leading-relaxed">
              {isKo
                ? 'Amen AI는 최신 AI 언어 모델과 자연어 처리 기술을 사용하여 기도 내용을 분석하고 적합한 성경 구절을 선택합니다. 음성 기도의 경우 고급 음성 인식 기술로 한국어 음성을 정확하게 텍스트로 변환합니다.'
                : 'Amen AI uses advanced AI language models and natural language processing to analyze prayers and select relevant Scripture verses. Voice prayers are processed with high-accuracy speech recognition technology.'}
            </p>
          </section>

          <section className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mt-0">
              {isKo ? 'Developer & Contact - 개발자 및 문의' : 'Contact & Support'}
            </h2>
            <div className="space-y-4 text-base">
              <p>
                <strong>{isKo ? '개발팀:' : 'Developer:'}</strong> 1rrock
              </p>
              <p>
                <strong>{isKo ? '이메일 문의:' : 'Email:'}</strong>{' '}
                <a href="mailto:zxcv1685@gmail.com" className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">
                  zxcv1685@gmail.com
                </a>
              </p>
              <p>
                <strong>{isKo ? '응답 시간:' : 'Response Time:'}</strong> {isKo ? '영업일 기준 3일 이내' : 'Within 3 business days'}
              </p>
            </div>
          </section>

          <div className="text-center pt-4">
            <Link
              href={locale === 'ko' ? '/ko' : '/en'}
              className="inline-block text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 font-semibold transition-colors"
            >
              ← {isKo ? '홈으로' : 'Back Home'}
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}


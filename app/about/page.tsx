import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Gido AI',
  description: 'Gido AI에 대해 — 사명, 개발자 정보 및 연락처 안내입니다.',
  alternates: { canonical: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/about` : 'https://gidoai.vercel.app/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-8">
      <main className="w-full max-w-3xl">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">Gido AI 소개</h1>
          <p className="mt-3 text-amber-700 dark:text-amber-300">Gido AI는 기도 내용을 바탕으로 성경 말씀을 통해 영적 인도를 제공하는 서비스입니다. 사용자의 프라이버시와 안전을 최우선으로 합니다.</p>
        </header>

        <section className="prose dark:prose-invert text-amber-800 dark:text-amber-200">
          <h2>Our Mission</h2>
          <p>
            Gido AI의 목표는 사용자가 기도하고 영적 인도를 받는 경험을 기술로 보조하는 것입니다. 인공지능을 통해 성경 구절과 신앙적인 통찰을 제공하며,
            사용자의 영적 성장과 위로를 돕습니다.
          </p>

          <h2>Developer & Contact</h2>
          <p>
            개발자: Gido Team
          </p>
          <p>
            문의: <a href="mailto:contact@gidoai.com" className="underline">contact@gidoai.com</a>
          </p>

          <h2>Service</h2>
          <p>
            본 서비스는 자동화된 도구로서 성경 구절과 관련된 안내를 제공하지만, 전문적인 상담이 필요한 상황에 대해서는
            적절한 전문가의 도움을 받을 것을 권장합니다.
          </p>
        </section>
      </main>
    </div>
  );
}


'use client';

import { use, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { type Locale } from '@/i18n/config';

export default function SharedPrayerPage({ params }: { params: Promise<{ id: string; lang: string }> }) {
  const router = useRouter();
  const pathname = usePathname();
  const resolvedParams = use(params);
  const locale = (resolvedParams.lang === 'en' ? 'en' : 'ko') as Locale;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayer = async () => {
      try {
        const response = await fetch(`/api/get-prayer/${resolvedParams.id}`);

        if (!response.ok) {
          throw new Error(locale === 'ko' ? '기도를 찾을 수 없습니다.' : 'Prayer not found.');
        }

        const data = await response.json();

        // 데이터를 URL 파라미터로 변환하여 scripture 페이지로 리다이렉트
        const searchParams = new URLSearchParams({
          today: data.today,
          book: data.book,
          chapter: data.chapter.toString(),
          verse: data.verse.toString(),
          text: data.text,
          guidance: data.guidance,
          prayer: data.prayer,
        });

        if (data.recipientName) {
          searchParams.set('recipientName', data.recipientName);
        }

        router.replace(`/${locale}/pray/scripture?${searchParams.toString()}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : locale === 'ko' ? '오류가 발생했습니다.' : 'An error occurred.');
        setLoading(false);
      }
    };

    fetchPrayer();
  }, [resolvedParams.id, router, locale]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            {locale === 'ko' ? '오류' : 'Error'}
          </h1>
          <p className="text-amber-700 dark:text-amber-300 mb-6">{error}</p>
          <button
            onClick={() => router.push(`/${locale}`)}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            {locale === 'ko' ? '홈으로 돌아가기' : 'Go Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
        <p className="mt-4 text-amber-700 dark:text-amber-300">
          {locale === 'ko' ? '로딩 중...' : 'Loading...'}
        </p>
      </motion.div>
    </div>
  );
}


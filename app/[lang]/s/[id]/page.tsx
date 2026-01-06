'use client';

import { use, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { type Locale } from '@/i18n/config';
import { InContentAd } from '@/shared/components/InContentAd';

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
        <div className="text-center max-w-lg">
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            {locale === 'ko' ? '오류' : 'Error'}
          </h1>
          <p className="text-amber-700 dark:text-amber-300 mb-6">{error}</p>
          
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 dark:border-amber-800 mb-6 text-left">
            <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
              {locale === 'ko' ? 'Amen AI 소개' : 'About Amen AI'}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {locale === 'ko' 
                ? 'Amen AI는 당신의 기도를 분석하고 성경 말씀으로 응답하는 특별한 공간입니다. 마음의 평안과 영적 인도를 위해 설계되었습니다.' 
                : 'Amen AI is a special space that analyzes your prayers and responds with Bible verses. It is designed for peace of mind and spiritual guidance.'}
            </p>
            <h3 className="text-md font-semibold text-amber-800 dark:text-amber-200 mb-1">
              {locale === 'ko' ? '공유된 기도 안내' : 'Shared Prayer Info'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {locale === 'ko'
                ? '이 페이지는 다른 사용자가 본인의 기도 응답을 공유했을 때 나타나는 화면입니다. 링크를 클릭하면 해당 기도에 대한 성경 말씀과 해석을 확인할 수 있습니다.'
                : 'This page appears when another user shares their prayer response. By clicking the link, you can view the Scripture verses and interpretations related to that prayer.'}
            </p>
          </div>

          <InContentAd />

          <button
            onClick={() => router.push(`/${locale}`)}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors mt-6"
          >
            {locale === 'ko' ? '홈으로 돌아가기' : 'Go Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-lg mb-8"
      >
        <div className="inline-block mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
        <p className="text-amber-700 dark:text-amber-300 font-medium">
          {locale === 'ko' ? '기도 응답을 불러오는 중입니다...' : 'Loading prayer response...'}
        </p>
      </motion.div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-md w-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30"
      >
        <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">
          {locale === 'ko' ? '기다리시는 동안...' : 'While you wait...'}
        </h2>
        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            {locale === 'ko' 
              ? 'Amen AI는 성경의 진리와 현대 기술을 결합하여 영적 소통의 새로운 방식을 제안합니다.' 
              : 'Amen AI suggests a new way of spiritual communication by combining Biblical truth with modern technology.'}
          </p>
          <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl">
             <p className="italic">
               {locale === 'ko'
                 ? '"너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라"'
                 : '"Cast all your anxiety on him because he cares for you."'}
             </p>
             <p className="text-right mt-1 font-semibold">— {locale === 'ko' ? '베드로전서 5:7' : '1 Peter 5:7'}</p>
          </div>
          <p>
            {locale === 'ko'
              ? '잠시 후 기도 내용에 맞는 맞춤형 성경 구절과 따뜻한 권면의 말씀을 확인하실 수 있습니다.'
              : 'In a moment, you will be able to check custom Scripture verses and warm words of encouragement matched to the prayer.'}
          </p>
        </div>
      </motion.section>

      <InContentAd />
    </div>
  );
}


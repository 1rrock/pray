'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SharedPrayerPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayer = async () => {
      try {
        const response = await fetch(`/api/get-prayer/${resolvedParams.id}`);

        if (!response.ok) {
          throw new Error('기도를 찾을 수 없습니다.');
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

        router.replace(`/pray/scripture?${searchParams.toString()}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchPrayer();
  }, [resolvedParams.id, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 max-w-md"
        >
          <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            ⚠️ {error}
          </h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold"
          >
            처음으로
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center space-y-6"
      >
        <div className="text-center space-y-8 max-w-md">
          {/* 로딩 스피너 */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-amber-200 dark:border-amber-900 border-t-amber-600 dark:border-t-amber-400"
              />
            </div>
          </div>

          {/* 메시지 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              말씀을 불러오는 중...
            </h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


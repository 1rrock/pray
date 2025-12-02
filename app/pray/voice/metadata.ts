import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://selahai.vercel.app';

export const metadata: Metadata = {
  title: '음성 기도 - Selah',
  description: '음성으로 기도를 올리면 Selah가 성경 구절로 응답합니다. 간편하게 음성을 녹음해 말씀을 받아보세요.',
  openGraph: {
    title: '음성 기도 - Selah',
    description: '음성으로 기도를 올리면 Selah가 성경 구절로 응답합니다.',
    url: `${baseUrl}/pray/voice`,
    siteName: 'Selah',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Selah - 음성 기도',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '음성 기도 - Selah',
    description: '음성으로 기도를 올리면 Selah가 성경 구절로 응답합니다.',
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/pray/voice`,
  },
};


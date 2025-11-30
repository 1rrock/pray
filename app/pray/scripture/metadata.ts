import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gidoai.vercel.app';

export const metadata: Metadata = {
  title: '응답된 성경 구절 - Gido AI',
  description: 'Gido AI가 기도에 응답한 성경 구절과 해석을 확인하세요. 개인화된 영적 인도를 제공합니다.',
  openGraph: {
    title: '응답된 성경 구절 - Gido AI',
    description: 'Gido AI가 기도에 응답한 성경 구절과 해석을 확인하세요.',
    url: `${baseUrl}/pray/scripture`,
    siteName: 'Gido AI',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Gido AI - 응답된 성경 구절',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '응답된 성경 구절 - Gido AI',
    description: 'Gido AI가 기도에 응답한 성경 구절과 해석을 확인하세요.',
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/pray/scripture`,
  },
};


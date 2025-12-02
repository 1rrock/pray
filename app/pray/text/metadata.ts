import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://selahai.vercel.app';

export const metadata: Metadata = {
  title: '글로 기도하기 - Selah',
  description: '텍스트로 기도를 작성하면 Selah가 성경 구절로 응답합니다. 간편하게 기도를 입력하고 말씀을 받으세요.',
  openGraph: {
    title: '글로 기도하기 - Selah',
    description: '텍스트로 기도를 작성하면 Selah가 성경 구절로 응답합니다.',
    url: `${baseUrl}/pray/text`,
    siteName: 'Selah',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Selah - 글로 기도하기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '글로 기도하기 - Selah',
    description: '텍스트로 기도를 작성하면 Selah가 성경 구절로 응답합니다.',
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/pray/text`,
  },
};


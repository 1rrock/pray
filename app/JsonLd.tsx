export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Gido',
    alternateName: '기도 AI',
    description: 'Gido는 기도 내용을 분석해 성경 말씀으로 응답하는 AI 기도 서비스입니다. 당신의 기도에 가장 적합한 성경 구절과 영적 지도를 제공합니다.',
    url: 'https://pray-ai.vercel.app',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    creator: {
      '@type': 'Organization',
      name: 'Gido',
    },
    inLanguage: 'ko-KR',
    keywords: '기도, 기도AI, AI기도, gido, 성경, 성경말씀, AI, 인공지능, 기독교, 말씀, 성경구절, 영적상담',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}


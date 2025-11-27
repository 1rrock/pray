export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Gido AI',
    alternateName: '기도 AI',
    description: 'Gido AI는 기도 내용을 분석해 성경 구절로 하나님의 계시를 전달하는 AI 기도 서비스입니다. 000에게 전하는 계시록 형식으로 성경 말씀과 영적 지도를 제공합니다.',
    url: 'https://gidoai.vercel.app',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    creator: {
      '@type': 'Organization',
      name: 'Gido AI',
    },
    inLanguage: 'ko-KR',
    keywords: '기도, 기도AI, AI기도, gido, 성경, 성경말씀, 하나님의 계시, 계시록, AI, 인공지능, 기독교, 말씀, 성경구절, 영적상담',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}


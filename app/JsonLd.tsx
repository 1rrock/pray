export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gidoai.vercel.app';
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Gido AI',
      alternateName: '기도 AI',
      description:
        "Gido AI는 기도 내용을 분석해 성경 구절로 하나님의 계시를 전달하는 AI 기도 서비스입니다. 000에게 전하는 계시록 형식으로 성경 말씀과 영적 지도를 제공합니다.",
      url: baseUrl,
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
      keywords:
        '기도, 기도AI, AI기도, gido, 성경, 성경말씀, 하나님의 계시, 계시록, AI, 인공지능, 기독교, 말씀, 성경구절, 영적상담',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Gido AI',
      url: baseUrl,
      logo: `${baseUrl}/og-image.png`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Gido AI',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '글로 기도하기',
          item: `${baseUrl}/pray/text`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: '음성 기도',
          item: `${baseUrl}/pray/voice`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: '응답된 성경 구절',
          item: `${baseUrl}/pray/scripture`,
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

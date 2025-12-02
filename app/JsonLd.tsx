export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://selahai.vercel.app';
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Selah',
      alternateName: '셀라',
      description:
        "Selah는 기도 내용을 분석해 성경 구절로 응답하는 AI 기도 서비스입니다. 성경 말씀을 통한 영적 위로와 인도를 제공합니다.",
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
        name: 'Selah',
      },
      inLanguage: 'ko-KR',
      keywords:
        '기도, 셀라, selah, 성경, 성경말씀, 기독교, 말씀, 성경구절, 영적상담, 묵상, AI, 인공지능',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Selah',
      url: baseUrl,
      logo: `${baseUrl}/og-image.png`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Selah AI',
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

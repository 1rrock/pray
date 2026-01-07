import type { Metadata } from "next";
import { type Locale } from '@/i18n/config';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://a-men.vercel.app';

    return {
        title: locale === 'ko'
            ? "성경 구절 - Amen"
            : "Scripture - Amen",
        description: locale === 'ko'
            ? "기도 응답으로 생성된 성경 구절을 확인하세요."
            : "View Scripture verses generated from prayer responses.",
        openGraph: {
            title: locale === 'ko'
                ? "성경 구절 - Amen"
                : "Scripture - Amen",
            description: locale === 'ko'
                ? "기도 응답으로 생성된 성경 구절을 확인하세요."
                : "View Scripture verses generated from prayer responses.",
            url: `${baseUrl}/${locale}/pray/scripture`,
            type: "website",
            locale: locale === 'ko' ? 'ko_KR' : 'en_US',
        },
        twitter: {
            card: "summary_large_image",
            title: locale === 'ko'
                ? "성경 구절 - Amen"
                : "Scripture - Amen",
            description: locale === 'ko'
                ? "기도 응답으로 생성된 성경 구절"
                : "Scripture verses from prayer responses",
        },
        other: {
            'google-adsense-account': 'ca-pub-9970402588626346',
        },
    };
}

export default function ScriptureLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}


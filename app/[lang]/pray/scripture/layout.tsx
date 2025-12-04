import type { Metadata } from "next";
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const dict = await getDictionary(locale);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://selahai.vercel.app';

    return {
        title: locale === 'ko'
            ? "성경 구절 - Selah"
            : "Scripture - Selah",
        description: locale === 'ko'
            ? "기도 응답으로 생성된 성경 구절을 확인하세요."
            : "View Scripture verses generated from prayer responses.",
        openGraph: {
            title: locale === 'ko'
                ? "성경 구절 - Selah"
                : "Scripture - Selah",
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
                ? "성경 구절 - Selah"
                : "Scripture - Selah",
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


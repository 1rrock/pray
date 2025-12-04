import type {Metadata} from "next";
import {type Locale} from '@/i18n/config';
import {getDictionary} from '@/i18n/get-dictionary';

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const {lang} = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const dict = await getDictionary(locale);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://selahai.vercel.app';

    return {
        title: locale === 'ko'
            ? "텍스트 기도 - Selah | 성경 말씀 응답"
            : "Text Prayer - Selah | Scripture Response",
        description: locale === 'ko'
            ? "Selah 텍스트 기도 서비스. 글로 기도하면 성경 말씀으로 응답을 받을 수 있습니다."
            : "Selah text prayer service. Pray with text and receive Scripture responses.",
        openGraph: {
            title: locale === 'ko'
                ? "텍스트 기도 - Selah"
                : "Text Prayer - Selah",
            description: locale === 'ko'
                ? "글로 기도하고 성경 말씀을 받으세요"
                : "Pray with text and receive Scripture",
            url: `${baseUrl}/${locale}/pray/text`,
            type: "website",
            locale: locale === 'ko' ? 'ko_KR' : 'en_US',
        },
        twitter: {
            card: "summary_large_image",
            title: locale === 'ko'
                ? "텍스트 기도 - Selah"
                : "Text Prayer - Selah",
            description: locale === 'ko'
                ? "글로 기도하고 성경 말씀을 받으세요"
                : "Pray with text and receive Scripture",
        },
        other: {
            'google-adsense-account': 'ca-pub-9970402588626346',
        },
    };
}

export default function TextLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return children;
}


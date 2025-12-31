import type {Metadata} from "next";
import {ReactQueryProvider} from "@/shared/providers/ReactQueryProvider";
import {Toaster} from "sonner";
import BuyMeCoffeeButton from "@/shared/components/BuyMeCoffeeButton";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import { type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateStaticParams() {
    return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const dict = await getDictionary(locale);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://a-men.vercel.app';

    return {
        title: dict.common.title,
        description: dict.common.description,
        keywords: ['기도', '셀라', "아멘", 'Amen', '성경', '성경말씀', '말씀', 'AI', '인공지능', '기독교', '성경구절', '영적상담', '하나님', '예수님', '성령', '신앙', '믿음', '온라인기도', '묵상', 'prayer', 'bible', 'scripture', 'christian', 'faith', 'God', 'Jesus'],
        authors: [{name: 'Amen'}],
        creator: 'Amen',
        publisher: 'Amen',
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: `${baseUrl}/${lang}`,
            languages: {
                'ko': `${baseUrl}/ko`,
                'en': `${baseUrl}/en`,
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
        },
        openGraph: {
            title: dict.common.title,
            description: dict.common.description,
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Amen',
                }
            ],
            type: "website",
            locale: locale === 'ko' ? 'ko_KR' : 'en_US',
            siteName: "Amen",
        },
        twitter: {
            card: "summary_large_image",
            title: dict.common.title,
            description: dict.common.description,
            images: [`${baseUrl}/og-image.png`],
        },
    };
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = (lang === 'en' ? 'en' : 'ko') as Locale;
    const dict = await getDictionary(locale);

    return (
        <div className="antialiased bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 min-h-screen">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded-md focus:shadow-lg"
            >
                {dict.common.skip_to_content}
            </a>
            <LanguageSwitcher currentLocale={locale}/>

            {/* 메인 컨텐츠 영역 */}
            <div className="relative">
                <ReactQueryProvider>
                    <div className="max-w-7xl mx-auto px-2 xl:px-8">
                        {/* 실제 컨텐츠 */}
                        <div id="main-content" className="py-4">
                            {children}
                        </div>
                    </div>
                </ReactQueryProvider>
            </div>

            <Toaster
                position="top-center"
                richColors
                closeButton
            />
            <BuyMeCoffeeButton/>
        </div>
    );
}


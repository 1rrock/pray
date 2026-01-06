import type {Metadata} from "next";
import {Geist, Geist_Mono, Noto_Serif_KR, Nanum_Myeongjo} from "next/font/google";
import "./globals.css";
import JsonLd from "./JsonLd";
import { defaultLocale } from "@/i18n/config";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// 성경 구절용 폰트 (세리프체 - 고급스러운 느낌)
const notoSerifKR = Noto_Serif_KR({
    variable: "--font-noto-serif",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

// 하나님의 말씀용 폰트 (명조체 - 전통적이고 따뜻한 느낌)
const nanumMyeongjo = Nanum_Myeongjo({
    variable: "--font-nanum-myeongjo",
    subsets: ["latin"],
    weight: ["400", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
    const metadataContent = {
        ko: {
            title: "Amen - 기도와 말씀으로 응답하는 서비스",
            description: "Amen는 당신의 기도를 분석해 성경 구절로 응답하는 AI 기도 서비스입니다. 성경 말씀을 통한 영적 인도와 위로를 받을 수 있습니다.",
            keywords: ['기도', '셀라', 'Amen', '성경', '성경말씀', '말씀', 'AI', '인공지능', '기독교', '성경구절', '영적상담', '하나님', '예수님', '성령', '신앙', '믿음', '온라인기도', '묵상'],
            ogTitle: "Amen - 기도와 말씀으로 응답하는 서비스",
            ogDescription: "Amen는 당신의 기도를 분석해 성경 구절로 응답하는 AI 기도 서비스입니다.",
            ogLocale: "ko_KR",
            twitterTitle: "Amen - 기도와 말씀으로 응답",
            twitterDescription: "Amen는 당신의 기도를 분석해 성경 구절로 응답합니다.",
            altText: "Amen - 기도와 말씀 응답 서비스",
        },
        en: {
            title: "Amen - AI Prayer & Scripture Response Service",
            description: "Amen analyzes your prayers and responds with relevant Bible verses. Receive spiritual guidance and comfort through Scripture.",
            keywords: ['prayer', 'Amen', 'scripture', 'bible', 'AI', 'artificial intelligence', 'christian', 'bible verse', 'spiritual counseling', 'God', 'Jesus', 'Holy Spirit', 'faith', 'belief', 'online prayer', 'meditation'],
            ogTitle: "Amen - AI Prayer & Scripture Response Service",
            ogDescription: "Amen analyzes your prayers and responds with relevant Bible verses.",
            ogLocale: "en_US",
            twitterTitle: "Amen - Prayer & Scripture Response",
            twitterDescription: "Amen analyzes your prayers and responds with Scripture.",
            altText: "Amen - Prayer & Scripture Response Service",
        }
    };

    const content = metadataContent[defaultLocale];

    return {
        title: content.title,
        description: content.description,
        keywords: content.keywords,
        authors: [{name: 'Amen'}],
        creator: 'Amen',
        publisher: 'Amen',
        metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://a-men.vercel.app'),
        alternates: {
            canonical: 'https://a-men.vercel.app',
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
            title: content.ogTitle,
            description: content.ogDescription,
            images: [
                {
                    url: 'https://a-men.vercel.app/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: content.altText,
                }
            ],
            type: "website",
            locale: content.ogLocale,
            siteName: "Amen",
        },
        twitter: {
            card: "summary_large_image",
            title: content.twitterTitle,
            description: content.twitterDescription,
            images: ['https://a-men.vercel.app/og-image.png'],
        },
    };
}

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang={defaultLocale}>
        <head>
            <JsonLd/>
            <script 
                type="text/javascript" 
                src="//t1.daumcdn.net/kas/static/ba.min.js" 
                async
            />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${notoSerifKR.variable} ${nanumMyeongjo.variable}`}
        >
        {children}
        </body>
        </html>
    );
}

import type {Metadata} from "next";
import {Geist, Geist_Mono, Noto_Serif_KR, Nanum_Myeongjo} from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import JsonLd from "./JsonLd";

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

export const metadata: Metadata = {
    title: "Gido - 기도 AI, 성경 말씀 응답 서비스",
    description: "Gido는 기도 내용을 분석해 성경 말씀으로 응답하는 AI 기도 서비스입니다. 당신의 기도에 가장 적합한 성경 구절과 영적 지도를 제공합니다.",
    keywords: ['기도', '기도AI', 'AI기도', 'gido', '성경', '성경말씀', 'AI', '인공지능', '기독교', '말씀', '성경구절', '영적상담', '하나님', '예수님', '성령', '신앙', '믿음', '온라인기도'],
    authors: [{ name: 'Gido' }],
    creator: 'Gido',
    publisher: 'Gido',
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://pray-ai.vercel.app'),
    openGraph: {
        title: "Gido - 기도 AI, 성경 말씀 응답 서비스",
        description: "Gido는 기도 내용을 분석해 성경 말씀으로 응답하는 AI 기도 서비스입니다. 당신의 기도에 가장 적합한 성경 구절과 영적 지도를 제공합니다.",
        images: [
            {
                url: 'https://pray-ai.vercel.app/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Gido - 기도 AI, 성경 말씀 응답 서비스',
            }
        ],
        type: "website",
        locale: "ko_KR",
        siteName: "Gido",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gido - 기도 AI, 성경 말씀 응답 서비스",
        description: "Gido는 기도 내용을 분석해 성경 말씀으로 응답하는 AI 기도 서비스입니다.",
        images: ['https://pray-ai.vercel.app/og-image.png'],
    },
    other: {
        'google-adsense-account': 'ca-pub-9970402588626346',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <head>
            <JsonLd />
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9970402588626346"
                crossOrigin="anonymous"
            />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${notoSerifKR.variable} ${nanumMyeongjo.variable} antialiased bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50`}
        >
        {/* Skip to main content link for accessibility */}
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
            메인 콘텐츠로 건너뛰기
        </a>
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
        <Toaster
            position="top-center"
            richColors
            closeButton
        />
        </body>
        </html>
    );
}

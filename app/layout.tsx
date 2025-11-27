import type {Metadata} from "next";
import {Geist, Geist_Mono, Noto_Serif_KR, Nanum_Myeongjo} from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";
import { Toaster } from "sonner";

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
    title: "Pray - 기도와 함께하는 하나님의 말씀",
    description: "당신의 기도에 성경 구절과 영적 지도로 응답합니다",
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://pray-six.vercel.app'),
    openGraph: {
        title: "Pray - 기도와 함께하는 하나님의 말씀",
        description: "당신의 기도에 성경 구절과 영적 지도로 응답합니다",
        images: [
            {
                url: 'https://pray-six.vercel.app/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Pray - 기도와 함께하는 하나님의 말씀',
            }
        ],
        type: "website",
        locale: "ko_KR",
        siteName: "Pray",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pray - 기도와 함께하는 하나님의 말씀",
        description: "당신의 기도에 성경 구절과 영적 지도로 응답합니다",
        images: ['https://pray-six.vercel.app/og-image.png'],
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
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9970402588626346"
                crossOrigin="anonymous"
            />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${notoSerifKR.variable} ${nanumMyeongjo.variable} antialiased bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50`}
        >
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

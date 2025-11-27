import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "하나님의 계시 - Gido AI | 기도 응답",
    description: "당신의 기도에 대한 하나님의 계시. Gido AI가 성경 구절과 영적 지도를 전달합니다.",
    openGraph: {
        title: "하나님의 계시 - Gido AI",
        description: "당신의 기도에 대한 하나님의 계시",
        type: "website",
        locale: "ko_KR",
    },
    twitter: {
        card: "summary_large_image",
        title: "하나님의 계시 - Gido AI",
        description: "당신의 기도에 대한 하나님의 계시",
    },
    other: {
        'google-adsense-account': 'ca-pub-9970402588626346',
    },
};

export default function ScriptureLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}


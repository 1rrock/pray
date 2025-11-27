import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "하나님의 말씀 - 기도 AI",
    description: "당신의 기도에 대한 하나님의 응답",
    openGraph: {
        title: "하나님의 말씀 - 기도 AI",
        description: "당신의 기도에 대한 하나님의 응답",
        type: "website",
        locale: "ko_KR",
    },
    twitter: {
        card: "summary_large_image",
        title: "하나님의 말씀 - 기도 AI",
        description: "당신의 기도에 대한 하나님의 응답",
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


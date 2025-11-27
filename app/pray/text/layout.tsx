import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "텍스트 기도 - 기도 AI",
    description: "텍스트로 기도하고 하나님의 말씀을 받으세요",
    openGraph: {
        title: "텍스트 기도 - 기도 AI",
        description: "텍스트로 기도하고 하나님의 말씀을 받으세요",
        type: "website",
        locale: "ko_KR",
    },
    twitter: {
        card: "summary_large_image",
        title: "텍스트 기도 - 기도 AI",
        description: "텍스트로 기도하고 하나님의 말씀을 받으세요",
    },
    other: {
        'google-adsense-account': 'ca-pub-9970402588626346',
    },
};

export default function TextLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}


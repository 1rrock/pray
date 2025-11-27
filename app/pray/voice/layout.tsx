import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "음성 기도 - Gido | AI 기도 서비스",
    description: "Gido 음성 기도 서비스. 음성으로 기도하면 성경 말씀과 영적 지도를 받을 수 있습니다.",
    openGraph: {
        title: "음성 기도 - Gido",
        description: "음성으로 기도하고 하나님의 말씀을 받으세요",
        type: "website",
        locale: "ko_KR",
    },
    twitter: {
        card: "summary_large_image",
        title: "음성 기도 - Gido",
        description: "음성으로 기도하고 하나님의 말씀을 받으세요",
    },
    other: {
        'google-adsense-account': 'ca-pub-9970402588626346',
    },
};

export default function VoiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}


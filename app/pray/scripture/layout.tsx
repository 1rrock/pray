import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "성경 말씀 응답 - Selah | 기도 응답",
    description: "당신의 기도에 대한 성경 말씀 응답. Selah가 성경 구절과 해석을 전달합니다.",
    openGraph: {
        title: "성경 말씀 응답 - Selah",
        description: "당신의 기도에 대한 성경 말씀 응답",
        type: "website",
        locale: "ko_KR",
    },
    twitter: {
        card: "summary_large_image",
        title: "성경 말씀 응답 - Selah",
        description: "당신의 기도에 대한 성경 말씀 응답",
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


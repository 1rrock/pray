'use client';

import { useEffect, useRef } from 'react';

interface CoupangAdProps {
    position?: 'left' | 'right';
    type?: 'normal' | 'christian';
}

export default function CoupangAd({ position = 'left', type = 'normal' }: CoupangAdProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // iframe이 로드되었을 때 처리할 로직이 있다면 여기에 추가
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.style.display = 'block';
        }
    }, []);

    const christian = 'https://ads-partners.coupang.com/widgets.html?id=949683&template=carousel&trackingCode=AF6680899&subId=&width=680&height=140&tsource='
    const normal = 'https://ads-partners.coupang.com/widgets.html?id=949611&template=carousel&trackingCode=AF6680899&subId=&width=320&height=100&tsource='

    return (
        <aside
            className={`
                fixed ${position === 'left' ? 'left-4' : 'right-4'}
                top-1/2
                -translate-y-1/2 
                hidden xl:flex
                z-10
                h-[60vh]
                w-54
                flex-col
                items-center
                bg-gradient-to-b from-amber-50/70 to-orange-50/70
                border border-amber-100
                rounded-lg
                shadow-lg
                py-2
                backdrop-blur-sm
            `}
            aria-label={`쿠팡 파트너스 광고 - ${position === 'left' ? '왼쪽' : '오른쪽'}`}
        >
            <iframe
                ref={iframeRef}
                src={type === 'christian' ? christian : normal}
                width="156"
                height="100%"
                frameBorder="0"
                scrolling="no"
                referrerPolicy="unsafe-url"
                title={`쿠팡 파트너스 광고 ${position}`}
                loading="lazy"
            />
            <p className="text-[11px] break-all text-gray-500 text-center mt-2">
                이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br/>
                이에 따른 일정액의 수수료를 제공받습니다.
            </p>
        </aside>
    );
}


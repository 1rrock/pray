'use client';

import {useEffect, useRef} from 'react';

export default function CoupangAdMobile(
    {
        type = 'normal',
    }: {
        type?: 'normal' | 'christian';
    }
) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.style.display = 'block';
        }
    }, []);

    const christian = 'https://ads-partners.coupang.com/widgets.html?id=949683&template=carousel&trackingCode=AF6680899&subId=&width=680&height=140&tsource='
    const normal = 'https://ads-partners.coupang.com/widgets.html?id=949611&template=carousel&trackingCode=AF6680899&subId=&width=320&height=100&tsource='

    return (
        <div
            className="
                flex xl:hidden
                flex-col
                items-center
                w-full
                py-2
                bg-gradient-to-r from-amber-50/50 to-orange-50/50
                border-y border-amber-100
            "
            aria-label="쿠팡 파트너스 모바일 광고"
        >
            <div
                className="bg-white/80 w-full backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-amber-100">
                <iframe
                    ref={iframeRef}
                    src={type === 'christian' ? christian : normal}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    scrolling="no"
                    referrerPolicy="unsafe-url"
                    title="쿠팡 파트너스 모바일 광고"
                    loading="lazy"
                />
            </div>
            <p className="text-[11px] text-gray-500 text-center mt-2">
                이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br/>
                이에 따른 일정액의 수수료를 제공받습니다.
            </p>
        </div>
    );
}


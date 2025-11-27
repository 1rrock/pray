'use client';

interface GoogleAdProps {
    slot: string;
}

export function GoogleAd({
                             slot,
                         }: GoogleAdProps) {

    return (
        <ins
            className="adsbygoogle"
            style={{
                display: 'block',
            }}
            data-ad-client="ca-pub-9970402588626346"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
}


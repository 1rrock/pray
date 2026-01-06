'use client';

import { useEffect, useRef } from 'react';

type AdSize = '300x250' | '320x50';

interface KakaoAdFitProps {
  size?: AdSize;
  className?: string;
}

const AD_CONFIGS = {
  '300x250': {
    adUnit: 'DAN-KjikwPCf2qoxvvyj',
    width: 300,
    height: 250,
  },
  '320x50': {
    adUnit: 'DAN-ghG2lS88KMsctrFo',
    width: 320,
    height: 50,
  },
} as const;

declare global {
  interface Window {
    adfit?: {
      display: (id: string) => void;
      destroy: (id: string) => void;
    };
  }
}

export function KakaoAdFit({ size = '300x250', className = '' }: KakaoAdFitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adId = useRef(`kakao-ad-${Math.random().toString(36).slice(2, 11)}`);
  const config = AD_CONFIGS[size];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.adfit && adRef.current) {
        try {
          window.adfit.display(adId.current);
        } catch (e) {
          console.warn('AdFit display error:', e);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (window.adfit) {
        try {
          window.adfit.destroy(adId.current);
        } catch (e) {
          console.warn('AdFit destroy error:', e);
        }
      }
    };
  }, []);

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        ref={adRef}
        id={adId.current}
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={config.adUnit}
        data-ad-width={config.width.toString()}
        data-ad-height={config.height.toString()}
      />
    </div>
  );
}

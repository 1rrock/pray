'use client';

import { useEffect, useRef } from 'react';

interface InContentAdProps {
  className?: string;
}

declare global {
  interface Window {
    adfit?: {
      display: (id: string) => void;
      destroy: (id: string) => void;
    };
  }
}

export function InContentAd({ className = '' }: InContentAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adId = useRef(`kakao-ad-${Math.random().toString(36).slice(2, 11)}`);

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
    <div className={`flex justify-center my-6 ${className}`}>
      <ins
        ref={adRef}
        id={adId.current}
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-KjikwPCf2qoxvvyj"
        data-ad-width="300"
        data-ad-height="250"
      />
    </div>
  );
}

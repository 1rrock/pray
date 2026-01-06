'use client';

import { useEffect, useRef } from 'react';

interface MobileBottomAdProps {
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

export function MobileBottomAd({ className = '' }: MobileBottomAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adId = useRef(`kakao-ad-bottom-${Math.random().toString(36).slice(2, 11)}`);

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
    <div 
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}
      style={{ height: '50px' }}
    >
      <ins
        ref={adRef}
        id={adId.current}
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-ghG2lS88KMsctrFo"
        data-ad-width="320"
        data-ad-height="50"
      />
    </div>
  );
}

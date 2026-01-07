'use client';

import { useEffect, useRef, useState } from 'react';

interface ResponsiveBannerAdProps {
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

export function ResponsiveBannerAd({ className = '' }: ResponsiveBannerAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adId = useRef(`kakao-ad-banner-${Math.random().toString(36).slice(2, 11)}`);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  }, [isMobile]);

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

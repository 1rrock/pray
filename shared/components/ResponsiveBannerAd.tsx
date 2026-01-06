'use client';

import { useEffect, useRef } from 'react';

interface ResponsiveBannerAdProps {
  adUnit: string;
  className?: string;
}

export function ResponsiveBannerAd({ adUnit, className = '' }: ResponsiveBannerAdProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : true;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.kakaoAdFit) {
      try {
        if (adContainerRef.current) {
          window.kakaoAdFit.destroyAd(adContainerRef.current);
        }
        
        if (adContainerRef.current) {
          const width = window.innerWidth < 768 ? 320 : 728;
          const height = window.innerWidth < 768 ? 100 : 90;
          
          window.kakaoAdFit.createAd({
            adUnit: adUnit,
            container: adContainerRef.current,
            width: width,
            height: height,
          });
        }
      } catch (error) {
        console.warn('Kakao AdFit error:', error);
      }
    }
  }, [adUnit]);

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <div 
        ref={adContainerRef}
        className="kakao-adfit"
        style={{ 
          width: isMobile ? '320px' : '728px',
          height: isMobile ? '100px' : '90px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb'
        }}
      >
      </div>
    </div>
  );
}

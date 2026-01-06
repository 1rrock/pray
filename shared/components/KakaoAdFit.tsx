'use client';

import { useEffect, useRef } from 'react';

interface KakaoAdFitProps {
  adUnit: string;
  width: number;
  height: number;
  className?: string;
}

export function KakaoAdFit({ adUnit, width, height, className = '' }: KakaoAdFitProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.kakaoAdFit) {
      try {
        if (adContainerRef.current) {
          window.kakaoAdFit.destroyAd(adContainerRef.current);
        }
        
        if (adContainerRef.current) {
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
  }, [adUnit, width, height]);

  return (
    <div 
      ref={adContainerRef}
      className={`kakao-adfit ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        margin: '0 auto'
      }}
    >
    </div>
  );
}

declare global {
  interface Window {
    kakaoAdFit?: {
      createAd: (options: {
        adUnit: string;
        container: HTMLElement;
        width: number;
        height: number;
      }) => void;
      destroyAd: (container: HTMLElement) => void;
    };
  }
}
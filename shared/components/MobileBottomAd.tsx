'use client';

import { useEffect, useRef } from 'react';

interface MobileBottomAdProps {
  adUnit: string;
  className?: string;
}

export function MobileBottomAd({ adUnit, className = '' }: MobileBottomAdProps) {
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
            width: 320,
            height: 50,
          });
        }
      } catch (error) {
        console.warn('Kakao AdFit error:', error);
      }
    }
  }, [adUnit]);

  return (
    <div 
      ref={adContainerRef}
      className={`kakao-adfit lg:hidden fixed bottom-0 left-0 right-0 z-40 ${className}`}
      style={{ 
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb'
      }}
    >
    </div>
  );
}

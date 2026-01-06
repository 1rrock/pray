'use client';

import { useEffect, useRef } from 'react';

interface InContentAdProps {
  adUnit: string;
  width?: number;
  height?: number;
  className?: string;
}

export function InContentAd({ 
  adUnit, 
  width = 300, 
  height = 250,
  className = '' 
}: InContentAdProps) {
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
    <div className={`flex justify-center my-6 ${className}`}>
      <div 
        ref={adContainerRef}
        className="kakao-adfit"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
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

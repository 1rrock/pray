'use client';

import { useEffect, useRef, useId, useState } from 'react';
import { usePathname } from 'next/navigation';

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

function generateAdId() {
  return `kakao-bottom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isAdfitReady(): boolean {
  return typeof window.adfit === 'object' && 
         window.adfit !== null && 
         typeof window.adfit.display === 'function';
}

export function MobileBottomAd({ className = '' }: MobileBottomAdProps) {
  const pathname = usePathname();
  const reactId = useId();
  const [adId, setAdId] = useState<string | null>(null);
  const adRef = useRef<HTMLModElement>(null);
  const displayedRef = useRef(false);

  useEffect(() => {
    setAdId(generateAdId());
  }, [pathname]);

  useEffect(() => {
    if (!adId) return;
    
    displayedRef.current = false;
    
    const displayAd = () => {
      if (displayedRef.current || !adRef.current) return;
      
      if (isAdfitReady()) {
        try {
          window.adfit!.display(adId);
          displayedRef.current = true;
        } catch (e) {
          console.warn('AdFit display error:', e);
        }
      }
    };

    const handleAdfitLoaded = () => {
      if (!displayedRef.current) {
        displayAd();
      }
    };

    let retryCount = 0;
    const maxRetries = 20;
    const retryInterval = setInterval(() => {
      if (displayedRef.current || retryCount >= maxRetries) {
        clearInterval(retryInterval);
        return;
      }
      displayAd();
      retryCount++;
    }, 250);

    window.addEventListener('adfitLoaded', handleAdfitLoaded);

    return () => {
      clearInterval(retryInterval);
      window.removeEventListener('adfitLoaded', handleAdfitLoaded);
      if (displayedRef.current && window.adfit?.destroy) {
        try {
          window.adfit.destroy(adId);
        } catch (e) {}
      }
    };
  }, [adId]);

  if (!adId) return null;

  return (
    <div 
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}
      style={{ height: '50px' }}
      key={`${pathname}-${reactId}-mobile-bottom`}
    >
      <ins
        ref={adRef}
        id={adId}
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-ghG2lS88KMsctrFo"
        data-ad-width="320"
        data-ad-height="50"
      />
    </div>
  );
}

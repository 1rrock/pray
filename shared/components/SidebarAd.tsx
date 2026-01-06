'use client';

import { useEffect, useRef, useId, useState } from 'react';
import { usePathname } from 'next/navigation';

type SidebarPosition = 'left' | 'right';

interface SidebarAdProps {
  position: SidebarPosition;
  className?: string;
}

const AD_UNITS = {
  left: 'DAN-e84TRQy2YthaXlvB',
  right: 'DAN-tOtSQS8P6ZiPYHbu',
} as const;

declare global {
  interface Window {
    adfit?: {
      display: (id: string) => void;
      destroy: (id: string) => void;
    };
  }
}

function generateAdId(position: SidebarPosition) {
  return `kakao-sidebar-${position}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isAdfitReady(): boolean {
  return typeof window.adfit === 'object' && 
         window.adfit !== null && 
         typeof window.adfit.display === 'function';
}

export function SidebarAd({ position, className = '' }: SidebarAdProps) {
  const pathname = usePathname();
  const reactId = useId();
  const [adId, setAdId] = useState<string | null>(null);
  const adRef = useRef<HTMLModElement>(null);
  const displayedRef = useRef(false);
  const adUnit = AD_UNITS[position];

  useEffect(() => {
    setAdId(generateAdId(position));
  }, [pathname, position]);

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
          console.warn('AdFit sidebar display error:', e);
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
    <div className={`flex justify-center ${className}`} key={`${pathname}-${reactId}-sidebar-${position}`}>
      <ins
        ref={adRef}
        id={adId}
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={adUnit}
        data-ad-width="160"
        data-ad-height="600"
      />
    </div>
  );
}

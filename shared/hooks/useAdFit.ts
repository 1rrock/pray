'use client';

import { useEffect, useRef, useId } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    adfit?: {
      display: (id: string) => void;
      destroy: (id: string) => void;
    };
  }
}

interface UseAdFitOptions {
  adUnit: string;
  width: number;
  height: number;
}

export function useAdFit({ adUnit, width, height }: UseAdFitOptions) {
  const pathname = usePathname();
  const reactId = useId();
  const adId = useRef(`kakao-ad-${reactId.replace(/:/g, '')}-${Date.now()}`);
  const adRef = useRef<HTMLModElement>(null);
  const displayedRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    displayedRef.current = false;
    
    const currentAdId = adId.current;
    
    const displayAd = () => {
      if (!mountedRef.current || displayedRef.current || !adRef.current) return;
      
      if (window.adfit && typeof window.adfit.display === 'function') {
        try {
          window.adfit.display(currentAdId);
          displayedRef.current = true;
        } catch (e) {
          console.warn('AdFit display error:', e);
        }
      }
    };

    const handleAdfitLoaded = () => {
      if (mountedRef.current && !displayedRef.current) {
        displayAd();
      }
    };

    if (window.adfit && typeof window.adfit.display === 'function') {
      const timer = setTimeout(displayAd, 50);
      return () => {
        clearTimeout(timer);
        mountedRef.current = false;
        if (displayedRef.current && window.adfit?.destroy) {
          try {
            window.adfit.destroy(currentAdId);
          } catch (e) {}
        }
      };
    }

    window.addEventListener('adfitLoaded', handleAdfitLoaded);

    return () => {
      window.removeEventListener('adfitLoaded', handleAdfitLoaded);
      mountedRef.current = false;
      if (displayedRef.current && window.adfit?.destroy) {
        try {
          window.adfit.destroy(currentAdId);
        } catch (e) {}
      }
    };
  }, [pathname]);

  return {
    adRef,
    adId: adId.current,
    adUnit,
    width,
    height,
  };
}

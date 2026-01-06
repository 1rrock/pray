'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AdFitScript() {
  const pathname = usePathname();

  // Reset adfit when pathname changes (SPA navigation)
  useEffect(() => {
    // If adfit is in broken state (function instead of object), delete it
    if (typeof window !== 'undefined' && typeof window.adfit === 'function') {
      delete (window as Window & { adfit?: unknown }).adfit;
      
      // Dynamically reload the SDK
      const existingScript = document.querySelector('script[src*="kas/static/ba.min.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
      script.async = true;
      script.onload = () => {
        window.dispatchEvent(new Event('adfitLoaded'));
      };
      document.head.appendChild(script);
    }
  }, [pathname]);

  return (
    <Script 
      src="//t1.daumcdn.net/kas/static/ba.min.js" 
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('adfitLoaded'));
        }
      }}
    />
  );
}

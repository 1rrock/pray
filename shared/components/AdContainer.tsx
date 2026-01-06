'use client';

import { usePathname } from 'next/navigation';
import { SidebarAd } from './SidebarAd';
import { MobileBottomAd } from './MobileBottomAd';

export function LeftSidebarAdContainer() {
  const pathname = usePathname();
  return <SidebarAd key={`left-${pathname}`} position="left" />;
}

export function RightSidebarAdContainer() {
  const pathname = usePathname();
  return <SidebarAd key={`right-${pathname}`} position="right" />;
}

export function MobileBottomAdContainer() {
  const pathname = usePathname();
  return <MobileBottomAd key={`mobile-${pathname}`} />;
}

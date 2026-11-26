"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  META_PIXEL_ID,
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
} from "@/lib/contact";

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    gtag?: Gtag;
  }
}

/**
 * Tracks every click on a WhatsApp link (wa.me) as a conversion:
 * - Meta Pixel: standard "Contact" event, which Meta Ads can optimize for.
 * - GA4: "whatsapp_click" (mark it as a key event in GA4).
 * The CTA label comes from data-cta on the link, or the link text as a fallback.
 */
function trackWhatsAppClicks(pathname: string) {
  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest?.("a[href*='wa.me/']") as HTMLAnchorElement | null;
    if (!link) return;
    const cta = link.dataset.cta || link.textContent?.trim().slice(0, 80) || "whatsapp";
    const params = { content_name: cta, content_category: pathname };
    window.fbq?.("track", "Contact", params);
    window.gtag?.("event", "whatsapp_click", { cta, page_path: pathname });
  };
  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => setEnabled(window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted");
    check();
    window.addEventListener(CONSENT_EVENT, check);
    return () => window.removeEventListener(CONSENT_EVENT, check);
  }, []);

  // PageView on client-side navigations (the first one is sent by the init script).
  const [firstPath] = useState(pathname);
  useEffect(() => {
    if (!enabled || pathname === firstPath) return;
    window.fbq?.("track", "PageView");
  }, [enabled, pathname, firstPath]);

  useEffect(() => {
    if (!enabled) return;
    return trackWhatsAppClicks(pathname);
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

"use client";
import { useEffect, useRef } from "react";

export default function AdBanner({ adSlot }) {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5183171666938196"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

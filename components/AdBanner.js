"use client";
import { useEffect } from "react";

export default function AdBanner({
  adSlot,
  adFormat = "auto", 
  fullWidth = true,
  minHeight = "250px",
  layoutKey, 
  style = {},
  className = "",
}) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, [adSlot, adFormat, layoutKey]);

  return (
    <div className={`my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight,
          width: fullWidth ? "100%" : "auto",
          ...style,
        }}
        data-ad-client="ca-pub-5183171666938196"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      ></ins>
    </div>
  );
}

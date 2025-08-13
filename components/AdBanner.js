"use client";
import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="my-4 flex justify-center">
      <div
        className="w-full min-h-[250px]"
        style={{ maxHeight: "400px", overflow: "hidden" }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            maxHeight: "400px"
          }}
          data-ad-client="ca-pub-5183171666938196"
          data-ad-slot="3736968322"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useContext, useRef, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function AdBanner({ adSlot }) {
  const { isDarkMode } = useContext(ThemeContext);
  const adRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Wait until the ad container has enough width
  useEffect(() => {
    const checkSize = setInterval(() => {
      if (adRef.current && adRef.current.offsetWidth >= 250) {
        setReady(true);
        clearInterval(checkSize);
      }
    }, 300);

    return () => clearInterval(checkSize);
  }, []);

  // Trigger AdSense once size is ready
  useEffect(() => {
    if (!ready) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [ready]);

  const themeClasses = {
    cardBg: isDarkMode ? "bg-slate-900/95" : "bg-white/95",
    border: isDarkMode ? "border-slate-700/50" : "border-gray-200",
    gradientBg: isDarkMode ? "from-slate-800 to-slate-900" : "from-gray-50 to-gray-100",
    text: isDarkMode ? "text-slate-300" : "text-gray-500",
  };

  return (
    <div
      className={`rounded-2xl shadow-sm overflow-hidden flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}
    >
      <div
        className={`relative flex items-center justify-center p-4 bg-gradient-to-br ${themeClasses.gradientBg}`}
      >
        <div
          className="absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border
          bg-gray-50 text-gray-600 border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
        >
          📢 Sponsored
        </div>

        {/* Responsive AdSense Unit */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: "100px" }}
          data-ad-client="ca-pub-5183171666938196"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      <div className="p-3 text-center text-sm text-gray-500 dark:text-slate-400">
        Advertisement
      </div>
    </div>
  );
}

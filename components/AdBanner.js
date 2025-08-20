"use client";
import { useEffect, useContext, useRef, useState } from "react";
import { ThemeContext } from '@/context/ThemeContext';

export default function AdBanner({ adSlot, desktopStyle, mobileStyle, dataAdFormat, dataFullWidthResponsive }) {
  const { isDarkMode } = useContext(ThemeContext);

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Check when container has width > 0
  useEffect(() => {
    const checkSize = setInterval(() => {
      if (
        (desktopRef.current && desktopRef.current.offsetWidth > 0) ||
        (mobileRef.current && mobileRef.current.offsetWidth > 0)
      ) {
        setReady(true);
        clearInterval(checkSize);
      }
    }, 200);

    return () => clearInterval(checkSize);
  }, []);

  // Initialize AdSense once size is ready
  useEffect(() => {
    if (!ready) return;

    const width =
      (desktopRef.current && desktopRef.current.offsetWidth) ||
      (mobileRef.current && mobileRef.current.offsetWidth);

    if (width < 300) {
      console.warn("Ad container too small for AdSense:", width);
      return;
    }

    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && !desktopRef.current?.getAttribute("data-adsbygoogle-status")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 1000);

    return () => clearTimeout(timer);
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
      <div className={`relative flex items-center justify-center p-4 bg-gradient-to-br ${themeClasses.gradientBg}`}>
        <div
          className="absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border
          bg-gray-50 text-gray-600 border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
        >
          📢 Sponsored
        </div>

        {/* Desktop / Tablet Ad */}
        <div className="w-full flex justify-center">
          <ins
            ref={desktopRef}
            className="adsbygoogle hidden sm:block"
            style={desktopStyle}
            data-ad-client="ca-pub-5183171666938196"
            data-ad-slot={adSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive}
          />
        </div>

        {/* Mobile Ad */}
        <div className="w-full flex justify-center">
          <ins
            ref={mobileRef}
            className="adsbygoogle block sm:hidden"
            style={mobileStyle}
            data-ad-client="ca-pub-5183171666938196"
            data-ad-slot={adSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive}
          />
        </div>
      </div>

      <div className="p-3 text-center text-sm text-gray-500 dark:text-slate-400">
        Advertisement
      </div>
    </div>
  );
}

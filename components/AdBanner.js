"use client";
import { useEffect, useContext } from "react";
import { ThemeContext } from '@/context/ThemeContext';


export default function AdBanner() {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  const themeClasses = {
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    gradientBg: isDarkMode ? 'from-slate-800 to-slate-900' : 'from-gray-50 to-gray-100',
    text: isDarkMode ? 'text-slate-300' : 'text-gray-500',
  };

  return (
    <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}>
      <div className={`relative h-48 flex items-center justify-center p-4 bg-gradient-to-br ${themeClasses.gradientBg}`}>
        <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border ${isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          📢 Sponsored
        </div>
        <div
          className="w-full min-h-[250px]"
          style={{ maxHeight: "400px", overflow: "hidden" }}
        >
          <ins
            className="adsbygoogle"
            style={{
              display:"inline-block",
              width:"200px",
              height:"300px"
            }}
            data-ad-client="ca-pub-5183171666938196"
            data-ad-slot="1375448730"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </div>
  );
}

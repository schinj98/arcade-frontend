'use client';

import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Flame, Search, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';
import AdBanner from '@/components/AdBanner';

const typeColors = {
  Trivia: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Game: 'bg-blue-50 text-blue-700 border-blue-200',
  Skill: 'bg-amber-50 text-amber-700 border-amber-200',
  labsFree: 'bg-purple-50 text-purple-700 border-purple-200'
};

const typeIcons = {
  Trivia: '🧠',
  Game: '🎮',
  Skill: '⚡',
  labsFree: '📖'
};

const filters = ['All', 'Trivia', 'Game', 'Skill', 'labsFree'];
const AD_POSITIONS = [2, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const useScreenSize = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleResize = () => {
      console.log("📏 Screen resized:", window.innerWidth);
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default function IncompleteBadges() {
  const [visibleCount, setVisibleCount] = useState(12);
  const itemsPerLoad = 12;
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const { profileData } = useContext(ProfileContext);
  const { isDarkMode } = useContext(ThemeContext);
  const screenWidth = useScreenSize();

  console.log("🟢 IncompleteBadges render start");
  console.log("📂 Profile Data:", profileData);
  console.log("🎨 Dark Mode:", isDarkMode);
  console.log("📱 Screen Width:", screenWidth);

  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950 border border-slate-600' : 'bg-slate-50',
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    text: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    borderLight: isDarkMode ? 'border-slate-600/30' : 'border-gray-200',
    hover: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50',
    accent: isDarkMode ? 'bg-slate-800/50' : 'bg-white',
    accentHover: isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-blue-50',
    gradientBg: isDarkMode ? 'from-slate-800 to-slate-900' : 'from-gray-50 to-gray-100',
    codeBg: isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-gray-100 text-gray-700',
    btnBg: isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white',
    toastBg: isDarkMode ? 'bg-green-600 text-white' : 'bg-green-600 text-white',
  };

  const badges = profileData?.incompleteBadges;
  const allBadges = [];

  if (badges) {
    const order = ['Game', 'Trivia', 'Skill', 'labsFree'];
    order.forEach((type) => {
      const categoryKey = {
        'Game': 'gameBadges',
        'Trivia': 'triviaBadges',
        'Skill': 'skillBadges',
        'labsFree': 'labsFreeBadges',
      }[type];

      const badgeItems = badges?.[categoryKey] || {};
      Object.values(badgeItems).forEach((badge) => {
        const badgeObj = {
          ...badge,
          id: badge.accessToken || badge.badgeName || badge.badgeLink,
          title: badge.badgeName,
          type,
          points: type === 'Skill' ? 0.5 : type === 'labsFree' ? 0 : (badge.points || 0),
        };
        allBadges.push(badgeObj);
      });
    });
  }

  console.log("🏷 All Badges Count:", allBadges.length);

  const filteredBadges = allBadges.filter((badge) => {
    const matchesFilter = activeFilter === 'All' || badge.type === activeFilter;
    const matchesSearch =
      badge.title?.toLowerCase().includes(search.toLowerCase()) ||
      badge.id?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  console.log("🔍 Filtered Badges Count:", filteredBadges.length);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      console.log("📋 Copied to clipboard:", text);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('❌ Copy failed', err);
    }
  };

  const itemsToRender = filteredBadges.slice(0, visibleCount);
  console.log("🖼 Items to Render Count:", itemsToRender.length);

  const renderGridWithAds = () => {
    const items = [];
    let adCounter = 0;

    console.log("📌 AD_POSITIONS:", AD_POSITIONS);

    itemsToRender.forEach((item, index) => {
      const position = index + 1;
      items.push(
        <div key={item.id} className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}>
          <div className={`relative h-48 flex items-center justify-center p-4 bg-gradient-to-br ${themeClasses.gradientBg}`}>
            <img
              src={item.image}
              alt={item.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/160x160?text=Badge';
              }}
            />
            <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border ${typeColors[item.type]}`}>
              <span className="mr-1">{typeIcons[item.type]}</span>
              {item.type}
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className={`text-lg font-semibold mb-3 line-clamp-2 leading-tight ${themeClasses.text}`}>
              {item.title}
            </h3>
            <div className="space-y-3 flex-1">
              <div className={`flex items-center text-sm ${themeClasses.textSecondary}`}>
                <Flame size={16} className="text-orange-500 mr-1" />
                <span className={themeClasses.text}>{item.points} Points</span>
              </div>
              {item.type !== 'Skill' && item.type !== 'labsFree' && (
                <div className="flex items-center gap-2">
                  <code className={`flex-1 text-xs px-3 py-2 rounded-lg font-mono truncate ${themeClasses.codeBg} border ${themeClasses.borderLight}`}>
                    {item.id}
                  </code>
                  <button onClick={() => copyToClipboard(item.id)} className={`p-2 rounded-lg ${themeClasses.hover}`} title="Copy ID">
                    {copiedId === item.id ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                console.log("🌐 Opening badge link:", item.badgeLink);
                window.open(item.badgeLink, '_blank');
              }}
              className={`w-full mt-4 py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${themeClasses.btnBg}`}
            >
              Start Challenge
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      );

      if (AD_POSITIONS.includes(position)) {
        adCounter++;
        console.log(`🛎 Inserting Ad at grid position: ${position}, adCounter: ${adCounter}, screenWidth: ${screenWidth}`);
        items.push(
          <div key={`ad-${adCounter}`} className={`rounded-2xl shadow-sm transition-all duration-300 overflow-hidden flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}>
            <div className="p-4 flex flex-col h-full min-h-[400px] justify-center items-center">
              <div className="text-xs text-gray-500 mb-2 opacity-60">Advertisement</div>
              {screenWidth >= 1024 ? (
                <AdBanner slot="6757969054" format="rectangle" style={{display:"inline-block", width:"280px", height:"336px"}} responsive={false} />
              ) : screenWidth >= 768 ? (
                <AdBanner slot="6757969054" format="medium_rectangle" style={{display:"inline-block", width:"250px", height:"300px"}} responsive={false} />
              ) : (
                <AdBanner slot="8577752535" format="banner" style={{display:"inline-block", width:"280px", height:"250px"}} responsive={false} />
              )}
            </div>
          </div>
        );
      }
    });

    console.log("✅ Final items count in grid (badges + ads):", items.length);
    return items;
  };

  return (
    <div className={`rounded-xl p-6 ${themeClasses.bg}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* ... header and filter UI unchanged ... */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderGridWithAds()}
        </div>
      </div>
    </div>
  );
}

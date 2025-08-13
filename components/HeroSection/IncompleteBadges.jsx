'use client';

import React, { useEffect, useContext, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Flame, Search, Filter, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';

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

// Enhanced AdSense Card Component with responsive ad configurations
const AdSenseCard = ({ adSlot, className = "", adIndex = 0 }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [screenSize, setScreenSize] = useState('desktop');
  
  // Screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Responsive ad configurations for different screen sizes
  const adConfigs = {
    mobile: {
      format: 'rectangle',
      style: { display: 'block', width: '300px', height: '250px' },
      layoutKey: null,
      fullWidthResponsive: 'false'
    },
    tablet: {
      format: 'rectangle', 
      style: { display: 'inline-block', width: '336px', height: '280px' },
      layoutKey: null,
      fullWidthResponsive: 'false'
    },
    desktop: {
      format: 'rectangle',
      style: { display: 'inline-block', width: '300px', height: '250px' },
      layoutKey: null,
      fullWidthResponsive: 'false'
    }
  };

  const currentConfig = adConfigs[screenSize];
  
  // Theme classes matching your existing design
  const themeClasses = {
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    gradientBg: isDarkMode ? 'from-slate-800 to-slate-900' : 'from-gray-50 to-gray-100',
  };

  // Different ad slots for different positions and screen sizes
  const getAdSlot = () => {
    const slotMap = {
      mobile: {
        primary: "9513707482",   // Your existing slot
        secondary: "4261380806"  // Your existing slot
      },
      tablet: {
        primary: "9513707482",   
        secondary: "4261380806"
      },
      desktop: {
        primary: "9513707482",   
        secondary: "4261380806"
      }
    };
    
    const isSecondary = adIndex % 2 === 1;
    return slotMap[screenSize][isSecondary ? 'secondary' : 'primary'];
  };

  useEffect(() => {
    try {
      // Push to AdSense queue for initialization
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [screenSize]); // Re-initialize when screen size changes

  return (
    <div className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col ${themeClasses.cardBg} border ${themeClasses.border} ${className}`}>
      {/* Ad Header */}
      <div className={`relative h-48 flex items-center justify-center p-4 bg-gradient-to-br ${themeClasses.gradientBg}`}>
        <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border ${isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          <span className="mr-1">📢</span>
          Sponsored
        </div>
        
        {/* Responsive AdSense Ad Unit */}
        <div className="w-full h-full flex items-center justify-center">
          <ins 
            className="adsbygoogle"
            style={currentConfig.style}
            data-ad-format={currentConfig.format}
            data-ad-layout-key={currentConfig.layoutKey}
            data-ad-client="ca-pub-5183171666938196"
            data-ad-slot={getAdSlot()}
            data-full-width-responsive={currentConfig.fullWidthResponsive}
          />
        </div>
      </div>

      {/* Ad Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className={`text-sm text-center ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Advertisement • {screenSize}
        </div>
      </div>
    </div>
  );
};

// Alternative Large Banner Ad Component for better desktop visibility
const LargeBannerAd = ({ adIndex = 0, className = "" }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const themeClasses = {
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
  };

  // Banner ad configurations
  const bannerConfigs = {
    mobile: {
      format: 'banner',
      style: { display: 'block', width: '320px', height: '100px' },
    },
    tablet: {
      format: 'banner',
      style: { display: 'block', width: '728px', height: '90px' },
    },
    desktop: {
      format: 'banner',
      style: { display: 'block', width: '728px', height: '90px' },
    }
  };

  const currentConfig = bannerConfigs[screenSize];

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense banner error:', err);
    }
  }, [screenSize]);

  // Only show on desktop/tablet and every 8th position
  if (screenSize === 'mobile' || adIndex % 8 !== 0) {
    return null;
  }

  return (
    <div className={`col-span-full rounded-2xl shadow-sm border overflow-hidden ${themeClasses.cardBg} ${themeClasses.border} ${className} my-6`}>
      <div className="p-4 text-center">
        <div className={`text-xs mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          <span className="mr-1">📢</span>
          Sponsored Content
        </div>
        <div className="flex justify-center">
          <ins 
            className="adsbygoogle"
            style={currentConfig.style}
            data-ad-format={currentConfig.format}
            data-ad-client="ca-pub-5183171666938196"
            data-ad-slot="9513707482"
            data-full-width-responsive="false"
          />
        </div>
      </div>
    </div>
  );
};

// Modified IncompleteBadges component with enhanced ads
export default function IncompleteBadgesWithAds() {
  const [visibleCount, setVisibleCount] = useState(12);
  const itemsPerLoad = 12;
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const { profileData } = useContext(ProfileContext);
  const { isDarkMode } = useContext(ThemeContext);

  // Add AdSense script to head
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5183171666938196';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // theme classes (apply only for dark mode; light mode retains original classes)
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

  const filteredBadges = allBadges.filter((badge) => {
    const matchesFilter = activeFilter === 'All' || badge.type === activeFilter;
    const matchesSearch =
      badge.title?.toLowerCase().includes(search.toLowerCase()) ||
      badge.id?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Enhanced function to inject ads with better positioning
  const getBadgesWithAds = () => {
    const badgesWithAds = [];
    let adCounter = 0;
    
    filteredBadges.slice(0, visibleCount).forEach((badge, index) => {
      // Add banner ad at the top (position 0) for desktop/tablet
      if (index === 0) {
        badgesWithAds.push({
          id: `banner-ad-top`,
          isBannerAd: true,
          adIndex: adCounter++
        });
      }
      
      badgesWithAds.push({ ...badge, isAd: false });
      
      // Insert card ads at strategic positions
      const cardAdPositions = [3, 8, 14, 21, 28]; // Every ~5-7 cards
      if (cardAdPositions.includes(index + 1) && index < visibleCount - 1) {
        badgesWithAds.push({
          id: `card-ad-${index}`,
          isAd: true,
          adIndex: adCounter++
        });
      }
      
      // Insert banner ads for desktop every 16 items
      if ((index + 1) % 16 === 0 && index < visibleCount - 1) {
        badgesWithAds.push({
          id: `banner-ad-${index}`,
          isBannerAd: true,
          adIndex: adCounter++
        });
      }
    });
    
    return badgesWithAds;
  };

  // copy helper
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const itemsToRender = getBadgesWithAds();

  return (
    <div className={`rounded-xl p-6 ${themeClasses.bg}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Keep original */}
        <div className={`rounded-2xl shadow-sm p-8 mb-8 border ${isDarkMode ? themeClasses.border : 'border-gray-200'} ${isDarkMode ? themeClasses.cardBg : 'bg-white'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? themeClasses.text : 'text-gray-900'}`}>Incomplete Badges</h1>
              <p className={`${isDarkMode ? themeClasses.textSecondary : 'text-gray-600'}`}>
                Complete challenges to earn badges and boost your skills
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className={`flex items-center text-sm ${isDarkMode ? themeClasses.textMuted : 'text-gray-500'}`}>
                  <span className={`${isDarkMode ? themeClasses.text : 'font-medium text-gray-900'}`}>{filteredBadges.length}</span>
                  <span className="ml-1">badges available</span>
                </div>
                <div className={`flex items-center text-sm ${isDarkMode ? themeClasses.textMuted : 'text-gray-500'}`}>
                  <Flame size={16} className="text-orange-500 mr-1" />
                  <span className={`${isDarkMode ? themeClasses.text : 'font-medium text-gray-900'}`}>
                    {filteredBadges.reduce((sum, badge) => sum + badge.points, 0)}
                  </span>
                  <span className="ml-1">total points</span>
                </div>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 lg:min-w-[400px]">
              <div className="relative flex-1">
                <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search badges..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${isDarkMode ? 'bg-slate-800/60 placeholder-slate-400 text-slate-200 focus:ring-slate-700 border ' + themeClasses.border : 'border border-gray-300 placeholder:text-slate-400 focus:ring-blue-500'}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs - Keep original */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 cursor-pointer rounded-xl font-medium transition-all duration-200 ${activeFilter === filter
                ? `${isDarkMode ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'}`
                : `${isDarkMode ? 'bg-slate-800 text-slate-200 border ' + themeClasses.borderLight + ' ' + themeClasses.hover : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`
              }`}
            >
              {filter !== 'All' && (
                <span className="mr-2">{typeIcons[filter]}</span>
              )}
              {filter}
            </button>
          ))}
        </div>

        {/* Enhanced Badges Grid with Responsive Ads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {itemsToRender.map((item) => {
            if (item.isBannerAd) {
              return (
                <LargeBannerAd
                  key={item.id}
                  adIndex={item.adIndex}
                  className="mb-6"
                />
              );
            }
            
            if (item.isAd) {
              return (
                <AdSenseCard
                  key={item.id}
                  adIndex={item.adIndex}
                  className="col-span-1"
                />
              );
            }
            
            return (
              <div
                key={item.id}
                className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col ${isDarkMode ? themeClasses.cardBg + ' border ' + themeClasses.border : 'bg-white border border-gray-200'}`}
              >
                {/* Original Badge Card Content */}
                <div className={`relative h-48 flex items-center justify-center p-4 ${isDarkMode ? `bg-gradient-to-br ${themeClasses.gradientBg}` : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/160x160?text=Badge';
                    }}
                  />
                  <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border ${typeColors[item.type] || (isDarkMode ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-gray-50 text-gray-700 border-gray-200')}`}>
                    <span className="mr-1">{typeIcons[item.type]}</span>
                    {item.type}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className={`text-lg font-semibold mb-3 line-clamp-2 leading-tight ${isDarkMode ? themeClasses.text : 'text-gray-900'}`}>
                    {item.title}
                  </h3>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center text-sm ${isDarkMode ? themeClasses.textSecondary : 'text-gray-600'}`}>
                        <Flame size={16} className="text-orange-500 mr-1" />
                        <span className={`${isDarkMode ? themeClasses.text : 'font-medium text-gray-900'}`}>{item.points} Points</span>
                      </div>
                    </div>

                    {item.type !== 'Skill' && item.type !== 'labsFree' && (
                      <div className="flex items-center gap-2">
                        <code className={`flex-1 text-xs px-3 py-2 rounded-lg font-mono truncate ${isDarkMode ? themeClasses.codeBg + ' border ' + themeClasses.borderLight : 'bg-gray-100 text-gray-700'}`}>
                          {item.id}
                        </code>
                        <button
                          onClick={() => copyToClipboard(item.id)}
                          className={`p-2 cursor-pointer ${isDarkMode ? 'text-slate-200 hover:text-white ' + themeClasses.hover : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'} rounded-lg transition-colors`}
                          title="Copy ID"
                        >
                          {copiedId === item.id ? (
                            <CheckCircle size={16} className="cursor-pointer text-green-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => window.open(item.badgeLink, '_blank')}
                    className={`w-full mt-4 cursor-pointer py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${isDarkMode ? themeClasses.btnBg : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                  >
                    Start Challenge
                    <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rest of your original code... */}
        {visibleCount < filteredBadges.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + itemsPerLoad)}
              className={`px-8 py-4 cursor-pointer rounded-xl transition-all duration-200 font-medium shadow-sm ${
                isDarkMode
                  ? `border text-white ${themeClasses.border} ${themeClasses.cardBg}`
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
                          >
              Load More Badges ({filteredBadges.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {filteredBadges.length === 0 && (
          <div className="text-center py-16">
            <div className={`text-6xl mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-400'}`}>🏆</div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? themeClasses.text : 'text-gray-900'}`}>No badges found</h3>
            <p className={`${isDarkMode ? themeClasses.textSecondary : 'text-gray-600'}`}>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {copiedId && (
          <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4 ${themeClasses.toastBg}`}>
            <CheckCircle size={20}/>
            Badge ID copied!
          </div>
        )}
      </div>
    </div>
  );
}
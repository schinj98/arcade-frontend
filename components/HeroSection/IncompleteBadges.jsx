'use client';

import React, { useContext, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Flame, Search, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';
import AdBanner from '@/components/AdBanner'; // Adjust the path as needed

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

// Ad positions (1-indexed, so we subtract 1 for 0-indexed array)
const AD_POSITIONS = [2, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50]; // Added more positions for larger lists

export default function IncompleteBadges() {
  const [visibleCount, setVisibleCount] = useState(12);
  const itemsPerLoad = 12;
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const { profileData } = useContext(ProfileContext);
  const { isDarkMode } = useContext(ThemeContext);

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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const itemsToRender = filteredBadges.slice(0, visibleCount);

  // Function to render grid items with ads
  const renderGridWithAds = () => {
    const items = [];
    let adCounter = 0;

    itemsToRender.forEach((item, index) => {
      const position = index + 1; // 1-indexed position

      // Add badge card
      items.push(
        <div
          key={item.id}
          className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}
        >
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
                  <button
                    onClick={() => copyToClipboard(item.id)}
                    className={`p-2 rounded-lg ${themeClasses.hover}`}
                    title="Copy ID"
                  >
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
              onClick={() => window.open(item.badgeLink, '_blank')}
              className={`w-full mt-4 py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${themeClasses.btnBg}`}
            >
              Start Challenge
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      );

      // Check if we need to add an ad after this position
      if (AD_POSITIONS.includes(position)) {
        adCounter++;
        items.push(
          <div
            key={`ad-${adCounter}`}
            className={`rounded-2xl shadow-sm transition-all duration-300 overflow-hidden flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}
          >
            <div className="p-4 flex flex-col h-full min-h-[400px] justify-center items-center">
            <AdBanner 
              slot="8577752535" 
              format="rectangle" 
              style="display:inline-block;width:250px;height:336px"
              responsive={false} 
            />
            </div>
          </div>
        );
      }
    });

    return items;
  };

  return (
    <div className={`rounded-xl p-6 ${themeClasses.bg}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className={`rounded-2xl shadow-sm p-8 mb-8 border ${themeClasses.border} ${themeClasses.cardBg}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${themeClasses.text}`}>Incomplete Badges</h1>
              <p className={themeClasses.textSecondary}>
                Complete challenges to earn badges and boost your skills
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className={`flex items-center text-sm ${themeClasses.textMuted}`}>
                  <span className={themeClasses.text}>{filteredBadges.length}</span>
                  <span className="ml-1">badges available</span>
                </div>
                <div className={`flex items-center text-sm ${themeClasses.textMuted}`}>
                  <Flame size={16} className="text-orange-500 mr-1" />
                  <span className={themeClasses.text}>
                    {filteredBadges.reduce((sum, badge) => sum + badge.points, 0)}
                  </span>
                  <span className="ml-1">total points</span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 lg:min-w-[400px]">
              <div className="relative flex-1">
                <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted}`} />
                <input
                  type="text"
                  placeholder="Search badges..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${themeClasses.cardBg} ${themeClasses.border}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : `${themeClasses.accent} ${themeClasses.border} ${themeClasses.hover}`
              }`}
            >
              {filter !== 'All' && (
                <span className="mr-2">{typeIcons[filter]}</span>
              )}
              {filter}
            </button>
          ))}
        </div>

        {/* Badges Grid with Ads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderGridWithAds()}
        </div>

        {/* Load More */}
        {visibleCount < filteredBadges.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + itemsPerLoad)}
              className={`px-8 py-4 rounded-xl transition-all duration-200 font-medium shadow-sm ${themeClasses.cardBg} ${themeClasses.border}`}
            >
              Load More Badges ({filteredBadges.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* No Badges */}
        {filteredBadges.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 text-gray-400">🏆</div>
            <h3 className={`text-xl font-semibold mb-2 ${themeClasses.text}`}>No badges found</h3>
            <p className={themeClasses.textSecondary}>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Toast */}
        {copiedId && (
          <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 ${themeClasses.toastBg}`}>
            <CheckCircle size={20}/>
            Badge ID copied!
          </div>
        )}
      </div>
    </div>
  );
}
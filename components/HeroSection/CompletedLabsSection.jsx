// CompletedLabsSection.jsx
'use client';

import React, { useContext, useState, useRef } from 'react';
import {
  Copy, Flame, ExternalLink, ChevronDown, ChevronUp,
  Search, Award, Trophy, Target, FileText, Star, Brain
} from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';
import { ThemeContext } from '../../context/ThemeContext';

const categoryConfig = {
  skillBadges: {
    name: 'Skill Badges',
    icon: Trophy,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    description: 'Technical skill achievements',
  },
  levelBadges: {
    name: 'Level Badges',
    icon: Trophy,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    description: 'Progressive achievement levels',
  },
  certificationBadges: {
    name: 'Certification Badges',
    icon: Trophy,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    description: 'Professional certifications',
  },
  triviaBadges: {
    name: 'Trivia Badges',
    icon: Trophy,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    description: 'Knowledge challenge badges',
  },
};

export default function CompletedLabsSection() {
  const { profileData } = useContext(ProfileContext) || {};
  // safe fallback if ThemeContext isn't provided
  const themeCtx = useContext(ThemeContext) || { isDarkMode: false };
  const { isDarkMode } = themeCtx;

  // dark-mode only themeClasses (light values kept same)
  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950 border border-slate-600' : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    text: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200/50',
    borderLight: isDarkMode ? 'border-slate-600/30' : 'border-gray-100/30',
    hover: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-100',
    accent: isDarkMode ? 'bg-slate-800/50' : 'bg-blue-50',
    accentHover: isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-blue-50/50',
  };

  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const completedBadges = profileData?.badgesOverview || {};

  const toggleCategory = (categoryKey) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryKey)
        ? prev.filter((key) => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const getCategoryStats = (categoryKey) => {
    const category = completedBadges[categoryKey] || {};
    const badgeCount = category.count || 0;
    let totalPoints = category.totalPoints;

    if (
      categoryKey === 'skillBadges' &&
      (totalPoints == 0 && (profileData?.completed_skill_badges_list?.length || 0) > 0)
    ) {
      const skillBadges = profileData?.completed_skill_badges_list || [];
      totalPoints = Math.floor(skillBadges.length / 2);
    }

    return { badgeCount, totalPoints };
  };

  const getFilteredBadges = (categoryKey) => {
    let badges = completedBadges[categoryKey]?.badges || [];

    if (badges.length === 0) {
      if (categoryKey === 'levelBadges') {
        badges = profileData?.completed_game_badges_list || [];
      } else if (categoryKey === 'skillBadges') {
        badges = profileData?.completed_skill_badges_list || [];
      } else if (categoryKey === 'triviaBadges') {
        badges = profileData?.completed_trivia_badges || [];
      } else if (categoryKey === 'labsFreeBadges') {
        badges = profileData?.completed_labsFree_badges_list || [];
      }
    }

    if (!searchTerm) return badges;

    return badges.filter((badge) =>
      badge.badgeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const totalBadgesThisSeason = Object.values(completedBadges).reduce(
    (total, category) => total + (category.count || 0),
    0
  );

  return (
    <div className={`${themeClasses.bg} rounded-xl p-4 sm:p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header card */}
        <div className={`${isDarkMode ? themeClasses.cardBg + ' rounded-2xl shadow-sm border ' + themeClasses.border : 'bg-white rounded-2xl shadow-sm border border-gray-200'} p-6 sm:p-8 mb-6 sm:mb-8`}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${themeClasses.text}`}>
                Completed Badges
              </h1>
              <p className={`text-sm sm:text-base mb-4 ${themeClasses.textSecondary}`}>
                Find out Badges you've completed in this season.
              </p>
            </div>

            <div className={`${isDarkMode ? 'inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium self-start lg:self-center flex-shrink-0 ' + themeClasses.accent : 'inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 shadow-md bg-blue-50 text-blue-400 rounded-full text-xs sm:text-sm font-medium self-start lg:self-center flex-shrink-0'}`}>
              <Trophy size={14} className="mr-1.5 sm:mr-2" />
              {totalBadgesThisSeason} badges this season
            </div>
          </div>
        </div>

        {/* Categories container */}
        <div className={`${isDarkMode ? themeClasses.cardBg + ' rounded-2xl shadow-sm border ' + themeClasses.border : 'bg-white rounded-2xl shadow-sm border border-gray-200'} overflow-hidden`}>
          <div className={`p-4 sm:p-6 ${isDarkMode ? 'border-b ' + themeClasses.border : 'border-b border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg sm:text-xl font-semibold ${themeClasses.text}`}>Category</h2>
              <div className="flex gap-4 sm:gap-8 text-right px-8">
                <div className="hidden sm:block text-center">
                  <div className={`text-sm font-medium ${themeClasses.textSecondary}`}>Badges</div>
                </div>
                <div className="hidden sm:block text-center">
                  <div className={`text-sm font-medium ${themeClasses.textSecondary}`}>Points</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`divide-y ${isDarkMode ? 'divide-slate-700/40' : 'divide-gray-200'}`}>
            {Object.entries(categoryConfig).map(([categoryKey, config], index) => {
              const stats = getCategoryStats(categoryKey);
              const IconComponent = config.icon;
              const isExpanded = expandedCategories.includes(categoryKey);
              const filteredBadges = getFilteredBadges(categoryKey);

              const contentRef = useRef(null);
              const rowBgClass = isDarkMode
                ? themeClasses.cardBg
                : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50');

              return (
                <div key={categoryKey} className={`transition-all duration-200 ${rowBgClass}`}>
                  <div
                    className={`px-4 py-3 sm:px-6 sm:py-4 cursor-pointer transition-colors ${isDarkMode ? themeClasses.hover : 'hover:bg-gray-100'}`}
                    onClick={() => toggleCategory(categoryKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`p-1.5 sm:p-2 rounded-lg ${isDarkMode ? (config.bgColor === 'bg-blue-50' ? 'bg-blue-900/20' : config.bgColor) : config.bgColor}`}>
                          <IconComponent size={18} className={isDarkMode ? (config.color === 'text-blue-400' ? 'text-blue-300' : config.color) : config.color} />
                        </div>
                        <p className={`text-sm sm:text-base ${themeClasses.text}`}>{config.name}</p>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-8">
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-8">
                          <div className="text-center">
                            <div className={`text-sm ${themeClasses.text}`}>{stats.badgeCount}</div>
                            <div className={`block sm:hidden text-xs ${themeClasses.textMuted}`}>Badges</div>
                          </div>
                          <div className="text-center">
                            <div className={`${config.color} text-sm`}>{stats.totalPoints || 0}</div>
                            <div className={`block sm:hidden text-xs ${themeClasses.textMuted}`}>Points</div>
                          </div>
                        </div>

                        <div className="ml-2 sm:ml-4 flex-shrink-0">
                          {isExpanded ? (
                            <ChevronUp size={20} className={isDarkMode ? themeClasses.textMuted : 'text-gray-400'} />
                          ) : (
                            <ChevronDown size={20} className={isDarkMode ? themeClasses.textMuted : 'text-gray-400'} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <div
                    ref={contentRef}
                    style={{
                      maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
                    }}
                    className={`overflow-hidden transition-all duration-500 ${isDarkMode ? themeClasses.bg : 'bg-gray-50'}`}
                  >
                    {stats.badgeCount > 0 ? (
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 gap-4 sm:gap-6">
                          {filteredBadges.map((badge, idx) => (
                            <div
                              key={`${categoryKey}-${idx}`}
                              className={`${isDarkMode ? themeClasses.cardBg + ' border ' + themeClasses.border : 'bg-white border border-gray-200'} rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col`}
                            >
                              <div className={`${isDarkMode ? 'relative h-40 sm:h-48 bg-gradient-to-br from-slate-800/20 to-slate-900/10' : 'relative h-40 sm:h-48 bg-gradient-to-br from-gray-50 to-gray-100'} flex items-center justify-center p-3 sm:p-4`}>
                                <img
                                  src={badge.image}
                                  alt={badge.badgeName}
                                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/160x160?text=Badge';
                                  }}
                                />
                              </div>
                              <div className={`p-4 sm:p-6 flex flex-col flex-1`}>
                                <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 line-clamp-2 leading-tight ${themeClasses.text}`}>
                                  {badge.badgeName}
                                </h3>
                                <div className="space-y-2 sm:space-y-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <div className={`flex items-center text-sm ${themeClasses.textSecondary}`}>
                                      <Flame size={14} className="text-orange-500 mr-1" />
                                      <span className="font-medium">{badge.points} Points</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                        <div className="text-center py-6 sm:py-8">
                          <div className={`${isDarkMode ? 'text-slate-400' : 'text-gray-400'} text-xl sm:text-2xl mb-2`}>🏆</div>
                          <p className={`${isDarkMode ? themeClasses.textMuted : 'text-gray-500'} text-xs sm:text-sm`}>
                            No badges Completions in this category yet
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

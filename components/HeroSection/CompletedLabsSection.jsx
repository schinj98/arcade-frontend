'use client';

import React, { useContext, useState } from 'react';
import { Copy, Flame, ExternalLink, ChevronDown, ChevronUp, Search, Award, Trophy, Target, FileText, Star, Brain } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';
import { motion, AnimatePresence } from 'framer-motion';



const categoryConfig = {
  skillBadges: {
    name: 'Skill Badges',
    icon: Trophy,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    description: 'Technical skill achievements'
  },
  levelBadges: {
    name: 'Level Badges',
    icon: Trophy,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    description: 'Progressive achievement levels'
  },
  certificationBadges: {
    name: 'Certification Badges',
    icon: Trophy,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    description: 'Professional certifications'
  },
  triviaBadges: {
    name: 'Trivia Badges',
    icon: Trophy,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    description: 'Knowledge challenge badges'
  }
};

export default function CompletedLabsSection() {
  const { profileData } = useContext(ProfileContext);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const completedBadges = profileData?.badgesOverview || {};
  const [copiedId, setCopiedId] = useState(null);



  const getCategoryStats = (categoryKey) => {
  const category = completedBadges[categoryKey] || {};
  const badgeCount = category.count || 0;
  let totalPoints = category.totalPoints;

  // Only override totalPoints for skillBadges if invalid
  if (
    categoryKey === 'skillBadges' &&
    (totalPoints == 0 && (profileData?.completed_skill_badges?.length || 0) > 0)
  ) {
    const skillBadges = profileData?.completed_skill_badges || [];
    totalPoints = Math.floor(skillBadges.length / 2);
  }

  return { badgeCount, totalPoints };
};


  const totalBadgesThisSeason = Object.values(completedBadges).reduce((total, category) =>
    total + (category.count || 0), 0
  );

  const toggleCategory = (categoryKey) => {
    if (expandedCategories.includes(categoryKey)) {
      // If already expanded, remove it (collapse it)
      setExpandedCategories(expandedCategories.filter(key => key !== categoryKey));
    } else {
      // Else, add it to the list of expanded categories
      setExpandedCategories([...expandedCategories, categoryKey]);
    }
  };
  

  const getFilteredBadges = (categoryKey) => {
    let badges = completedBadges[categoryKey]?.badges || [];
  
    if (badges.length === 0) {
      if (categoryKey === 'levelBadges') {
        badges = profileData?.completed_game_badges || [];
      } else if (categoryKey === 'skillBadges') {
        badges = profileData?.completed_skill_badges || [];
      } else if (categoryKey === 'triviaBadges') {
        badges = profileData?.completed_trivia_badges || [];
      }
    }
  
    if (!searchTerm) return badges;
    return badges.filter(badge =>
      badge.badgeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  

  return (
    <div className="rounded-xl bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Left side: Heading and description */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Completed Badges</h1>
                    <p className="text-gray-600 mb-4">
                        Find out Badges you've completed in this season.
                    </p>
                </div>

                {/* Right side: Badge stats */}
                <div className="inline-flex items-center px-4 py-2 shadow-md bg-blue-50 text-blue-400 rounded-full text-sm font-medium self-start lg:self-center">
                    <Trophy size={16} className="mr-2" />
                    {totalBadgesThisSeason} badges this season
                </div>
            </div>
        </div>


        {/* Categories Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Category</h2>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">Badges</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600"></div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Category List */}
          <div className="divide-y divide-gray-200">
          {Object.entries(categoryConfig).map(([categoryKey, config], index) => {
            const stats = getCategoryStats(categoryKey);
            const IconComponent = config.icon;
            const isExpanded = expandedCategories.includes(categoryKey);
            const filteredBadges = getFilteredBadges(categoryKey);

            // Alternate row background: even - white, odd - gray
            const rowBgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

            return (
                <div key={categoryKey} className={`transition-all duration-200 ${rowBgClass}`}>
                {/* Category Header */}
                <div 
                    className="px-6 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleCategory(categoryKey)}
                >
                    {/* ... rest of your code ... */}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${config.bgColor}`}>
                          <IconComponent size={20} className={config.color} />
                        </div>
                        <div>
                          <p className="text-gray-800">{config.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center min-w-[60px]">
                          <div className=" text-gray-800">{stats.badgeCount}</div>
                        </div>
                        <div className="text-center min-w-[60px]">
                          <div className="text-blue-400">{stats.totalPoints || 0}</div>
                        </div>
                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronUp size={20} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Badges */}
                  {isExpanded && stats.badgeCount > 0 && (
                    <div className="px-6 pb-6 bg-gray-50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 gap-6">
                        {filteredBadges.map((badge, index) => (
                            <div
                            key={`${categoryKey}-${index}`}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group flex flex-col"
                            >
                            {/* Badge Image */}
                            <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
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

                            {/* Badge Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                                {badge.badgeName}
                                </h3>

                                {/* Badge Info */}
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Flame size={16} className="text-orange-500 mr-1" />
                                            <span className="font-medium">{badge.points} Points</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}

                  {/* Empty State for Expanded Category */}
                  {isExpanded && stats.badgeCount === 0 && (
                    <div className="px-6 pb-6 bg-gray-50">
                      <div className="text-center py-8">
                        <div className="text-gray-400 text-2xl mb-2">🏆</div>
                        <p className="text-gray-500 text-sm">No badges Completions in this category yet</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
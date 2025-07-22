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
      setExpandedCategories(expandedCategories.filter(key => key !== categoryKey));
    } else {
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
      } else if (categoryKey === 'certificationBadges') { // Added for certification badges
        badges = profileData?.completed_certification_badges || [];
      }
    }
  
    if (!searchTerm) return badges;
    return badges.filter(badge =>
      badge.badgeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  

  return (
    <div className="rounded-xl bg-gray-50 p-4 sm:p-6"> {/* Adjusted padding for small screens */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8"> {/* Adjusted padding */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6"> {/* Adjusted gap */}
                {/* Left side: Heading and description */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Completed Badges</h1> {/* Adjusted font size */}
                    <p className="text-sm sm:text-base text-gray-600 mb-4"> {/* Adjusted font size */}
                        Find out Badges you've completed in this season.
                    </p>
                </div>

                {/* Right side: Badge stats */}
                {/* Ensured this remains a single line on small screens but wraps if content is too long */}
                <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 shadow-md bg-blue-50 text-blue-400 rounded-full text-xs sm:text-sm font-medium self-start lg:self-center flex-shrink-0">
                    <Trophy size={14} className="mr-1.5 sm:mr-2" /> {/* Adjusted icon size and margin */}
                    {totalBadgesThisSeason} badges this season
                </div>
            </div>
        </div>


        {/* Categories Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200"> {/* Adjusted padding */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Category</h2> {/* Adjusted font size */}
              </div>
              {/* This section will become a column layout on small screens for better readability */}
              <div className="flex gap-4 sm:gap-8 text-right px-8">
                <div className="hidden sm:block text-center"> {/* Hidden on extra small, visible on small and up */}
                  <div className="text-sm font-medium text-gray-600">Badges</div>
                </div>
                <div className="hidden sm:block text-center"> {/* Hidden on extra small, visible on small and up */}
                  <div className="text-sm font-medium text-gray-600">Points</div>
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

            const rowBgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

            return (
                <div key={categoryKey} className={`transition-all duration-200 ${rowBgClass}`}>
                  {/* Category Header */}
                  <div 
                      className="px-4 py-3 sm:px-6 sm:py-4 cursor-pointer hover:bg-gray-100 transition-colors" // Adjusted padding
                      onClick={() => toggleCategory(categoryKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4"> {/* Adjusted gap */}
                        <div className={`p-1.5 sm:p-2 rounded-lg ${config.bgColor}`}> {/* Adjusted padding */}
                          <IconComponent size={18} className={config.color} /> {/* Adjusted icon size */}
                        </div>
                        <div>
                          <p className="text-sm sm:text-base text-gray-800">{config.name}</p> {/* Adjusted font size */}
                        </div>
                      </div>
                      
                      {/* Flex container for stats and chevron, changes direction on small screens */}
                      <div className="flex items-center gap-4 sm:gap-8">
                        {/* Stats visible on all screens, adjusted layout for small */}
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-8">
                          <div className="text-center">
                            <div className="text-sm text-gray-800">{stats.badgeCount}</div>
                            <div className="block sm:hidden text-xs text-gray-500">Badges</div> {/* Label for small screens */}
                          </div>
                          <div className="text-center">
                            <div className="text-blue-400 text-sm">{stats.totalPoints || 0}</div>
                            <div className="block sm:hidden text-xs text-gray-500">Points</div> {/* Label for small screens */}
                          </div>
                        </div>
                        
                        <div className="ml-2 sm:ml-4 flex-shrink-0"> {/* Adjusted margin and made non-shrinking */}
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
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 bg-gray-50"> {/* Adjusted padding */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 gap-4 sm:gap-6"> {/* Changed default to 1 col, then up */}
                        {filteredBadges.map((badge, index) => (
                            <div
                            key={`${categoryKey}-${index}`}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group flex flex-col"
                            >
                            {/* Badge Image */}
                            <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3 sm:p-4"> {/* Adjusted height and padding */}
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
                            <div className="p-4 sm:p-6 flex flex-col flex-1"> {/* Adjusted padding */}
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight"> {/* Adjusted font size and margin */}
                                {badge.badgeName}
                                </h3>

                                {/* Badge Info */}
                                <div className="space-y-2 sm:space-y-3 flex-1"> {/* Adjusted spacing */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Flame size={14} className="text-orange-500 mr-1" /> {/* Adjusted icon size */}
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
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 bg-gray-50"> {/* Adjusted padding */}
                      <div className="text-center py-6 sm:py-8"> {/* Adjusted padding */}
                        <div className="text-gray-400 text-xl sm:text-2xl mb-2">🏆</div> {/* Adjusted font size */}
                        <p className="text-gray-500 text-xs sm:text-sm">No badges Completions in this category yet</p> {/* Adjusted font size */}
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
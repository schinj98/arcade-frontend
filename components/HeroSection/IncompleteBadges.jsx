'use client';

import React, { useContext, useState } from 'react';
import { Flame, Search, Filter, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';

const typeColors = {
  Trivia: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Game: 'bg-blue-50 text-blue-700 border-blue-200',
  Skill: 'bg-amber-50 text-amber-700 border-amber-200',
  'Free Lab': 'bg-purple-50 text-purple-700 border-purple-200'
};

const typeIcons = {
  Trivia: '🧠',
  Game: '🎮',
  Skill: '⚡',
  'Free Lab': '🔬'
};

function getTypeFromCategory(category) {
  switch (category) {
    case 'skillBadges':
      return 'Skill';
    case 'gameBadges':
      return 'Game';
    case 'triviaBadges':
      return 'Trivia';
    default:
      return 'Other';
  }
}

const filters = ['All', 'Trivia', 'Game', 'Skill'];

export default function IncompleteBadges() {
  const [visibleCount, setVisibleCount] = useState(12);
  const itemsPerLoad = 12;
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const {profileData} = useContext(ProfileContext)
  const badges = profileData?.incompleteBadges

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allBadges = [];

  if (badges) {
    const order = ['Game', 'Trivia', 'Skill'];

order.forEach((type) => {
  const categoryKey = {
    'Game': 'gameBadges',
    'Trivia': 'triviaBadges',
    'Skill': 'skillBadges',
  }[type];

  const badgeItems = badges?.[categoryKey] || {};
  
  Object.values(badgeItems).forEach((badge) => {
    allBadges.push({
      ...badge,
      id: badge.accessToken || badge.badgeName || badge.badgeLink,
      title: badge.badgeName,
      type,
      points: type === 'Skill' ? 0.5 : (badge.points || 0),
    });
  });
});

  }

  const filteredBadges = allBadges.filter((badge) => {
    const matchesFilter = activeFilter === 'All' || badge.type === activeFilter;
    const matchesSearch =
      badge.title.toLowerCase().includes(search.toLowerCase()) ||
      badge.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="rounded-xl bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Incomplete Badges</h1>
              <p className="text-gray-600">
                Complete challenges to earn badges and boost your skills
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{filteredBadges.length}</span>
                  <span className="ml-1">badges available</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Flame size={16} className="text-orange-500 mr-1" />
                  <span className="font-medium text-gray-900">
                    {filteredBadges.reduce((sum, badge) => sum + badge.points, 0)}
                  </span>
                  <span className="ml-1">total points</span>
                </div>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 lg:min-w-[400px]">
              <div className="relative flex-1">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search badges..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 cursor-pointer rounded-xl font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {filter !== 'All' && (
                <span className="mr-2">{typeIcons[filter]}</span>
              )}
              {filter}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBadges.slice(0, visibleCount).map((badge) => (
            <div
              key={badge.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group flex flex-col"
            >
              {/* Badge Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <img
                  src={badge.image}
                  alt={badge.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/160x160?text=Badge';
                  }}
                />
                <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-lg border ${
                  typeColors[badge.type] || 'bg-gray-50 text-gray-700 border-gray-200'
                }`}>
                  <span className="mr-1">{typeIcons[badge.type]}</span>
                  {badge.type}
                </div>
              </div>

              {/* Badge Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {badge.title}
                </h3>

                {/* Badge Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Flame size={16} className="text-orange-500 mr-1" />
                      <span className="font-medium">{badge.points} Points</span>
                    </div>
                  </div>

                  {badge.type !== 'Skill' && (
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs bg-gray-100 px-3 py-2 rounded-lg font-mono text-gray-700 truncate">
                        {badge.id}
                      </code>
                      <button
                        onClick={() => copyToClipboard(badge.id)}
                        className="p-2 cursor-pointer text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copy ID"
                      >
                        {copiedId === badge.id ? (
                          <CheckCircle size={16} className="cursor-pointer text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => window.open(badge.badgeLink, '_blank')}
                  className="w-full mt-4 bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  Start Challenge
                  <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredBadges.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + itemsPerLoad)}
              className="px-8 py-4 cursor-pointer bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm"
            >
              Load More Badges ({filteredBadges.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredBadges.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No badges found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Toast Notification */}
        {copiedId && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4">
            <CheckCircle size={20}/>
            Badge ID copied!
          </div>
        )}
      </div>
    </div>
  );
}
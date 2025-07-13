import React, { useState } from 'react';
import { Trophy, Target, Crown, Star, Flame, TrendingUp, Award, ChevronRight } from 'lucide-react';

export default function BadgesSection({ completed_total_points }) {
  const [hoveredTier, setHoveredTier] = useState(null);
  const tiers = [
    { 
      name: 'Arcade Novice', 
      current: completed_total_points, 
      total: 20, 
      icon: Target, 
      color: 'from-green-400 to-emerald-500', 
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      description: 'Beginning journey'
    },
    { 
      name: 'Arcade Trooper', 
      current: completed_total_points, 
      total: 40, 
      icon: Star, 
      color: 'from-blue-400 to-indigo-500', 
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      description: 'Rising through ranks'
    },
    { 
      name: 'Arcade Ranger', 
      current: completed_total_points, 
      total: 65, 
      icon: Flame, 
      color: 'from-purple-400 to-pink-500', 
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      description: 'Mastering challenges'
    },
    { 
      name: 'Arcade Champion', 
      current: completed_total_points, 
      total: 75, 
      icon: Trophy, 
      color: 'from-orange-400 to-red-500', 
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      description: 'Among the elite'
    },
    { 
      name: 'Arcade Legend', 
      current: completed_total_points, 
      total: 85, 
      icon: Crown, 
      color: 'from-yellow-400 to-amber-500', 
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      description: 'Legendary status achieved'
    },
  ];

  const totalPoints = completed_total_points;
  const maxPoints = 85;
  const overallPercentage = maxPoints > 0 ? Math.min((totalPoints / maxPoints) * 100, 100) : 0;
  
  // Find the current active tier
  const currentTierIndex = tiers.findIndex(tier => tier.current < tier.total);

  return (
    <div className="min-h-screen bg-gray-50 rounded-xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-600 rounded-xl text-white">
                  <Award size={24} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Tier Progress</h1>
              </div>
              <p className="text-gray-600">
                Track your journey through arcade tiers and unlock achievements
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <TrendingUp size={16} className="text-blue-500 mr-1" />
                  <span className="font-medium text-gray-900">{totalPoints}</span>
                  <span className="ml-1">total points</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Trophy size={16} className="text-amber-500 mr-1" />
                  <span className="font-medium text-gray-900">
                    {currentTierIndex === -1 ? 'All Tiers Complete' : tiers[currentTierIndex]?.name || 'Starting Journey'}
                  </span>
                </div>
              </div>
            </div>

            {/* Overall Progress Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - overallPercentage / 100)}`}
                      className="text-blue-600 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">{overallPercentage.toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overall Progress</p>
                  <p className="font-semibold text-gray-900">{totalPoints} / {maxPoints} pts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const percentage = tier.total > 0 ? Math.min((tier.current / tier.total) * 100, 100) : 0;
            const isCurrentTier = index === currentTierIndex;
            const isCompleted = percentage === 100;
            
            return (
              <div
                key={tier.name}
                className={`bg-white border rounded-2xl shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group cursor-pointer ${
                  isCurrentTier ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'
                }`}
                onMouseEnter={() => setHoveredTier(tier.name)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {/* Status Badge */}
                {isCurrentTier && (
                  <div className="bg-blue-600 text-white text-xs font-medium text-center py-1">
                    Current Tier
                  </div>
                )}
                {isCompleted && !isCurrentTier && (
                  <div className="bg-green-600 text-white text-xs font-medium text-center py-1">
                    Completed
                  </div>
                )}

                {/* Tier Content */}
                <div className="p-6">
                  {/* Icon and Progress */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto relative">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-gray-200"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 36}`}
                          strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
                          className={`transition-all duration-500 ${
                            isCompleted ? 'text-green-500' : 'text-blue-500'
                          }`}
                          style={{
                            filter: `drop-shadow(0 0 6px ${isCompleted ? 'rgb(34 197 94 / 0.4)' : 'rgb(59 130 246 / 0.4)'})`
                          }}
                        />
                      </svg>
                      <div className={`absolute inset-0 flex items-center justify-center ${tier.iconBg} rounded-full m-2`}>
                        <Icon size={28} className={tier.iconColor} />
                      </div>
                    </div>
                  </div>

                  {/* Tier Info */}
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">
                    {tier.name.replace('Arcade ', '')}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    {tier.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-green-600 transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {tier.current}/{tier.total} pts
                      </span>
                      <span className={`text-sm font-bold ${
                        isCompleted ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Next Milestone</p>
              <Target size={20} className="text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {currentTierIndex >= 0 && currentTierIndex < tiers.length 
                ? `${tiers[currentTierIndex].total - tiers[currentTierIndex].current} pts`
                : 'Complete!'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {currentTierIndex >= 0 && currentTierIndex < tiers.length 
                ? `to ${tiers[currentTierIndex].name}`
                : 'All tiers achieved'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Completed Tiers</p>
                <Trophy size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {tiers.filter(tier => (tier.current / tier.total) >= 1).length} / {tiers.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">tiers completed</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Achievement Rate</p>
              <Star size={20} className="text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {((tiers.filter(tier => (tier.current / tier.total) >= 1).length / tiers.length) * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-gray-500 mt-1">of all tiers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
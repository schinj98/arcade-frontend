import React, { useContext, useState, useEffect } from 'react';
import { Trophy, Target, Crown, Star, Flame, TrendingUp, Award, ChevronRight, Zap, Gamepad2, Sparkles } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';

export default function BadgesSection() {
  const [hoveredTier, setHoveredTier] = useState(null);
  const [animationDelay, setAnimationDelay] = useState(0);
  const {profileData} = useContext(ProfileContext)
  const completed_total_points = 40
  
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimationDelay(1), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const tiers = [
    { 
      name: 'Arcade Novice', 
      current: completed_total_points, 
      total: 20, 
      icon: Target, 
    },
    { 
      name: 'Arcade Trooper', 
      current: completed_total_points, 
      total: 40, 
      icon: Star,
    },
    { 
      name: 'Arcade Ranger', 
      current: completed_total_points, 
      total: 65, 
      icon: Flame,
    },
    { 
      name: 'Arcade Champion', 
      current: completed_total_points, 
      total: 75, 
      icon: Trophy,
    },
    { 
      name: 'Arcade Legend', 
      current: completed_total_points, 
      total: 85, 
      icon: Crown,
    },
  ];

  const totalPoints = completed_total_points;
  const maxPoints = 85;
  const overallPercentage = maxPoints > 0 ? Math.min((totalPoints / maxPoints) * 100, 100) : 0;
  
  // Find the current active tier
  const currentTierIndex = tiers.findIndex(tier => tier.current < tier.total);
  const completedTiers = tiers.filter(tier => (tier.current / tier.total) >= 1).length;

  return (
    <div className="min-h-screen rounded-xl bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 mb-12 border border-blue-200 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
                    <Gamepad2 size={28} className="text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Tier Progress
                  </h1>
                  <p className="text-gray-600 mt-1">Track your journey through arcade tiers</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl border border-blue-200 shadow-sm">
                  <Zap size={16} className="text-blue-600" />
                  <span className="text-gray-900 font-semibold">{totalPoints}</span>
                  <span className="text-gray-600">points</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl border border-blue-200 shadow-sm">
                  <Sparkles size={16} className="text-blue-600" />
                  <span className="text-gray-900 font-semibold">{completedTiers}</span>
                  <span className="text-gray-600">tiers completed</span>
                </div>
              </div>
            </div>

            {/* Overall Progress Circle */}
            <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl border border-blue-200 shadow-lg">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="rgb(59 130 246 / 0.2)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="rgb(37 99 235)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - overallPercentage / 100)}`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-1xl font-bold text-gray-900">{overallPercentage.toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Overall Progress</p>
                  <p className="font-bold text-gray-900 text-lg">{totalPoints} / {maxPoints}</p>
                  <p className="text-gray-500 text-xs">points earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const percentage = tier.total > 0 ? Math.min((tier.current / tier.total) * 100, 100) : 0;
            const isCurrentTier = index === currentTierIndex;
            const isCompleted = percentage === 100;
            
            return (
              <div
                key={tier.name}
                className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  animationDelay ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredTier(tier.name)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {/* Main card with water effect */}
                <div className={`relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-lg group-hover:shadow-xl water-fill ${
                  isCurrentTier 
                    ? 'border-blue-600 shadow-blue-200' 
                    : isCompleted 
                      ? 'border-yellow-400 shadow-yellow-200 bg-yellow-50' 
                      : 'border-blue-200  group-hover:border-blue-300'
                }`}>

                  
                  {/* Status indicator */}
                  {isCurrentTier && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse"></div>
                  )}
                  {isCompleted && !isCurrentTier && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-500"></div>
                  )}

                  <div className="relative z-10 p-6">
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto relative">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-yellow-100 border-2 border-yellow-400' 
                          : 'bg-gray-100 border-2 border-gray-300'
                        } group-hover:scale-110`}>
                          <Icon size={28} className={`transition-colors duration-300 ${
                            isCompleted 
                              ? 'text-yellow-600' 
                              : 'text-gray-400'
                          }`} />
                        </div>
                      </div>
                    </div>

                    {/* Tier name */}
                    <h3
                      className={`text-lg font-bold text-center mb-2 transition-colors ${
                        isCompleted
                          ? hoveredTier === tier.name
                            ? 'text-yellow-600'
                            : 'text-gray-900'
                          : hoveredTier === tier.name
                            ? 'text-blue-300'
                            : 'text-gray-900'
                      }`}
                    >
                      {tier.name.replace('Arcade ', '')}
                    </h3>


                    {/* Progress info */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">
                          {tier.current}/{tier.total} pts
                        </span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full transition-colors ${
                          isCompleted 
                            ? 'text-yellow-700 bg-yellow-100 border border-yellow-300' 
                            : 'text-blue-700 bg-blue-100 border border-blue-300'
                        }`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Next Milestone',
              value: currentTierIndex >= 0 && currentTierIndex < tiers.length 
                ? `${tiers[currentTierIndex].total - tiers[currentTierIndex].current} pts`
                : 'Complete!',
              subtitle: currentTierIndex >= 0 && currentTierIndex < tiers.length 
                ? `to ${tiers[currentTierIndex].name}`
                : 'All tiers achieved',
              icon: Target,
              bgColor: 'bg-blue-50',
              borderColor: 'border-blue-200',
              iconColor: 'bg-blue-600'
            },
            {
              title: 'Tiers Unlocked',
              value: `${completedTiers} / ${tiers.length}`,
              subtitle: 'tiers completed',
              icon: Trophy,
              bgColor: 'bg-yellow-50',
              borderColor: 'border-yellow-200',
              iconColor: 'bg-yellow-500'
            },
            {
              title: 'Achievement Rate',
              value: `${((completedTiers / tiers.length) * 100).toFixed(0)}%`,
              subtitle: 'completion rate',
              icon: Star,
              bgColor: 'bg-blue-50',
              borderColor: 'border-blue-200',
              iconColor: 'bg-blue-600'
            }
          ].map((stat, index) => (
            <div key={stat.title} className="group relative">
              <div className={`${stat.bgColor} rounded-2xl border-2 ${stat.borderColor} p-6 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <div className={`p-3 ${stat.iconColor} rounded-xl shadow-sm`}>
                    <stat.icon size={20} className="text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1 transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
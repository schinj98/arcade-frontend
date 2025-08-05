import React, { useContext, useState, useEffect } from 'react';
import { Trophy, Target, Crown, Star, Flame, Zap, Gamepad2, Sparkles, ChevronRight } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';
export default function BadgesSection() {
  const [hoveredTier, setHoveredTier] = useState(null);
  const [animationDelay, setAnimationDelay] = useState(false);
  const {profileData} = useContext(ProfileContext)
  
  // Mock data - replace with actual context
  const completed_total_points = profileData?.completed_totalPoints || 0;

  useEffect(() => {
    const timer = setTimeout(() => setAnimationDelay(true), 100);
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
  
  const currentTierIndex = tiers.findIndex(tier => tier.current < tier.total);
  const completedTiers = tiers.filter(tier => (tier.current / tier.total) >= 1).length;

  return (
    <div className="bg-slate-50 p-4 rounded-2xl">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Compact Header with Inline Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Left Side - Title and Progress */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Gamepad2 size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Arcade Progress</h1>
                  <p className="text-slate-600 text-sm">Level up your arcade journey</p>
                </div>
              </div>
              
              {/* Inline Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-indigo-600" />
                  <span className="text-slate-900 font-semibold text-lg">{totalPoints}</span>
                  <span className="text-slate-600 text-sm">pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" />
                  <span className="text-slate-900 font-semibold text-lg">{completedTiers}</span>
                  <span className="text-slate-600 text-sm">unlocked</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Target size={16} className="text-emerald-600" />
                  <span className="text-slate-900 font-semibold text-lg">{overallPercentage.toFixed(0)}%</span>
                  <span className="text-slate-600 text-sm">complete</span>
                </div>
              </div>
            </div>

            {/* Right Side - Compact Progress */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-slate-600 text-xs uppercase tracking-wide font-medium">Overall Progress</p>
                <p className="font-bold text-slate-900 text-lg">{totalPoints} / {maxPoints}</p>
              </div>
              <div className="relative">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgb(226 232 240)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgb(79 70 229)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - overallPercentage / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-900">{overallPercentage.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Tier Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Achievement Tiers</h2>
            {currentTierIndex >= 0 && currentTierIndex < tiers.length && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Next:</span>
                <span className="font-medium text-indigo-600">
                  {tiers[currentTierIndex].total - tiers[currentTierIndex].current} pts to {tiers[currentTierIndex].name.replace('Arcade ', '')}
                </span>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            )}
          </div>
          
          {/* Tier Cards - Horizontal Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              const percentage = tier.total > 0 ? Math.min((tier.current / tier.total) * 100, 100) : 0;
              const isCurrentTier = index === currentTierIndex;
              const isCompleted = percentage === 100;
              
              return (
                <div
                  key={tier.name}
                  className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 cursor-pointer hover:scale-105 ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300' 
                      : isCurrentTier 
                        ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300' 
                        : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
                  }`}
                  onMouseEnter={() => setHoveredTier(tier.name)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
                  {/* Active indicator */}
                  {isCurrentTier && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600"></div>
                  )}
                  {isCompleted && !isCurrentTier && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
                  )}

                  {/* Icon */}
                  <div className="mb-3">
                    <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center transition-colors ${
                      isCompleted 
                        ? 'bg-amber-500' 
                        : isCurrentTier
                          ? 'bg-indigo-600'
                          : 'bg-slate-300 group-hover:bg-slate-400'
                    }`}>
                      <Icon size={20} className={`${
                        isCompleted || isCurrentTier
                          ? 'text-white' 
                          : 'text-slate-600'
                      }`} />
                    </div>
                  </div>

                  {/* Tier name */}
                  <h3 className="text-sm font-semibold text-center mb-2 text-slate-900">
                    {tier.name.replace('Arcade ', '')}
                  </h3>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600">
                        {tier.current}/{tier.total}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isCompleted 
                          ? 'text-amber-700 bg-amber-200' 
                          : isCurrentTier
                            ? 'text-indigo-700 bg-indigo-200'
                            : 'text-slate-700 bg-slate-200'
                      }`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-1000 ${
                          isCompleted 
                            ? 'bg-amber-500' 
                            : isCurrentTier
                              ? 'bg-indigo-600'
                              : 'bg-slate-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  {hoveredTier === tier.name && (
                    <div className="absolute  bg-white bg-opacity-10 pointer-events-none"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Achievement Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              title: 'Achievement Rate',
              value: `${((completedTiers / tiers.length) * 100).toFixed(0)}%`,
              icon: Star,
              color: 'emerald'
            },
            {
              title: 'Next Milestone',
              value: currentTierIndex >= 0 && currentTierIndex < tiers.length 
                ? `${tiers[currentTierIndex].total - tiers[currentTierIndex].current} pts`
                : 'Complete!',
              icon: Target,
              color: 'indigo'
            },
            {
              title: 'Tiers Unlocked',
              value: `${completedTiers}/${tiers.length}`,
              icon: Trophy,
              color: 'amber'
            }
          ].map((stat, index) => (
            <div key={stat.title} className="group">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-md ${
                    stat.color === 'emerald' ? 'bg-emerald-100' :
                    stat.color === 'indigo' ? 'bg-indigo-100' : 'bg-amber-100'
                  }`}>
                    <stat.icon size={16} className={`${
                      stat.color === 'emerald' ? 'text-emerald-600' :
                      stat.color === 'indigo' ? 'text-indigo-600' : 'text-amber-600'
                    }`} />
                  </div>
                </div>
                <p className="text-xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-slate-600 text-xs">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
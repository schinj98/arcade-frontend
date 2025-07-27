import React, { useContext, useState, useEffect } from 'react';
import { Trophy, Target, Crown, Star, Flame, Zap, Gamepad2, Sparkles } from 'lucide-react';
import { ProfileContext } from '../../context/ProfileContext';


export default function BadgesSection() {
  const [hoveredTier, setHoveredTier] = useState(null);
  const [animationDelay, setAnimationDelay] = useState(false);
  const {profileData} = useContext(ProfileContext)
  
  // Mock data - replace with actual context
  const completed_total_points = 55;
  
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
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Simple Header */}
        <div className="bg-blue-100 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Gamepad2 size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Tier Progress</h1>
                  <p className="text-gray-600">Track your arcade journey</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-blue-200">
                  <Zap size={16} className="text-blue-600" />
                  <span className="text-gray-900 font-semibold">{totalPoints}</span>
                  <span className="text-gray-600">points</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-blue-200">
                  <Sparkles size={16} className="text-blue-600" />
                  <span className="text-gray-900 font-semibold">{completedTiers}</span>
                  <span className="text-gray-600">tiers completed</span>
                </div>
              </div>
            </div>

            {/* Simple Progress Circle */}
            <div className="bg-white p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="rgb(148 163 184)"
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
                    <span className="text-xl font-bold text-gray-900">{overallPercentage.toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Overall Progress</p>
                  <p className="font-bold text-gray-900 text-lg">{totalPoints} / {maxPoints}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const percentage = tier.total > 0 ? Math.min((tier.current / tier.total) * 100, 100) : 0;
            const isCurrentTier = index === currentTierIndex;
            const isCompleted = percentage === 100;
            
            return (
              <div
                key={tier.name}
                className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                  isCompleted 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : isCurrentTier 
                      ? 'border-blue-600' 
                      : 'border-blue-200 hover:border-blue-300'
                }`}
                onMouseEnter={() => setHoveredTier(tier.name)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {/* Simple status bar */}
                {isCurrentTier && (
                  <div className="h-1 bg-blue-600 rounded-full mb-4 -mt-2 mx-2"></div>
                )}
                {isCompleted && !isCurrentTier && (
                  <div className="h-1 bg-yellow-400 rounded-full mb-4 -mt-2 mx-2"></div>
                )}

                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-yellow-400' 
                      : isCurrentTier
                        ? 'bg-blue-100'
                        : 'bg-slate-100'
                  }`}>
                    <Icon size={28} className={`${
                      isCompleted 
                        ? 'text-white' 
                        : isCurrentTier
                          ? 'text-blue-600'
                          : 'text-gray-400'
                    }`} />
                  </div>
                </div>

                {/* Tier name */}
                <h3 className="text-lg font-bold text-center mb-3 text-gray-900">
                  {tier.name.replace('Arcade ', '')}
                </h3>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">
                      {tier.current}/{tier.total} pts
                    </span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      isCompleted 
                        ? 'text-yellow-700 bg-yellow-100' 
                        : isCurrentTier
                          ? 'text-blue-700 bg-blue-100'
                          : 'text-gray-700 bg-slate-100'
                    }`}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        isCompleted 
                          ? 'bg-yellow-400' 
                          : isCurrentTier
                            ? 'bg-blue-600'
                            : 'bg-slate-300'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple Stats Cards */}
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
              bgColor: 'bg-blue-100'
            },
            {
              title: 'Tiers Unlocked',
              value: `${completedTiers} / ${tiers.length}`,
              subtitle: 'tiers completed',
              icon: Trophy,
              bgColor: 'bg-yellow-100'
            },
            {
              title: 'Achievement Rate',
              value: `${((completedTiers / tiers.length) * 100).toFixed(0)}%`,
              subtitle: 'completion rate',
              icon: Star,
              bgColor: 'bg-blue-100'
            }
          ].map((stat, index) => (
            <div key={stat.title} className="group">
              <div className={`${stat.bgColor} rounded-2xl p-6 transition-all duration-300 group-hover:scale-105`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <div className={`p-2 rounded-xl ${
                    stat.bgColor === 'bg-yellow-100' ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}>
                    <stat.icon size={20} className="text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
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
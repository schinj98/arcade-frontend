import React, { useContext, useState, useEffect } from 'react';
import { 
  BadgeCheck, Calendar, User, Trophy, Crown, Flame, Sun, Moon, 
  TrendingUp, Zap, Star, Gift, Sparkles, Award, Target, 
  ChevronRight, Activity, Users, Shield
} from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';


export default function TotalProgress() {
  const { profileData } = useContext(ProfileContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [animateNumbers, setAnimateNumbers] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  const user = profileData?.userDetails;
  const totalPoints = profileData?.completed_totalPoints;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateNumbers(true);
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 2000);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const themeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-white',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    border: isDarkMode ? 'border-gray-700' : 'border-blue-200',
    borderLight: isDarkMode ? 'border-gray-600' : 'border-gray-100',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    accent: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
  };

  if (!user) {
    return (
      <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 sm:p-8 text-center shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20" />
        <div className="relative animate-pulse">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full mx-auto mb-4"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-24 mx-auto"></div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Facilitator Points',
      value: profileData?.facilitatorPoints ?? 0,
      icon: Trophy,
      color: 'blue',
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      darkBgGradient: 'from-blue-900/20 to-blue-800/10',
      description: 'Arcade Facilitator Points',
      trend: '+12%'
    },
    {
      label: 'Arcade Points',
      value: profileData?.completed_totalPoints ?? 0,
      icon: Crown,
      color: 'purple',
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      darkBgGradient: 'from-purple-900/20 to-purple-800/10',
      description: 'Total Arcade Points',
      trend: '+8%'
    },
    {
      label: 'Swags Eligibility',
      value: profileData?.completed_totalBadges ?? 0,
      icon: Flame,
      color: 'green',
      gradient: 'from-green-400 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      darkBgGradient: 'from-green-900/20 to-green-800/10',
      description: 'Total Cumulative Badges',
      trend: '+15%'
    }
  ];

  const AnimatedNumber = ({ value, duration = 1000 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!animateNumbers) return;
      
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        if (progress < 1) {
          setDisplayValue(Math.floor(value * progress));
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      requestAnimationFrame(animate);
    }, [value, duration, animateNumbers]);

    return <span>{displayValue.toLocaleString()}</span>;
  };

  return (
    <div className={`${themeClasses.cardBg} rounded-2xl shadow-lg border ${themeClasses.border} p-6 w-full max-w-sm mx-auto relative overflow-hidden transition-all duration-500`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-white dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-md">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${themeClasses.text} flex items-center gap-2`}>
                Profile Stats
                {pulseEffect && <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />}
              </h2>
              <p className={`text-xs ${themeClasses.textMuted} flex items-center gap-1`}>
                <TrendingUp className="w-3 h-3" />
                Live performance metrics
              </p>
            </div>
          </div>
          
        </div>

        {/* Enhanced Stat Items */}
        <div className="space-y-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;
            
            return (
              <div
                key={stat.label}
                className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg border-2 ${
                  isHovered 
                    ? `border-${stat.color}-300 dark:border-${stat.color}-600 shadow-lg shadow-${stat.color}-500/20` 
                    : 'border-transparent'
                }`}
                style={{
                  background: isDarkMode 
                    ? `linear-gradient(135deg, ${stat.darkBgGradient.split(' ')[1].replace('to-', '')}, ${stat.darkBgGradient.split(' ')[2]})` 
                    : `linear-gradient(135deg, ${stat.bgGradient.split(' ')[1].replace('to-', '')}, ${stat.bgGradient.split(' ')[2]})`
                }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                {/* Animated Background Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="text-white w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`${themeClasses.textSecondary} font-semibold text-sm`}>
                          {stat.label}
                        </span>
                        {isHovered && (
                          <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${stat.color}-100 text-${stat.color}-700 dark:bg-${stat.color}-900/30 dark:text-${stat.color}-300 animate-fadeIn`}>
                            {stat.trend}
                          </div>
                        )}
                      </div>
                      <p className={`text-xs ${themeClasses.textMuted} flex items-center gap-1`}>
                        <Target className="w-3 h-3" />
                        {stat.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold text-2xl ${themeClasses.text} ${pulseEffect ? 'animate-pulse' : ''} flex items-center gap-2`}>
                      <AnimatedNumber value={stat.value} />
                      {isHovered && <ChevronRight className="w-4 h-4 animate-pulse" />}
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="mt-2 flex justify-end">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-2 rounded-full transition-all duration-300 ${
                              i < Math.min(Math.floor(stat.value / (100 / 5)), 5)
                                ? `bg-${stat.color}-500`
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Particles */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-${stat.color}-400 rounded-full animate-ping`}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
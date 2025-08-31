import React, { useContext, useState, useEffect } from 'react';
import { 
  BadgeCheck, Calendar, User, Trophy, Crown, Flame, Sun, Moon, 
  TrendingUp, Zap, Star, Gift, Sparkles, Award, Target, 
  ChevronRight, Activity, Users, Shield
} from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';
import { ThemeContext } from '@/context/ThemeContext'; 

export default function TotalProgress() {
  const { profileData } = useContext(ProfileContext);
  const { isDarkMode } = useContext(ThemeContext);

  const [hoveredStat, setHoveredStat] = useState(null);
  const [animateNumbers, setAnimateNumbers] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  const user = profileData?.userDetails;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateNumbers(true);
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 2000);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // themeClasses exactly as you provided (applies only for dark mode; light stays same)
  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-white',
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    text: isDarkMode ? 'text-slate-100' : 'text-slate-800',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    border: isDarkMode ? 'border-slate-700/50' : 'border-blue-200',
    borderLight: isDarkMode ? 'border-slate-600/30' : 'border-slate-100/30',
    hover: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50',
    accent: isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50',
  };

  // map color keys to explicit Tailwind classes (so runtime template strings are avoided)
  const colorMap = {
    blue: {
      borderHover: 'border-blue-300',
      shadow: 'shadow-blue-500/20',
      pillLight: 'bg-blue-100 text-blue-700',
      pillDark: 'bg-blue-900/30 text-blue-300',
      iconBg: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      darkBgGradient: 'from-blue-900/20 to-blue-800/10',
    },
    purple: {
      borderHover: 'border-purple-300',
      shadow: 'shadow-purple-500/20',
      pillLight: 'bg-purple-100 text-purple-700',
      pillDark: 'bg-purple-900/30 text-purple-300',
      iconBg: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      darkBgGradient: 'from-purple-900/20 to-purple-800/10',
    },
    green: {
      borderHover: 'border-green-300',
      shadow: 'shadow-green-500/20',
      pillLight: 'bg-green-100 text-green-700',
      pillDark: 'bg-green-900/30 text-green-300',
      iconBg: 'from-green-400 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      darkBgGradient: 'from-green-900/20 to-green-800/10',
    }
  };

  if (!user) {
    return (
      <div className={`${themeClasses.cardBg} rounded-2xl shadow-lg border ${themeClasses.border} p-6 w-full max-w-sm mx-auto relative overflow-hidden`}>
        {/* Background Effects */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-slate-900/40 to-slate-800/20' : 'bg-white/0'}`} />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 12}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 animate-pulse">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              <div>
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-28 mb-2"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
              </div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl p-4 border-2 border-transparent">
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 mb-2"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-16 mb-2"></div>
                    {/* Progress Indicator Skeleton */}
                    <div className="flex justify-end">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-gradient-to-r from-gray-200 to-gray-300 w-1 h-2 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Facilitator Points',
      value: profileData?.facilitator_section?.facilitatorPoints ?? 0,
      icon: Trophy,
      colorKey: 'blue',
      description: 'Arcade Facilitator Points',
      trend: '+12%'
    },
    {
      label: 'Arcade Points',
      value: profileData?.completed_totalPoints ?? 0,
      icon: Crown,
      colorKey: 'purple',
      description: 'Total Arcade Points',
      trend: '+8%'
    },
    {
      label: 'Total Badges',
      value: profileData?.completed_totalBadges ?? 0,
      icon: Flame,
      colorKey: 'green',
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

const getFilledPillCount = (stat) => {
  const value = Number(stat.value) || 0;

  if (stat.colorKey === 'green') {
    const badgeThresholds = [40, 80, 120, 160, 200];
    return badgeThresholds.filter(t => value >= t).length;
  }

  const normalThresholds = [20, 40, 65, 75, 85];
  return normalThresholds.filter(t => value >= t).length;
};


  return (
    <div className={`${themeClasses.cardBg} rounded-2xl shadow-lg border ${themeClasses.border} p-6 w-full max-w-sm mx-auto relative overflow-hidden transition-all duration-500 ${themeClasses.bg}`}>
      {/* Background Effects */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-slate-900/40 to-slate-800/20' : 'bg-white/0'}`} />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 12}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
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

        <div className="space-y-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;
            const cmap = colorMap[stat.colorKey];

            return (
              <div
                key={stat.label}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg border-2 ${isHovered ? `${cmap?.borderHover || 'border-transparent'} ${cmap?.shadow ? '' : ''}` : 'border-transparent'}`}
              >
                {/* background / overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isDarkMode ? (cmap?.darkBgGradient ? `bg-gradient-to-r ${cmap.darkBgGradient}` : '') : (cmap?.bgGradient ? `bg-gradient-to-r ${cmap.bgGradient}` : '')}`} />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${cmap?.iconBg || 'from-gray-200 to-gray-300'} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="text-white w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`${themeClasses.textSecondary} font-semibold text-sm`}>{stat.label}</span>

                        {isHovered && (
                          <div className={`${isDarkMode ? (cmap?.pillDark || 'bg-slate-800 text-slate-200') : (cmap?.pillLight || 'bg-gray-100 text-gray-700')} px-2 py-1 rounded-full text-xs font-medium animate-fadeIn`}>
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
                      {[...Array(5)].map((_, i) => {
                        const filled = i < Math.min(Math.floor(stat.value / (100 / 5)), 5);
                        return (
                          <div
                            key={i}
                            className={`${filled ? (stat.colorKey === 'blue' ? 'bg-blue-500' : stat.colorKey === 'purple' ? 'bg-purple-500' : 'bg-green-500') : (isDarkMode ? 'bg-slate-600' : 'bg-gray-200')} w-1 h-2 rounded-full transition-all duration-300`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        );
                      })}

                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Particles */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`${stat.colorKey === 'blue' ? 'bg-blue-400' : stat.colorKey === 'purple' ? 'bg-purple-400' : 'bg-green-400'} absolute w-1 h-1 rounded-full animate-ping`}
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

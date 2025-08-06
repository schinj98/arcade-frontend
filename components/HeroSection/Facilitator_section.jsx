'use client';
import React, { useContext, useState, useEffect } from 'react';
import { Sun, Moon, Trophy, Target, Zap, Star, Crown, ChevronRight, Info, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';
import { ThemeContext } from '@/context/ThemeContext';

export default function Facilitator_section() {
  // Mock ProfileContext for demo
  const {profileData} = useContext(ProfileContext)


  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const [hoveredGoal, setHoveredGoal] = useState(null);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const [pulseCompleted, setPulseCompleted] = useState(false);
  
  const finding_total_completions = profileData?.badgesOverview || {
    skillBadges: { count: 0 },
    levelBadges: { count: 0 },
    triviaBadges: { count: 0 },
    labsFreeBadges: { count: 0 }
  };

  const skill_count = finding_total_completions.skillBadges.count || 0;
  const game_count = finding_total_completions.levelBadges.count || 0;
  const trivia_count = finding_total_completions.triviaBadges.count || 0;
  const labsFree_count = finding_total_completions.labsFreeBadges.count || 0;

  const milestones = [
    {
      name: 'Milestone 1',
      points: 2,
      level: 'Beginner',
      icon: Target,
      emoji: '🎯',
      color: 'from-emerald-400 via-cyan-500 to-blue-500',
      goals: [
        { label: 'Games', value: game_count, total: 6, icon: '🎮', color: 'blue' },
        { label: 'Trivia', value: trivia_count, total: 5, icon: '🧠', color: 'purple' },
        { label: 'Skills', value: skill_count, total: 14, icon: '⚡', color: 'yellow' },
        { label: 'Labs', value: labsFree_count, total: 6, icon: '🧪', color: 'green' },
      ],
    },
    {
      name: 'Milestone 2',
      points: 8,
      level: 'Intermediate',
      icon: Zap,
      emoji: '🚀',
      color: 'from-blue-400 via-purple-500 to-pink-500',
      goals: [
        { label: 'Games', value: game_count, total: 8, icon: '🎮', color: 'blue' },
        { label: 'Trivia', value: trivia_count, total: 6, icon: '🧠', color: 'purple' },
        { label: 'Skills', value: skill_count, total: 28, icon: '⚡', color: 'yellow' },
        { label: 'Labs', value: labsFree_count, total: 12, icon: '🧪', color: 'green' },
      ],
    },
    {
      name: 'Milestone 3',
      points: 15,
      level: 'Advanced',
      icon: Star,
      emoji: '⭐',
      color: 'from-purple-400 via-pink-500 to-red-500',
      goals: [
        { label: 'Games', value: game_count, total: 10, icon: '🎮', color: 'blue' },
        { label: 'Trivia', value: trivia_count, total: 7, icon: '🧠', color: 'purple' },
        { label: 'Skills', value: skill_count, total: 38, icon: '⚡', color: 'yellow' },
        { label: 'Labs', value: labsFree_count, total: 18, icon: '🧪', color: 'green' },
      ],
    },
    {
      name: 'Ultimate',
      points: 25,
      level: 'Expert',
      icon: Crown,
      emoji: '👑',
      color: 'from-yellow-400 via-orange-500 to-red-600',
      goals: [
        { label: 'Games', value: game_count, total: 12, icon: '🎮', color: 'blue' },
        { label: 'Trivia', value: trivia_count, total: 8, icon: '🧠', color: 'purple' },
        { label: 'Skills', value: skill_count, total: 52, icon: '⚡', color: 'yellow' },
        { label: 'Labs', value: labsFree_count, total: 24, icon: '🧪', color: 'green' },
      ],
    },
  ];

  const calculateOverallProgress = (milestone) => {
    if (!milestone || !milestone.goals) return 0;
    const totalProgress = milestone.goals.reduce((sum, goal) => {
      const progress = goal.total === 0 ? 0 : Math.min((goal.value / goal.total) * 100, 100);
      return sum + progress;
    }, 0);
    return Math.round(totalProgress / milestone.goals.length);
  };

  const isCompleted = (goal) => goal && goal.value >= goal.total;
  
  const getMilestoneStatus = (milestone) => {
    if (!milestone || !milestone.goals) return 'not-started';
    const completedGoals = milestone.goals.filter(isCompleted).length;
    const totalGoals = milestone.goals.length;
    
    if (completedGoals === totalGoals) return 'completed';
    if (completedGoals > 0) return 'in-progress';
    return 'not-started';
  };

  const totalEarnedPoints = milestones.reduce((sum, milestone) => {
    const status = getMilestoneStatus(milestone);
    return sum + (status === 'completed' ? milestone.points : 0);
  }, 0);

  const totalPossiblePoints = milestones.reduce((sum, milestone) => sum + milestone.points, 0);

  useEffect(() => {
    setAnimateProgress(false);
    const timer = setTimeout(() => {
      setAnimateProgress(true);
      setPulseCompleted(true);
      setTimeout(() => setPulseCompleted(false), 1000);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedMilestone]);

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      blue: type === 'bg' ? 'bg-blue-500' : type === 'text' ? 'text-blue-600' : 'border-blue-200',
      purple: type === 'bg' ? 'bg-purple-500' : type === 'text' ? 'text-purple-600' : 'border-purple-200',
      yellow: type === 'bg' ? 'bg-yellow-500' : type === 'text' ? 'text-yellow-600' : 'border-yellow-200',
      green: type === 'bg' ? 'bg-green-500' : type === 'text' ? 'text-green-800' : 'border-green-200',
    };
    return colors[color] || colors.blue;
  };

  const currentMilestone = milestones[selectedMilestone];
  const currentProgress = calculateOverallProgress(currentMilestone);
  const completedGoals = currentMilestone.goals.filter(isCompleted).length;
  const MilestoneIcon = currentMilestone.icon;

  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-slate-50',
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white/95',
    text: isDarkMode ? 'text-slate-100' : 'text-slate-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-slate-600',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    border: isDarkMode ? 'border-slate-700/50' : 'border-slate-200/50',
    borderLight: isDarkMode ? 'border-slate-600/30' : 'border-slate-100/30',
    hover: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50/50',
    accent: isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50',
    accentHover: isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-blue-50/50',
  };

  return (
    <div className={`max-w-5xl mx-auto p-3 sm:p-4 lg:p-6 ${themeClasses.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl border ${themeClasses.border} transition-all duration-300 relative `}>
      {/* Futuristic Background Effects */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentMilestone.color} opacity-5`} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${currentMilestone.color} rounded-full animate-pulse opacity-60`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className={`relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b ${themeClasses.borderLight}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
          <div className="relative group">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${currentMilestone.color} rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              FP
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.text} flex items-center gap-2`}>
              Facilitator Program
            </h2>
            <p className={`text-xs sm:text-sm ${themeClasses.textMuted} flex items-center gap-2`}>
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              Aug 4 - Oct 6, 2025 • Active Program
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-1">
            
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`px-3 py-2 text-xs sm:text-sm font-medium text-blue-600 ${themeClasses.accentHover} rounded-lg transition-all duration-200 flex items-center gap-2 group`}
            >
              <Info className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span className="hidden sm:inline">{showDetails ? 'Hide' : 'Show'}</span>
              <span className="sm:hidden">{showDetails ? 'Hide' : 'Details'}</span>
              <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${showDetails ? 'rotate-90' : ''}`} />
            </button>
          </div>
          
          <div className="text-left sm:text-right order-1 sm:order-2">
            <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${currentMilestone.color} bg-clip-text text-transparent ${pulseCompleted ? 'animate-pulse' : ''}`}>
              {currentProgress}%
            </div>
            <div className={`text-xs ${themeClasses.textMuted}`}>Current Progress</div>
          </div>
        </div>
      </div>

      {/* Milestone Tabs */}
      <div className="relative z-10 mb-4 sm:mb-6">
        <div className={`flex flex-col sm:flex-row gap-1 mb-3 sm:mb-4 ${themeClasses.accent} p-1 rounded-xl relative overflow-hidden shadow-inner backdrop-blur-sm`}>
          {/* Animated Background Slider */}
          <div 
            className={`absolute top-1 bottom-1  bg-gradient-to-r ${currentMilestone.color} opacity-20 rounded-lg shadow-lg transition-all duration-500 ease-out border ${themeClasses.border} sm:block hidden`}
            style={{
              left: `${selectedMilestone * 25 + 0.25}%`,
              width: 'calc(25% - 0.5%)'
            }}
          />
          
          {milestones.map((milestone, index) => {
            const status = getMilestoneStatus(milestone);
            const progress = calculateOverallProgress(milestone);
            const isActive = selectedMilestone === index;
            const IconComponent = milestone.icon;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedMilestone(index)}
                className={`relative cursor-pointer flex-1 px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 z-10 group ${
                  isActive
                    ? `${themeClasses.text} shadow-sm bg-gradient-to-r ${milestone.color} bg-opacity-10 sm:bg-transparent`
                    : `${themeClasses.textSecondary} hover:${themeClasses.text}`
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <div className={`p-1 rounded transition-all duration-300 group-hover:scale-110 ${isActive ? 'bg-gradient-to-r ' + milestone.color + ' sm:bg-gradient-to-r' : ''}`}>
                    <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${isActive ? 'text-white sm:text-current' : ''} transition-colors duration-300`} />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="leading-none font-semibold text-center">{milestone.name}</span>
                    <div className="flex items-center gap-1 sm:gap-2 mt-1">
                      <div className={`flex items-center gap-1 ${isActive ? 'animate-pulse' : ''}`}>
                        <Trophy className="w-2 h-2 sm:w-3 sm:h-3" />
                        <span className="text-xs font-bold">{milestone.points}p</span>
                      </div>
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        status === 'completed' ? 'bg-green-500 animate-pulse shadow-green-500/50 shadow-md' :
                        status === 'in-progress' ? 'bg-yellow-500 shadow-yellow-500/50 shadow-md' : 'bg-gray-300'
                      }`} />
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-1 sm:left-2 right-1 sm:right-2 h-0.5 sm:h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ease-out bg-gradient-to-r ${
                      status === 'completed' ? 'from-green-400 to-green-600' : milestone.color
                    } ${isActive ? 'shadow-lg' : ''}`}
                    style={{ 
                      width: `${progress}%`,
                      transitionDelay: isActive ? '300ms' : '0ms'
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Milestone Content */}
      <div className="relative z-10 space-y-4 sm:space-y-6">
        {/* Milestone Header */}
        <div className={`p-3 sm:p-4 bg-gradient-to-r ${currentMilestone.color} rounded-xl shadow-lg relative overflow-hidden backdrop-blur-sm`}>
          <div className="absolute inset-0 bg-black/10 dark:bg-white/5" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <MilestoneIcon className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <MilestoneIcon className="w-6 h-6 sm:w-8 sm:h-8 opacity-20" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span>{currentMilestone.name}</span>
                  {getMilestoneStatus(currentMilestone) === 'completed' && (
                    <span className="bg-green-500 px-2 py-1 rounded-full text-xs font-semibold animate-bounce flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      Complete
                    </span>
                  )}
                </h3>
                <p className="text-white/80 font-medium text-sm sm:text-base">{currentMilestone.level} Level • {currentMilestone.points} Points Available</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xl sm:text-2xl font-bold">
                {completedGoals}/{currentMilestone.goals.length}
              </div>
              <div className="text-white/80 text-xs sm:text-sm font-medium">Goals Complete</div>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {currentMilestone.goals.map((goal, idx) => {
            const percentage = goal.total === 0 ? 0 : Math.min((goal.value / goal.total) * 100, 100);
            const completed = isCompleted(goal);
            const isHovered = hoveredGoal === `${selectedMilestone}-${idx}`;
            
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredGoal(`${selectedMilestone}-${idx}`)}
                onMouseLeave={() => setHoveredGoal(null)}
                className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform group ${
                  completed 
                    ? `bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600 scale-105 shadow-lg shadow-green-500/20` 
                    : isHovered 
                      ? `${themeClasses.cardBg} border-blue-300 dark:border-blue-600 shadow-xl scale-105 shadow-blue-500/20` 
                      : `${themeClasses.cardBg} ${themeClasses.border} hover:shadow-lg`
                } ${themeClasses.cardBg} backdrop-blur-sm`}
              >
                {/* Completion Badge */}
                {completed && (
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}

                <div className="text-center">
                  <div className={`text-2xl sm:text-3xl mb-2 transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>
                    {goal.icon}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold ${themeClasses.textSecondary} mb-2`}>{goal.label}</div>
                  <div className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${completed ? 'text-green-700 dark:text-green-400' : themeClasses.text}`}>
                    {goal.value}<span className={`text-sm ${themeClasses.textMuted}`}>/{goal.total}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className={`relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner`}>
                    <div
                      className={`h-2 sm:h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden ${
                        completed ? 'bg-gradient-to-r from-green-400 to-green-600' : `bg-gradient-to-r ${currentMilestone.color}`
                      } ${animateProgress ? '' : ''}`}
                      style={{ 
                        width: animateProgress ? `${percentage}%` : '0%',
                        transitionDelay: `${idx * 150}ms`
                      }}
                    >
                      <div className="absolute top-0 left-0 h-full w-4 sm:w-6 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                    </div>
                  </div>
                  
                  <div className={`text-xs font-semibold mt-2 ${completed ? 'text-green-600 dark:text-green-400' : themeClasses.textMuted}`}>
                    {Math.round(percentage)}% Complete
                  </div>
                  
                  {/* Tooltip */}
{isHovered && (
  <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 ${themeClasses.cardBg} ${themeClasses.text} text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-[9999] border ${themeClasses.border} animate-fadeIn backdrop-blur-sm`}>
    {completed ? '🎉 Goal Achieved!' : `Need ${goal.total - goal.value} more to complete`}
    <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 ${themeClasses.cardBg} rotate-45 border-l border-t ${themeClasses.border}`} />
  </div>
)}

                </div>
              </div>
            );
          })}
        </div>

        {/* Details Panel */}
        {showDetails && (
          <div className={`p-3 sm:p-4 ${themeClasses.accent} backdrop-blur-sm rounded-xl border ${themeClasses.border} transition-all duration-500 animate-slideDown shadow-inner`}>
            <h4 className={`text-base sm:text-lg font-bold ${themeClasses.text} mb-3 sm:mb-4 flex items-center gap-2`}>
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              Progress Summary
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Skill Badges', value: skill_count, color: 'from-yellow-400 to-orange-500', icon: '⚡' },
                { label: 'Game Badges', value: game_count, color: 'from-blue-400 to-purple-500', icon: '🎮' },
                { label: 'Trivia Badges', value: trivia_count, color: 'from-purple-400 to-pink-500', icon: '🧠' },
                { label: 'Lab Badges', value: labsFree_count, color: 'from-green-400 to-cyan-500', icon: '🧪' }
              ].map((item, i) => (
                <div key={i} className={`text-center p-3 ${themeClasses.cardBg} backdrop-blur-sm rounded-lg border ${themeClasses.border} shadow-sm hover:shadow-md transition-all duration-300 group`}>
                  <div className="text-xl sm:text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1`}>
                    {item.value}
                  </div>
                  <div className={`text-xs sm:text-sm font-medium ${themeClasses.textMuted}`}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; transform: translateY(-20px); }
          to { opacity: 1; max-height: 300px; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
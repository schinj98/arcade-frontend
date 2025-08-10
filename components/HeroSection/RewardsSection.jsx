
import React, { useState, useContext } from 'react';
import { Trophy, Gift, Sparkles, ChevronRight, Info } from 'lucide-react';
import { ThemeContext } from '@/context/ThemeContext'; // adjust if your path differs

export default function RewardsSection() {
  const [hoveredTier, setHoveredTier] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);

  const tierImages = {
    Novice: "/images/arcade-swags-images/Novice.png",
    Trooper: "/images/arcade-swags-images/Trooper.png",
    Ranger: "/images/arcade-swags-images/Ranger.png",
    Champion: "/images/arcade-swags-images/Champion.png",
    Legend: "/images/arcade-swags-images/Legend.png",
  };

  // user-provided dark-mode mapping; light mode will fall back to originals
  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950 border border-slate-600' : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-slate-900/95' : 'bg-white',
    text: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-600',
    border: isDarkMode ? 'border-slate-700/50' : 'border-gray-200',
    borderLight: isDarkMode ? 'border-slate-600/30' : 'border-gray-200',
    hover: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:shadow-lg hover:shadow-gray-200/50',
    accent: isDarkMode ? 'bg-slate-800/50' : 'bg-gradient-to-r from-indigo-50 to-purple-50',
    accentHover: isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-indigo-100'
  };

  const tiers = [
    { name: 'Novice', points: 20, image: tierImages.Novice, color: 'from-green-400 to-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    { name: 'Trooper', points: 40, image: tierImages.Trooper, color: 'from-blue-400 to-indigo-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { name: 'Ranger', points: 65, image: tierImages.Ranger, color: 'from-purple-400 to-pink-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { name: 'Champion', points: 75, image: tierImages.Champion, color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { name: 'Legend', points: 85, image: tierImages.Legend, color: 'from-yellow-400 to-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  ];

  return (
    <div className={`rounded-xl ${themeClasses.bg} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`rounded-2xl shadow-sm border ${themeClasses.border} p-8 mb-8 ${isDarkMode ? themeClasses.cardBg : 'bg-white'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                  <Trophy size={24} />
                </div>
                <h1 className={`text-3xl font-bold ${themeClasses.text}`}>Swag Rewards</h1>
              </div>
              <p className={`${themeClasses.textSecondary}`}>
                Earn points to unlock exclusive swag rewards from previous seasons
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center text-sm">
                  <Gift size={16} className="text-indigo-500 mr-1" />
                  <span className={`font-medium ${themeClasses.text}`}>5</span>
                  <span className={`ml-1 ${themeClasses.textSecondary}`}>reward tiers</span>
                </div>
                <div className="flex items-center text-sm">
                  <Sparkles size={16} className="text-amber-500 mr-1" />
                  <span className={`font-medium ${themeClasses.text}`}>Season 1</span>
                </div>
              </div>
            </div>

            {/* Season Badge */}
            <div className={`${isDarkMode ? themeClasses.accent : 'bg-gradient-to-r from-indigo-50 to-purple-50'} px-6 py-4 rounded-xl border ${themeClasses.border}`}>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🏆</div>
                <div>
                  <p className={`${themeClasses.textSecondary}`}>Previous Season</p>
                  <p className={`font-semibold ${themeClasses.text}`}>Season 1 Rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              onMouseEnter={() => setHoveredTier(tier.name)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`rounded-2xl transition-all duration-300 overflow-hidden group cursor-pointer ${isDarkMode ? `${themeClasses.cardBg} border ${themeClasses.border}` : 'bg-white border border-gray-200'} ${themeClasses.hover}`}
            >
              {/* Tier Image */}
              <div className={`relative h-48 flex items-center justify-center p-4 overflow-hidden ${isDarkMode ? 'bg-slate-800/40' : tier.bgColor}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white to-transparent rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-white to-transparent rounded-full"></div>
                </div>

                <img
                  src={tier.image}
                  alt={`${tier.name} Badge`}
                  className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/160x160?text=Tier';
                  }}
                />

                {/* Points Badge */}
                <div
  className={`absolute top-3 right-3 px-3 py-1.5 text-xs font-medium rounded-lg
    ${tier.bgColor}
    ${tier.borderColor}
    text-blue-600 border backdrop-blur-sm
    dark:bg-opacity-70
  `}
>
                  {tier.points} pts
                </div>
              </div>

              {/* Tier Content */}
              <div className={`p-6 ${isDarkMode ? '' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${themeClasses.text}`}>{tier.name}</h3>
                  <ChevronRight
                    size={20}
                    className={`text-gray-400 transition-transform duration-200 ${hoveredTier === tier.name ? 'translate-x-1' : ''}`}
                  />
                </div>

                <p className={`text-sm ${isDarkMode ? 'text-sky-300' : 'text-blue-600'}`}>
                  Tier {index + 1} Reward
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

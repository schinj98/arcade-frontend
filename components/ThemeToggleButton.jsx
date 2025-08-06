'use client';

import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '@/context/ThemeContext';

export default function ThemeToggleButton({ className = '' }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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
    <button
      onClick={toggleTheme}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-lg cursor-pointer ${themeClasses.accent} ${themeClasses.accentHover} backdrop-blur-sm transition-all duration-300 group`}
      >
      {isDarkMode ? (
        <>
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
          <span className="sr-only">Switch to light mode</span>
        </>
      ) : (
        <>
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
          <span className="sr-only">Switch to dark mode</span>
        </>
      )}
    </button>
  );
}

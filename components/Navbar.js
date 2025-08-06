'use client'

import { useState, useEffect, useRef, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProfileContext } from "/context/ProfileContext"
import { ThemeContext } from '@/context/ThemeContext'
import ThemeToggleButton from '@/components/ThemeToggleButton';

import {
  Home, LayoutDashboard, Gamepad2, Info,
  BookOpenCheck, MessageSquare, PlayCircle,
  Menu, X, ListOrdered, User, LogOut, Moon, Sun
} from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { profileData } = useContext(ProfileContext)
  const { isDarkMode } = useContext(ThemeContext)
  const profileImage = profileData?.userDetails?.profileImage
  const profileName = profileData?.userDetails?.fullName || profileData?.userDetails?.name || "Guest"
  const dropdownRef = useRef()

  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-white',
    navShadow: isDarkMode ? 'shadow-sm' : 'shadow-sm',
    text: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-400',
    border: isDarkMode ? 'border-slate-800' : 'border-gray-200',
    borderLight: isDarkMode ? 'border-slate-700/40' : 'border-gray-100',
    cardBg: isDarkMode ? 'bg-slate-900/80' : 'bg-white',
    hoverBg: isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-gray-50',
    activeBg: isDarkMode ? 'bg-slate-800/60' : 'bg-blue-50',
    activeText: isDarkMode ? 'text-sky-400' : 'text-blue-600',
    btnPrimaryBg: isDarkMode ? 'bg-blue-600' : 'bg-blue-600',
    btnPrimaryHover: isDarkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-100',
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/knowledge', label: 'Knowledge', icon: BookOpenCheck },
    { href: '/leaderboard', label: 'Leaderboard', icon: ListOrdered },
    { href: '/contact', label: 'Contact', icon: MessageSquare }
  ]

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/"
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!profileData?.userDetails) {
      setIsDropdownOpen(false)
    }
  }, [profileData])

  return (
    <nav className={`${themeClasses.bg} ${themeClasses.navShadow} border-b ${themeClasses.border} sticky top-0 z-[100] transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`rounded-full group-hover:shadow-lg transition-all duration-200 ${isDarkMode ? 'shadow-none' : ''}`}>
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <span className={`text-xl font-bold ${themeClasses.text}`}>
              Arcade Track
            </span>
          </Link>

          {/* Center - Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `${themeClasses.activeBg} ${themeClasses.activeText} border ${isDarkMode ? 'border-slate-700' : 'border-blue-200'}`
                      : `${themeClasses.textSecondary} ${themeClasses.hoverBg}`
                  }`}
                >
                  <Icon size={16} className={isActive ? themeClasses.activeText : themeClasses.textMuted} />
                  <span className={isActive ? themeClasses.activeText : themeClasses.textSecondary}>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right - Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggleButton className={`p-2  rounded-lg transition ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`} />
            <a 
              className={`flex items-center gap-2 ${themeClasses.btnPrimaryBg} text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200 ${themeClasses.btnPrimaryHover}`}
              href="https://go.cloudskillsboost.google/arcade" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Gamepad2 size={16} />
              Play Now
            </a>

            {/* Profile Avatar */}
            {profileData?.userDetails ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                  className="relative group focus:outline-none cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl border-2 border-white shadow-md hover:shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-all duration-200 overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center font-bold text-sm ${isDarkMode ? 'text-slate-200' : 'text-white'}`}
                      style={{
                        backgroundColor: `hsl(${(profileName || 'Guest')
                          .split('')
                          .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360}, 70%, 50%)`
                      }}
                    >
                      {profileName
                        ? profileName.split(' ').map(n => n[0]).join('').toUpperCase()
                        : 'G'}
                    </div>
)}

                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </button>

                {isDropdownOpen && (
                  <div className={`${themeClasses.cardBg} border ${themeClasses.borderLight} rounded-xl shadow-xl z-50 p-4 text-sm space-y-3 w-56 absolute right-0 mt-3 transition-colors duration-200`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center font-bold text-sm ${isDarkMode ? 'text-slate-200' : 'text-white'}`}
                          style={{
                            backgroundColor: `hsl(${(profileName || 'Guest')
                              .split('')
                              .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360}, 70%, 50%)`
                          }}
                        >
                          {profileName
                            ? profileName.split(' ').map(n => n[0]).join('').toUpperCase()
                            : 'G'}
                        </div>
                      )}

                      </div>
                      <div className={`font-medium ${themeClasses.text}`}>{profileName}</div>
                    </div>
                    <hr className={`${themeClasses.borderLight}`} />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-all duration-200 cursor-pointer"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 border-white shadow-md ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                <User size={24} className={themeClasses.textMuted} />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-xl transition-all duration-200 ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className={themeClasses.textSecondary} />
            ) : (
              <Menu size={24} className={themeClasses.textSecondary} />
            )}
          </button>
        </div>

        {/* 🌟 Mobile Nav with Smooth Transition */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out border-t ${themeClasses.border}`}
          style={{
            maxHeight: isMenuOpen ? '1000px' : '0px',
            paddingTop: isMenuOpen ? '1rem' : '0',
            opacity: isMenuOpen ? 1 : 0,
          }}
        >
          <div className="flex flex-col gap-2 p-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `${themeClasses.activeBg} ${themeClasses.activeText} border ${isDarkMode ? 'border-slate-700' : 'border-blue-200'}`
                      : `${themeClasses.textSecondary} ${themeClasses.hoverBg}`
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={18} className={isActive ? themeClasses.activeText : themeClasses.textMuted} />
                  <span className={isActive ? themeClasses.activeText : themeClasses.textSecondary}>{item.label}</span>
                </Link>
              )
            })}

            {/* Mobile Avatar and Logout */}
            {profileData?.userDetails ? (
              <div className="flex items-center justify-between px-4 pb-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl overflow-hidden cursor-pointer ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`} onClick={() => setIsDropdownOpen(prev => !prev)}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center font-bold text-sm ${isDarkMode ? 'text-slate-200' : 'text-white'}`}
                      style={{
                        backgroundColor: `hsl(${(profileName || 'Guest')
                          .split('')
                          .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360}, 70%, 50%)`
                      }}
                    >
                      {profileName
                        ? profileName.split(' ').map(n => n[0]).join('').toUpperCase()
                        : 'G'}
                    </div>
                  )}

                  </div>
                  <span className={`text-sm font-medium ${themeClasses.text}`}>{profileName}</span>
                </div>
                {isDropdownOpen && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 mt-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                  <User size={36} className={themeClasses.textMuted} />
                </div>
                <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Guest</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

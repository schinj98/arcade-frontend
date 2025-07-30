'use client'

import { useState, useEffect, useRef, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProfileContext } from "/context/ProfileContext"
import {
  Home, LayoutDashboard, Gamepad2, Info,
  BookOpenCheck, MessageSquare, PlayCircle,
  Menu, X, User, LogOut
} from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { profileData } = useContext(ProfileContext)
  const profileImage = profileData?.userDetails?.profileImage
  const profileName = profileData?.userDetails?.fullName || profileData?.userDetails?.name || "Guest"
  const dropdownRef = useRef()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/knowledge', label: 'Knowledge', icon: BookOpenCheck },
    { href: '/about', label: 'About', icon: Info },
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
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 rounded-full group-hover:shadow-lg group-hover:shadow-blue-600/25 transition-all duration-200">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-900">
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
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right - Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-100 hover:text-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200"
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
                  <div className="w-10 h-10 bg-gray-100 rounded-xl border-2 border-white shadow-md hover:shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-all duration-200 overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={36} className="text-gray-600" />
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 text-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User size={36} className="text-gray-600" />
                        )}
                      </div>
                      <div className="font-medium text-gray-800">{profileName}</div>
                    </div>
                    <hr />
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
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl border-2 border-white shadow-md">
                <User size={24} className="text-gray-400" />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-600" />
            ) : (
              <Menu size={24} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* 🌟 Mobile Nav with Smooth Transition */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out border-t border-gray-200`}
          style={{
            maxHeight: isMenuOpen ? '1000px' : '0px',
            paddingTop: isMenuOpen ? '1rem' : '0',
            opacity: isMenuOpen ? 1 : 0,
          }}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                  {item.label}
                </Link>
              )
            })}

            {/* Mobile Avatar and Logout */}
            {profileData?.userDetails ? (
              <div className="flex items-center justify-between px-4 pb-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer" onClick={() => setIsDropdownOpen(prev => !prev)}>
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={36} className="text-gray-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{profileName}</span>
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
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <User size={36} className="text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-500">Guest</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

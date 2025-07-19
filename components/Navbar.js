// components/Navbar.js
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from "react";
import { ProfileContext } from "/context/ProfileContext";
import { Home, LayoutDashboard, Gamepad2, Info, BookOpenCheck, MessageSquare, PlayCircle, Menu, X, User, Sparkles } from 'lucide-react'


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { profileData } = useContext(ProfileContext);
  const profileImage = profileData?.userDetails?.profileImage;




  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/knowledge', label: 'Knowledge', icon: BookOpenCheck },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: MessageSquare }
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className=" bg-blue-600 rounded-full group-hover:shadow-lg group-hover:shadow-blue-600/25 transition-all duration-200">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Arcade Track
            </span>
          </Link>

          {/* Center - Navigation Items (Desktop) */}
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
          <div className="hidden md:flex items-center gap-4 ">
            <a 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-100 hover:text-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200"
              href="https://go.cloudskillsboost.google/arcade" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Gamepad2 size={16} />
              Play Now
            </a>
            
            {/* User Profile Button */}
            <button className="relative group ">
            <div className="w-10 h-10 bg-gray-100 rounded-xl border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-all duration-200 overflow-hidden">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={36} className="text-gray-600" />
                )}
              </div>

              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </button>


          </div>

          {/* Mobile menu button */}
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
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
              
              {/* Mobile Actions */}
              <div className="flex items-center gap-3 pt-4 mt-2 border-t border-gray-200">
                <a 
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  href="https://go.cloudskillsboost.google/arcade" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PlayCircle size={16} />
                  Play Now
                </a>
                <button className="relative group">
                  <div className=" w-10 h-10 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={36} className="text-gray-600" />
                    )}
                  </div>

                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
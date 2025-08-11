
// app/dashboard/page.js  (or wherever this file lives)
'use client';
import { useContext, useState, useEffect, Suspense } from "react";
import HeroSection from "/components/HeroSection"; // Ensure correct path
import { ProfileContext } from "/context/ProfileContext";
import { ThemeContext } from "@/context/ThemeContext"; // ensure path matches your project

// ========== NEW FUTURISTIC LOADER COMPONENT ==========
function FuturisticLoader({ isDarkMode }) {
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  const themeClasses = {
    bg: isDarkMode ? "bg-slate-950" : "bg-gray-50",
    cardBg: isDarkMode ? "bg-slate-900/80" : "bg-white/90",
    primaryColor: isDarkMode ? "#3b82f6" : "#1d4ed8",
    secondaryColor: isDarkMode ? "#8b5cf6" : "#7c3aed",
    accentColor: isDarkMode ? "#06b6d4" : "#0891b2",
    textColor: isDarkMode ? "#e2e8f0" : "#1f2937",
    subtextColor: isDarkMode ? "#94a3b8" : "#6b7280",
    glowColor: isDarkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(29, 78, 216, 0.2)",
  };

  useEffect(() => {
    setMounted(true);
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(12)].map((_, i) => ({
      id: i,
      backgroundColor: i % 3 === 0 ? themeClasses.primaryColor : 
                      i % 3 === 1 ? themeClasses.secondaryColor : themeClasses.accentColor,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 2}s`
    }));
    setParticles(newParticles);
  }, [themeClasses.primaryColor, themeClasses.secondaryColor, themeClasses.accentColor]);

  // Don't render particles until mounted to 
  if (!mounted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses.bg} relative overflow-hidden transition-all duration-700`}>
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(${themeClasses.primaryColor}22 1px, transparent 1px),
                linear-gradient(90deg, ${themeClasses.primaryColor}22 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite'
            }}
          />
        </div>

        {/* Main Loading Container */}
        <div className={`relative ${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10 transform hover:scale-105 transition-all duration-500`}>
          {/* Glowing Border Effect */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-50 blur-sm"
            style={{
              background: `linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}, ${themeClasses.accentColor})`,
              animation: 'glow-pulse 3s ease-in-out infinite'
            }}
          />
          
          {/* Content Container */}
          <div className="relative z-10 text-center">
            {/* Main Loading Animation */}
            <div className="relative mb-8 flex justify-center">
              {/* Outer Ring */}
              <div 
                className="w-32 h-32 rounded-full border-4 border-transparent relative"
                style={{
                  background: `linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}) padding-box, 
                             linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}, ${themeClasses.accentColor}) border-box`,
                  animation: 'spin-slow 3s linear infinite'
                }}
              >
                {/* Inner Ring */}
                <div 
                  className="absolute inset-4 rounded-full border-4 border-transparent"
                  style={{
                    background: `${themeClasses.cardBg} padding-box, 
                               linear-gradient(225deg, ${themeClasses.accentColor}, ${themeClasses.primaryColor}) border-box`,
                    animation: 'spin-reverse 2s linear infinite'
                  }}
                >
                  {/* Center Core */}
                  <div className="absolute inset-4 rounded-full flex items-center justify-center">
                    <div 
                      className="w-8 h-8 rounded-full animate-pulse"
                      style={{
                        background: `radial-gradient(circle, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor})`,
                        boxShadow: `0 0 20px ${themeClasses.glowColor}`
                      }}
                    />
                  </div>
                </div>
                
                {/* Orbiting Dots */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: i % 2 === 0 ? themeClasses.primaryColor : themeClasses.accentColor,
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                      transform: `rotate(${i * 60}deg) translateX(60px) translateY(-6px)`,
                      animation: `orbit ${2 + i * 0.2}s linear infinite`,
                      boxShadow: `0 0 10px ${themeClasses.glowColor}`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Loading Text with Typewriter Effect */}
            <div className="mb-6">
              <h2 
                className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}, ${themeClasses.accentColor})`
                }}
              >
                Loading Dashboard
              </h2>
              <div className="flex items-center justify-center space-x-1">
                <span style={{ color: themeClasses.subtextColor }} className="text-lg">
                  Initializing
                </span>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: themeClasses.primaryColor,
                        animation: `dot-pulse 1.4s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-80 mx-auto">
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: isDarkMode ? '#334155' : '#e5e7eb' }}
              >
                <div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}, ${themeClasses.accentColor})`,
                    animation: 'loading-bar 2.5s ease-in-out infinite'
                  }}
                >
                  {/* Shimmer Effect */}
                  <div
                    className="absolute inset-0 -skew-x-12"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      animation: 'shimmer 2s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="mt-8 flex justify-center space-x-6">
              {[
                { label: 'Systems', status: 'online' },
                { label: 'Data', status: 'loading' },
                { label: 'UI', status: 'ready' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{
                      backgroundColor: item.status === 'online' ? '#10b981' :
                                     item.status === 'loading' ? themeClasses.primaryColor :
                                     '#f59e0b'
                    }}
                  />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: themeClasses.subtextColor }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Corner Accents */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4"
              style={{
                background: `linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.accentColor})`,
                [i === 0 ? 'top' : i === 1 ? 'top' : 'bottom']: '12px',
                [i === 0 || i === 3 ? 'left' : 'right']: '12px',
                clipPath: i === 0 ? 'polygon(0 0, 100% 0, 0 100%)' :
                          i === 1 ? 'polygon(100% 0, 100% 100%, 0 0)' :
                          i === 2 ? 'polygon(100% 100%, 0 100%, 100% 0)' :
                          'polygon(0 100%, 0 0, 100% 100%)',
                animation: `corner-glow ${2 + i * 0.3}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }

          @keyframes float-particle {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
          }

          @keyframes glow-pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }

          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes spin-reverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }

          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(60px) translateY(-6px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(60px) translateY(-6px) rotate(-360deg); }
          }

          @keyframes dot-pulse {
            0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
            40% { opacity: 1; transform: scale(1.3); }
          }

          @keyframes loading-bar {
            0% { width: 0%; }
            70% { width: 100%; }
            100% { width: 100%; }
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }

          @keyframes corner-glow {
            0% { opacity: 0.4; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${themeClasses.bg} relative overflow-hidden transition-all duration-700`}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(${themeClasses.primaryColor}22 1px, transparent 1px),
              linear-gradient(90deg, ${themeClasses.primaryColor}22 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Particles - Only render after mount */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full opacity-60"
            style={{
              backgroundColor: particle.backgroundColor,
              left: particle.left,
              top: particle.top,
              animation: `float-particle ${particle.animationDuration} ease-in-out infinite`,
              animationDelay: particle.animationDelay
            }}
          />
        ))}
      </div>

      {/* Main Loading Container */}
      <div className={`relative ${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10 transform hover:scale-105 transition-all duration-500`}>
        {/* Glowing Border Effect */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-50 blur-sm"
          style={{
            background: `linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}, ${themeClasses.accentColor})`,
            animation: 'glow-pulse 3s ease-in-out infinite'
          }}
        />
        
        {/* Content Container */}
        <div className="relative z-10 text-center">
          {/* Main Loading Animation */}
          <div className="relative mb-8 flex justify-center">
            {/* Outer Ring */}
            <div 
              className="w-32 h-32 rounded-full border-4 border-transparent relative"
              style={{
                background: `linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}) padding-box, 
                           linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}, ${themeClasses.accentColor}) border-box`,
                animation: 'spin-slow 3s linear infinite'
              }}
            >
              {/* Inner Ring */}
              <div 
                className="absolute inset-4 rounded-full border-4 border-transparent"
                style={{
                  background: `${themeClasses.cardBg} padding-box, 
                             linear-gradient(225deg, ${themeClasses.accentColor}, ${themeClasses.primaryColor}) border-box`,
                  animation: 'spin-reverse 2s linear infinite'
                }}
              >
                {/* Center Core */}
                <div className="absolute inset-4 rounded-full flex items-center justify-center">
                  <div 
                    className="w-8 h-8 rounded-full animate-pulse"
                    style={{
                      background: `radial-gradient(circle, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor})`,
                      boxShadow: `0 0 20px ${themeClasses.glowColor}`
                    }}
                  />
                </div>
              </div>
              
              {/* Orbiting Dots */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? themeClasses.primaryColor : themeClasses.accentColor,
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${i * 60}deg) translateX(60px) translateY(-6px)`,
                    animation: `orbit ${2 + i * 0.2}s linear infinite`,
                    boxShadow: `0 0 10px ${themeClasses.glowColor}`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Loading Text with Typewriter Effect */}
          <div className="mb-6">
            <h2 
              className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}, ${themeClasses.accentColor})`
              }}
            >
              Loading Dashboard
            </h2>
            <div className="flex items-center justify-center space-x-1">
              <span style={{ color: themeClasses.subtextColor }} className="text-lg">
                Initializing
              </span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: themeClasses.primaryColor,
                      animation: `dot-pulse 1.4s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-80 mx-auto">
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: isDarkMode ? '#334155' : '#e5e7eb' }}
            >
              <div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, ${themeClasses.primaryColor}, ${themeClasses.secondaryColor}, ${themeClasses.accentColor})`,
                  animation: 'loading-bar 2.5s ease-in-out infinite'
                }}
              >
                {/* Shimmer Effect */}
                <div
                  className="absolute inset-0 -skew-x-12"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shimmer 2s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mt-8 flex justify-center space-x-6">
            {[
              { label: 'Systems', status: 'online' },
              { label: 'Data', status: 'loading' },
              { label: 'UI', status: 'ready' }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{
                    backgroundColor: item.status === 'online' ? '#10b981' :
                                   item.status === 'loading' ? themeClasses.primaryColor :
                                   '#f59e0b'
                  }}
                />
                <span 
                  className="text-sm font-medium"
                  style={{ color: themeClasses.subtextColor }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Corner Accents */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4"
            style={{
              background: `linear-gradient(45deg, ${themeClasses.primaryColor}, ${themeClasses.accentColor})`,
              [i === 0 ? 'top' : i === 1 ? 'top' : 'bottom']: '12px',
              [i === 0 || i === 3 ? 'left' : 'right']: '12px',
              clipPath: i === 0 ? 'polygon(0 0, 100% 0, 0 100%)' :
                        i === 1 ? 'polygon(100% 0, 100% 100%, 0 0)' :
                        i === 2 ? 'polygon(100% 100%, 0 100%, 100% 0)' :
                        'polygon(0 100%, 0 0, 100% 100%)',
              animation: `corner-glow ${2 + i * 0.3}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(60px) translateY(-6px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) translateY(-6px) rotate(-360deg); }
        }

        @keyframes dot-pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.3); }
        }

        @keyframes loading-bar {
          0% { width: 0%; }
          70% { width: 100%; }
          100% { width: 100%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }

        @keyframes corner-glow {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}


// Custom Alert/Message component (reused from homepage for consistency)
function MessageModal({ message, onClose, themeClasses }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 p-4 pointer-events-none">
      {/* Backdrop with pointer events */}
      <div
        className={`fixed inset-0 ${themeClasses.backdrop} backdrop-blur-sm pointer-events-auto animate-fadeIn`}
        onClick={onClose}
      ></div>

      {/* Popup notification */}
      <div className="relative top-20 pointer-events-auto animate-bounceIn">
        <div
          className={`${themeClasses.cardGradient} ${themeClasses.cardBorder} backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden`}
        >
          {/* Decorative circles */}
          <div className={`${themeClasses.decorativeCircle1}`}></div>
          <div className={`${themeClasses.decorativeCircle2}`}></div>

          {/* Cute robot icon */}
          <div className="flex justify-center mb-6 animate-wiggle">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                {/* Robot face */}
                <div className="relative">
                  {/* Eyes */}
                  <div className="absolute -top-2 left-0 w-3 h-3 bg-white rounded-full animate-blink"></div>
                  <div className="absolute -top-2 right-0 w-3 h-3 bg-white rounded-full animate-blink"></div>
                  {/* Mouth */}
                  <div className="mt-2 w-8 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              {/* Alert badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center animate-pulse shadow-md">
                <span className="text-white text-sm font-bold">!</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center mb-4" style={{ color: themeClasses.titleColor }}>
            Oops! Something&apos;s Not Right
          </h3>

          {/* Message */}
          <div className={`${themeClasses.msgBg} backdrop-blur rounded-2xl p-4 mb-6 shadow-inner`}>
            <p style={{ color: themeClasses.msgText }} className="text-center leading-relaxed">
              {message || "The URL seems to be incorrect or empty. Please check and try again!"}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 animate-shimmer"
            style={{
              background: themeClasses.actionGradient,
              color: themeClasses.actionText,
            }}
          >
            <span className="flex cursor-pointer items-center justify-center gap-2">
              Got it!
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          {/* Fun floating elements */}
          <div className="absolute top-4 left-4 text-2xl animate-float">🌟</div>
          <div className="absolute bottom-4 right-4 text-2xl animate-float-delayed">✨</div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { profileData, showModal, setShowModal, isReady, isLoading, triggerProfileFetch } = useContext(ProfileContext);
  const { isDarkMode } = useContext(ThemeContext);

  const [urlInput, setUrlInput] = useState("");
  const [message, setMessage] = useState(""); // State for custom message

  // theme class collection to replace hardcoded light classes
  const themeClasses = {
    bg: isDarkMode ? "bg-slate-950" : "bg-gray-100",
    pageText: isDarkMode ? "text-slate-100" : "text-gray-700",
    subduedText: isDarkMode ? "text-slate-300" : "text-gray-700",
    inputBg: isDarkMode ? "bg-slate-800/60" : "bg-white/10",
    inputBorder: isDarkMode ? "border-slate-700/40" : "border-white/30",
    cardGradient: isDarkMode
      ? "bg-gradient-to-br from-white/5 via-transparent to-slate-800/20"
      : "bg-gradient-to-br from-white/10 via-transparent to-blue-500/10",
    cardBorder: isDarkMode ? "border border-slate-800/40" : "border border-white/30",
    backdrop: isDarkMode ? "bg-black/40" : "bg-black/20",
    msgBg: isDarkMode ? "bg-slate-800/70" : "bg-white/80",
    msgText: isDarkMode ? "#cbd5e1" : "#374151", // hex for consistent contrast
    titleColor: isDarkMode ? "#e6eef8" : undefined,
    actionGradient: isDarkMode ? "linear-gradient(90deg,#6b46c1,#b83280)" : "linear-gradient(90deg,#4F46E5,#06B6D4)",
    actionText: "#ffffff",
    decorativeCircle1: "absolute -top-10 -right-10 w-32 h-32 bg-yellow-200/20 rounded-full opacity-40 blur-2xl",
    decorativeCircle2: "absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/15 rounded-full opacity-30 blur-2xl",
  };

  // Effect to handle profile ID from homepage via sessionStorage
  useEffect(() => {
    const tempProfileId = sessionStorage.getItem("temp_profile_id");
    if (tempProfileId) {
      // Convert profile ID back to URL format for display in input
      const profileUrl = `https://www.cloudskillsboost.google/public_profiles/${tempProfileId}`;
      setUrlInput(profileUrl);

      // Trigger the profile fetch using the context function
      console.log("Dashboard: Found temp_profile_id, triggering fetch:", tempProfileId);
      triggerProfileFetch(tempProfileId);

      // Clear temp_profile_id immediately after triggering the fetch
      sessionStorage.removeItem("temp_profile_id");
    }
  }, [triggerProfileFetch]);

  const extractProfileId = (url) => {
    try {
      const match = url.match(/public_profiles\/([a-z0-9-]+)/i);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const handleSubmit = () => {
    setMessage(""); // Clear previous messages
    try {
      const profileId = extractProfileId(urlInput);
      if (profileId) {
        // Trigger the profile fetch using the context function
        console.log("Dashboard Modal: Submitting new profileId, triggering fetch:", profileId);
        triggerProfileFetch(profileId);
        setShowModal(false); // Close the modal after submission
      } else {
        setMessage("Please enter a valid Google Arcade profile URL.");
      }
    } catch {
      setMessage("Invalid URL format.");
    }
  };

  // ========== REPLACE THIS OLD LOADING WITH NEW FUTURISTIC LOADER ==========
  if (!isReady || isLoading) {
    return <FuturisticLoader isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`relative ${themeClasses.bg} transition-colors duration-300`}>
      {/* Hero Section */}
      <HeroSection
        profileData={profileData}
        incompleteBadges={profileData?.incompleteBadges}
        isDarkMode={isDarkMode}
      />

      {/* Modal if profile ID not found or data is missing */}
      {!profileData && showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-8">
          <div className={`absolute inset-0 ${themeClasses.cardGradient} ${themeClasses.cardBorder} backdrop-blur-md`} />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/30 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-bounce delay-500"></div>
          </div>

          <div
            className={`relative ${isDarkMode ? "bg-slate-900/80" : "bg-white/10"} backdrop-blur-2xl ${themeClasses.cardBorder} rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-3xl`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm animate-pulse"></div>

            <div className="relative p-8 text-center">
              <h2 className="text-3xl font-bold mb-3" style={{ color: isDarkMode ? "#e6eef8" : undefined }}>
                Enter Your Arcade Profile
              </h2>
              <p className={`${isDarkMode ? "text-slate-300" : "text-white/70"} text-sm mb-8 leading-relaxed`}>
                Connect your Google Arcade profile to get started
              </p>

              <div className="relative mb-8 group overflow-hidden">
                <input
                  type="text"
                  placeholder="eg. https://www.cloudskillsboost.google/public_profiles/....."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className={`w-full px-5 py-4 ${themeClasses.inputBg} ${themeClasses.inputBorder} rounded-2xl ${isDarkMode ? "text-slate-100 placeholder-slate-400" : "text-gray-700 placeholder-gray-400"} focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/15 hover:border-white/40 text-sm`}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-focus-within:translate-x-full transition-transform duration-700 pointer-events-none"></div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full cursor-pointer relative overflow-hidden text-white font-semibold px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] border border-white/20 hover:border-white/30"
                style={{
                  background: isDarkMode ? "linear-gradient(90deg,#1e3a8a,#6d28d9)" : undefined,
                }}
              >
                <span className="relative z-10 text-sm tracking-wide">Submit</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      <MessageModal message={message} onClose={() => setMessage("")} themeClasses={themeClasses} />
    </div>
  );
}

export default function DashboardPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-600 text-xl">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
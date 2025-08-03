'use client';
import { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const EVENT_START_TIME = new Date('2025-08-04T17:00:00'); // Adjust as needed

export default function CountdownNotificationBar() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Step 1: Event start time (in ISO format, UTC or local)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = EVENT_START_TIME.getTime() - now.getTime();

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [EVENT_START_TIME]);


  const formatTime = (time) => time.toString().padStart(2, '0');

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 animate-pulse"></div>
      <div className="relative px-2 sm:px-4 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout (xs to sm) */}
          <div className="sm:hidden flex flex-col gap-2">
            {/* Top row: Title and Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm">
                  <Calendar className="w-3 h-3" />
                </div>
                <h3 className="font-bold text-sm tracking-wide">
                  Facilitator &#39;25
                </h3>
                <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                  Cohort 2
                </span>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="w-6 h-6 cursor-pointer flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
                aria-label="Close notification"
              >
                <span className="text-sm leading-none">×</span>
              </button>
            </div>
            
            {/* Bottom row: Countdown */}
            <div className="flex items-center justify-center gap-2 font-mono">
              <div className="flex items-center gap-1 font-semibold text-xs">
                <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '2s' }} />
                <span>In</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold">
                <span className="bg-white/20 rounded px-1.5 py-0.5 backdrop-blur-sm">{formatTime(timeLeft.days)}d</span>
                <span className="animate-pulse text-xs">:</span>
                <span className="bg-white/20 rounded px-1.5 py-0.5 backdrop-blur-sm">{formatTime(timeLeft.hours)}h</span>
                <span className="animate-pulse text-xs">:</span>
                <span className="bg-white/20 rounded px-1.5 py-0.5 backdrop-blur-sm">{formatTime(timeLeft.minutes)}m</span>
                <span className="animate-pulse text-xs">:</span>
                <span className="bg-white/20 rounded px-1.5 py-0.5 backdrop-blur-sm text-yellow-300">{formatTime(timeLeft.seconds)}s</span>
              </div>
            </div>
          </div>

          {/* Tablet and Desktop Layout (sm and up) */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base lg:text-lg tracking-wide">
                  Facilitator &#39;25
                </h3>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                  Cohort 2
                </span>
              </div>
            </div>

            {/* Countdown Section */}
            <div className="flex items-center gap-3 font-mono">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '5s' }} />
                <span className="hidden md:inline">Starting in</span>
                <span className="md:hidden">In</span>
              </div>
              <div className="flex items-center gap-1 text-sm md:text-base lg:text-lg font-bold">
                <span className="bg-white/20 rounded px-2 py-1 backdrop-blur-sm">{formatTime(timeLeft.days)}d</span>
                <span className="animate-pulse">:</span>
                <span className="bg-white/20 rounded px-2 py-1 backdrop-blur-sm">{formatTime(timeLeft.hours)}h</span>
                <span className="animate-pulse">:</span>
                <span className="bg-white/20 rounded px-2 py-1 backdrop-blur-sm">{formatTime(timeLeft.minutes)}m</span>
                <span className="animate-pulse">:</span>
                <span className="bg-white/20 rounded px-2 py-1 backdrop-blur-sm text-yellow-300">{formatTime(timeLeft.seconds)}s</span>
              </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="w-6 h-6 cursor-pointer flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm flex-shrink-0"
              aria-label="Close notification"
            >
              <span className="text-sm leading-none">×</span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
    </div>
  );
}
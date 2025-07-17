"use client";
import { useContext, useState, useEffect, Suspense } from "react";
import HeroSection from "/components/HeroSection"; // Assuming this path is correct
import { ProfileContext } from "/context/ProfileContext";


// Custom Alert/Message component (reused from homepage for consistency)
function MessageModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 p-4 pointer-events-none">
      {/* Backdrop with pointer events */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto animate-fadeIn"
        onClick={onClose}
      ></div>
      
      {/* Popup notification */}
      <div className="relative top-20 pointer-events-auto animate-bounceIn">
        <div className="bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden border-2 border-white">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-2xl"></div>
          
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
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-indigo-600 bg-clip-text text-white mb-4">
            Oops! Something's Not Right
          </h3>
          
          {/* Message */}
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 mb-6 shadow-inner">
            <p className="text-gray-700 text-center leading-relaxed">
              {message || "The URL seems to be incorrect or empty. Please check and try again!"}
            </p>
          </div>
          
          {/* Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 animate-shimmer"
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
  const [urlInput, setUrlInput] = useState("");
  const [message, setMessage] = useState(''); // State for custom message

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
      
      // IMPORTANT: Clear temp_profile_id immediately after triggering the fetch
      // to prevent re-triggering on subsequent renders or accidental reloads.
      sessionStorage.removeItem("temp_profile_id");
    }
  }, [triggerProfileFetch]); // Depend on triggerProfileFetch

  const extractProfileId = (url) => {
    try {
      const match = url.match(/public_profiles\/([a-z0-9-]+)/i);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const handleSubmit = () => {
    setMessage(''); // Clear previous messages
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

  if (!isReady || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection
        profileData={profileData}
        incompleteBadges={profileData?.incompleteBadges}
      />

      {/* Modal if profile ID not found or data is missing */}
      {!profileData && showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/30 backdrop-blur-md" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/30 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-bounce delay-500"></div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-3xl hover:shadow-blue-500/20 hover:border-white/40">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm animate-pulse"></div>

            <div className="relative p-8 text-center">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                Enter Your Arcade Profile
              </h2>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Connect your Google Arcade profile to get started
              </p>

              <div className="relative mb-8 group overflow-hidden">
                <input
                  type="text"
                  placeholder="eg. https://www.cloudskillsboost.google/public_profiles/....."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/15 hover:border-white/40 text-sm"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-focus-within:translate-x-full transition-transform duration-700 pointer-events-none"></div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full cursor-pointer  relative overflow-hidden bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md text-white font-semibold px-6 py-4 rounded-2xl transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400/60 group hover:scale-[1.02] border border-white/20 hover:border-white/30"
              >
                <span className="relative z-10 text-sm tracking-wide">Submit</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      )}
      <MessageModal message={message} onClose={() => setMessage('')} />
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

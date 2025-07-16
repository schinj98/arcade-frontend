"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HeroSection from "/components/HeroSection";

function DashboardContent() {
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [isReady, setIsReady] = useState(false);

  const searchParams = useSearchParams();
  const profileId = searchParams.get("profile_id");

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    let finalProfileId = profileId;

    // 🔐 Save profile_id to localStorage
    if (profileId) {
      localStorage.setItem("profile_id", profileId);
    }

    // 🔁 If profile_id not in URL, try from localStorage
    if (!profileId) {
      const storedId = localStorage.getItem("profile_id");
      if (storedId) {
        finalProfileId = storedId;
        const newUrl = window.location.pathname;
        window.history.replaceState(null, "", newUrl);
      } else {
        setShowModal(true);
        setIsReady(true);
        return;
      }
    }
    const cachedKey = `cachedProfileData-${finalProfileId}`;
    const isReload = window.performance?.navigation?.type === 1;

    if (!isReload) {
      const cached = localStorage.getItem(cachedKey);
      if (cached) {
        setProfileData(JSON.parse(cached));
        setIsReady(true);
        const newUrl = window.location.pathname;
        window.history.replaceState(null, "", newUrl);
        return; 
      }
    }


    // 🌐 Fetch fresh data
    async function fetchProfile() {
      try {
        const res = await fetch(`${apiBase}/api/profile?profile_id=${finalProfileId}`);
        const json = await res.json();
        if (json?.data) {
          setProfileData(json.data);
          localStorage.setItem(cachedKey, JSON.stringify(json.data));
          const newUrl = window.location.pathname;
          window.history.replaceState(null, "", newUrl);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setIsReady(true);
      }
    }

    fetchProfile();
  }, [profileId]); // ✅ Effect depends on profileId only

  const handleSubmit = () => {
    try {
      const match = urlInput.match(/public_profiles\/([a-z0-9-]+)/i);
      if (match && match[1]) {
        const id = match[1];
        window.location.href = `/dashboard?profile_id=${id}`;
      } else {
        alert("Please enter a valid Google Arcade profile URL.");
      }
    } catch {
      alert("Invalid URL format.");
    }
  };

  if (!isReady) return null;

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection
        profileData={profileData}
        incompleteBadges={profileData?.incompleteBadges}
      />

      {/* Modal if profile ID not found */}
      {showModal && (
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
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md text-white font-semibold px-6 py-4 rounded-2xl transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400/60 group hover:scale-[1.02] border border-white/20 hover:border-white/30"
              >
                <span className="relative z-10 text-sm tracking-wide">Submit</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-600 text-xl">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

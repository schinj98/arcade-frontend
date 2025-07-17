"use client";
import { createContext, useEffect, useState, useCallback } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  // Extracted API fetching logic into a memoized callback
  const fetchProfileData = useCallback(async (profileIdToFetch) => {
    if (!profileIdToFetch) {
      console.log("No profileId provided to fetchProfileData.");
      setShowModal(true);
      setIsReady(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Set loading true when starting fetch
    setShowModal(false); // Hide modal while fetching
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const cachedKey = `cachedProfileData-${profileIdToFetch}`;

    try {
      console.log("📡 Calling API for profileId:", profileIdToFetch);
      const res = await fetch(`${apiBase}/api/v1/computedProfile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey && { "X-API-KEY": apiKey }),
        },
        body: JSON.stringify({ profile_id: profileIdToFetch }),
      });

      const json = await res.json();
      console.log("API Response:", json);

      if (json?.data) {
        setProfileData(json.data);
        localStorage.setItem(cachedKey, JSON.stringify(json.data));
      } else {
        setProfileData(null); // Clear data if API returns no data
        setShowModal(true);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setProfileData(null); // Clear data on error
      setShowModal(true);
    } finally {
      setIsReady(true);
      setIsLoading(false); // Set loading false after fetch completes
      // Only replace state if profileId came from URL to clean it up
      // This part is handled by the initial useEffect, not this reusable function
    }
  }, []); // Empty dependency array as it doesn't depend on external state

  // Function to be exposed via context to trigger a fetch
  const triggerProfileFetch = useCallback((profileId) => {
    console.log("Triggering profile fetch manually for:", profileId);
    // Remove cached data for this profile to force a fresh API call
    localStorage.removeItem(`cachedProfileData-${profileId}`);
    fetchProfileData(profileId);
  }, [fetchProfileData]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const urlProfileId = urlParams.get("profile_id");
    const tempProfileId = sessionStorage.getItem("temp_profile_id");
    const storedProfileId = localStorage.getItem("profile_id");

    console.log("ProfileContext Debug:", {
      urlProfileId,
      tempProfileId,
      storedProfileId,
      pathname: window.location.pathname,
    });

    let profileId = null;
    let shouldCallApi = false;

    // ✅ Step 1: Determine profileId
    if (urlProfileId) {
      profileId = urlProfileId;
      localStorage.setItem("profile_id", profileId);
      // Clean up URL parameter immediately if it was used
      window.history.replaceState(null, "", window.location.pathname);
    } else if (tempProfileId) {
      profileId = tempProfileId;
      localStorage.setItem("profile_id", profileId);
      // NOTE: temp_profile_id is now removed by the component that consumes it (e.g., dashboard)
      // sessionStorage.removeItem("temp_profile_id"); // Removed from here
    } else if (storedProfileId) {
      profileId = storedProfileId;
    }

    // ✅ Step 2: Check if it's a reload (for initial load behavior)
    const navEntry = performance?.getEntriesByType("navigation")[0];
    const isReload = navEntry?.type === "reload" || performance?.navigation?.type === 1;

    // ✅ Step 3: Decide if we should call the API on initial load
    // We call API if it's a new URL param, a temp ID from session, or a full reload
    shouldCallApi = !!urlProfileId || !!tempProfileId || isReload;

    console.log("Final Decision (initial useEffect):", {
      profileId,
      isReload,
      shouldCallApi,
    });

    if (!profileId) {
      setShowModal(true);
      setIsReady(true);
      return;
    }

    const cached = localStorage.getItem(`cachedProfileData-${profileId}`);

    if (shouldCallApi || !cached) { // Also fetch if no cached data exists
      console.log("📡 Initial load: Calling API or no cache for profileId:", profileId);
      fetchProfileData(profileId);
    } else {
      console.log("🗃️ Initial load: Using cached data for profileId:", profileId);
      try {
        setProfileData(JSON.parse(cached));
      } catch (err) {
        console.error("Error parsing cached data:", err);
        setShowModal(true);
      } finally {
        setIsReady(true);
        setIsLoading(false);
      }
    }
  }, [fetchProfileData]); // Dependency on fetchProfileData to ensure it's always the latest version

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        showModal,
        setShowModal,
        isReady,
        isLoading, // Provide loading state
        triggerProfileFetch, // Provide the trigger function
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

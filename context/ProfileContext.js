"use client";
import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Check for profile ID in different sources
    const urlParams = new URLSearchParams(window.location.search);
    const urlProfileId = urlParams.get("profile_id");
    const tempProfileId = sessionStorage.getItem("temp_profile_id");
    const storedProfileId = localStorage.getItem("profile_id");

    let profileId = null;
    let shouldCallApi = false;

    // Priority order for profile ID selection and API call decision
    if (urlProfileId) {
      // Case 1: Direct URL with profile_id parameter
      profileId = urlProfileId;
      shouldCallApi = true;
      localStorage.setItem("profile_id", profileId);
    } else if (tempProfileId) {
      // Case 2: Coming from homepage or modal submission
      profileId = tempProfileId;
      shouldCallApi = true;
      localStorage.setItem("profile_id", profileId);
      sessionStorage.removeItem("temp_profile_id"); // cleanup
    } else if (storedProfileId) {
      // Case 3: User returning, check if we need fresh data
      profileId = storedProfileId;
      const isReload = performance?.navigation?.type === 1 || 
                      performance?.getEntriesByType("navigation")[0]?.type === "reload";
      shouldCallApi = isReload; // Only call API on page reload
    }

    // If no profile ID found anywhere, show modal
    if (!profileId) {
      setShowModal(true);
      setIsReady(true);
      return;
    }

    const cachedKey = `cachedProfileData-${profileId}`;

    if (shouldCallApi) {
      // Call API for fresh data
      async function fetchProfile() {
        try {
          const res = await fetch(`${apiBase}/api/v1/computedProfile`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...(apiKey && { "X-API-KEY": apiKey }),
            },
            body: JSON.stringify({ profile_id: profileId }),
          });

          const json = await res.json();
          if (json?.data) {
            setProfileData(json.data);
            localStorage.setItem(cachedKey, JSON.stringify(json.data));
          } else {
            setShowModal(true);
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          setShowModal(true);
        } finally {
          setIsReady(true);
          // Clean URL parameters if they exist
          if (urlProfileId) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }
      }

      fetchProfile();
    } else {
      // Use cached data (user returning from another tab/page)
      const cached = localStorage.getItem(cachedKey);
      if (cached) {
        try {
          setProfileData(JSON.parse(cached));
          setIsReady(true);
        } catch (err) {
          console.error("Error parsing cached data:", err);
          setShowModal(true);
          setIsReady(true);
        }
      } else {
        // No cached data found, show modal
        setShowModal(true);
        setIsReady(true);
      }
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, showModal, setShowModal, isReady }}>
      {children}
    </ProfileContext.Provider>
  );
};
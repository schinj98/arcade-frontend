"use client";
import { createContext, useEffect, useState, useCallback } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchProfileData = useCallback(async (profileIdToFetch) => {
    if (!profileIdToFetch) {
      setShowModal(true);
      setIsReady(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setShowModal(false);
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const cachedKey = `cachedProfileData-${profileIdToFetch}`;

    try {
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

      if (json?.data) {
        setProfileData(json.data);
        localStorage.setItem(cachedKey, JSON.stringify(json.data));
      } else {
        setProfileData(null);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setProfileData(null); 
      setShowModal(true);
    } finally {
      setIsReady(true);
      setIsLoading(false); 
    }
  }, []); 
  const triggerProfileFetch = useCallback((profileId) => {
    localStorage.setItem("profile_id", profileId);
    localStorage.removeItem(`cachedProfileData-${profileId}`);
    fetchProfileData(profileId);
  }, [fetchProfileData]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const urlProfileId = urlParams.get("profile_id");
    const tempProfileId = sessionStorage.getItem("temp_profile_id");
    const storedProfileId = localStorage.getItem("profile_id");


    let profileId = null;
    let shouldCallApi = false;

    if (urlProfileId) {
      profileId = urlProfileId;
      localStorage.setItem("profile_id", profileId);
      window.history.replaceState(null, "", window.location.pathname);
    } else if (tempProfileId) {
      profileId = tempProfileId;
      localStorage.setItem("profile_id", profileId);
    } else if (storedProfileId) {
      profileId = storedProfileId;
    }

    const navEntry = performance?.getEntriesByType?.("navigation")?.[0];
    const isReload = navEntry?.type === "reload" || window.performance?.navigation?.type === 1;

    shouldCallApi = !!urlProfileId || !!tempProfileId || isReload;
    


    if (!profileId) {
      setShowModal(true);
      setIsReady(true);
      return;
    }

    const cached = localStorage.getItem(`cachedProfileData-${profileId}`);

    if (shouldCallApi || !cached) {
      fetchProfileData(profileId);
    } else {
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
  }, [fetchProfileData]);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        showModal,
        setShowModal,
        isReady,
        isLoading,
        triggerProfileFetch, 
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

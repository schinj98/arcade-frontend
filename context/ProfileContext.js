"use client";
import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [urlVisited, setUrlVisited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    let profileId;

    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("profile_id");

    if (idFromUrl) {
      profileId = idFromUrl;
      localStorage.setItem("profile_id", profileId);
    } else {
      const storedId = localStorage.getItem("profile_id");
      if (storedId) {
        profileId = storedId;
        const newUrl = window.location.pathname;
        window.history.replaceState(null, "", newUrl);
      } else {
        setShowModal(true);
        setIsReady(true);
        return;
      }
    }

    const cachedKey = `cachedProfileData-${profileId}`;
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
  }, []);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, showModal, setShowModal, isReady }}>
      {children}
    </ProfileContext.Provider>
  );
};

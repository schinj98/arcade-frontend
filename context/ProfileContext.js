"use client";
import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // ✅ Get profile_id from URL or localStorage
  function getProfileIdFromUrlOrStorage() {
    if (typeof window === "undefined") return null;

    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("profile_id");

    if (idFromUrl) {
      localStorage.setItem("profile_id", idFromUrl);
      return idFromUrl;
    }

    return localStorage.getItem("profile_id");
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const profileId = getProfileIdFromUrlOrStorage();

    if (!profileId) {
      setShowModal(true);
      setIsReady(true);
      return;
    }

    const cachedKey = `cachedProfileData-${profileId}`;
    const isReload = window.performance?.navigation?.type === 1;

    if (!isReload) {
      const cached = localStorage.getItem(cachedKey);
      if (cached) {
        setProfileData(JSON.parse(cached));
        setIsReady(true);
        window.history.replaceState(null, "", window.location.pathname);
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
        console.log("API response is this:", json);

        if (json?.data) {
          setProfileData(json.data);
          localStorage.setItem(cachedKey, JSON.stringify(json.data));
          window.history.replaceState(null, "", window.location.pathname);
        } else {
          setShowModal(true); // API didn't return expected data
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setShowModal(true);
      } finally {
        setIsReady(true);
      }
    }

    fetchProfile();
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  return (
    <ProfileContext.Provider
      value={{ profileData, setProfileData, showModal, setShowModal, isReady }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

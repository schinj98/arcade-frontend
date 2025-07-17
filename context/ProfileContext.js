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
    } else if (tempProfileId) {
      profileId = tempProfileId;
      localStorage.setItem("profile_id", profileId);
      sessionStorage.removeItem("temp_profile_id"); // cleanup
    } else if (storedProfileId) {
      profileId = storedProfileId;
    }

    // ✅ Step 2: Check if it's a reload
    const navEntry = performance?.getEntriesByType("navigation")[0];
    const isReload =
      navEntry?.type === "reload" || performance?.navigation?.type === 1;

    // ✅ Step 3: Decide if we should call the API
    shouldCallApi = !!urlProfileId || !!tempProfileId || isReload;

    console.log("Final Decision:", {
      profileId,
      isReload,
      shouldCallApi,
    });

    if (!profileId) {
      setShowModal(true);
      setIsReady(true);
      return;
    }

    const cachedKey = `cachedProfileData-${profileId}`;

    if (shouldCallApi) {
      console.log("📡 Calling API for profileId:", profileId);
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
          console.log("API Response:", json);

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
          if (urlProfileId) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }
      }

      fetchProfile();
    } else {
      console.log("🗃️ Using cached data for profileId:", profileId);
      const cached = localStorage.getItem(cachedKey);
      if (cached) {
        try {
          setProfileData(JSON.parse(cached));
        } catch (err) {
          console.error("Error parsing cached data:", err);
          setShowModal(true);
        }
      } else {
        setShowModal(true);
      }
      setIsReady(true);
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profileData, setProfileData, showModal, setShowModal, isReady }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

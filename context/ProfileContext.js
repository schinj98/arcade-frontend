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

    let profileId = null;

    // 1️⃣ agar URL me profile_id hai, toh usko use karo
    if (urlProfileId) {
      profileId = urlProfileId;
      localStorage.setItem("profile_id", profileId); // store karo
    } else {
      // 2️⃣ agar nahi hai toh localStorage se lo
      profileId = localStorage.getItem("profile_id");
    }

    if (!profileId) {
      setShowModal(true);
      setIsReady(true);
      return;
    }

    const cachedKey = `cachedProfileData-${profileId}`;
    const isReload = performance?.navigation?.type === 1 || performance?.getEntriesByType("navigation")[0]?.type === "reload";

    const shouldCallApi = urlProfileId || isReload;

    // ✅ agar API call karni hai toh karo
    if (shouldCallApi) {
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
          window.history.replaceState(null, "", window.location.pathname); // URL clean
        }
      }

      fetchProfile();
    } else {
      // ❌ API call nahi karni, cache use karo
      const cached = localStorage.getItem(cachedKey);
      if (cached) {
        setProfileData(JSON.parse(cached));
        setIsReady(true);
      } else {
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

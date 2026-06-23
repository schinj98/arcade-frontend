"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const buildHeaders = (token) => ({
    "Content-Type": "application/json",
    ...(apiKey && { "X-API-KEY": apiKey }),
    ...(token && { Authorization: `Bearer ${token}` }),
  });

  const extractProfileId = (url) => {
    const match = (url || "").match(/public_profiles\/([a-z0-9-]+)/i);
    return match ? match[1] : null;
  };

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsAuthLoading(false);
      return;
    }
    try {
      const res = await fetch(`${apiBase}/api/v1/auth/me`, {
        headers: buildHeaders(token),
      });
      const json = await res.json();
      if (json.success) {
        setUser(json.data);
      } else {
        localStorage.removeItem("auth_token");
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const login = async (email, password) => {
    const res = await fetch(`${apiBase}/api/v1/auth/login`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (json.success) {
      localStorage.setItem("auth_token", json.data.token);
      setUser(json.data.user);
      const profileId = extractProfileId(json.data.user.google_profile_url);
      if (profileId) {
        localStorage.setItem("profile_id", profileId);
      }
    }
    return json;
  };

  const register = async (formData) => {
    const res = await fetch(`${apiBase}/api/v1/auth/register`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.success) {
      localStorage.setItem("auth_token", json.data.token);
      setUser(json.data.user);
      const profileId = extractProfileId(json.data.user.google_profile_url);
      if (profileId) {
        localStorage.setItem("profile_id", profileId);
      }
    }
    return json;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("profile_id");
    Object.keys(localStorage)
      .filter((k) => k.startsWith("cachedProfileData-"))
      .forEach((k) => localStorage.removeItem(k));
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, isAuthLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

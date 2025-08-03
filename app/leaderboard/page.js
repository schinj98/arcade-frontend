"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://arcade-backend-4oc3.onrender.com/api/v1/allProfiles")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profiles:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧑‍💻 User Profiles</h1>
      {loading ? (
        <p>Loading...</p>
      ) : profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul className="space-y-4">
          {profiles.map((profile) => (
            <li key={profile.profile_id} className="border p-4 rounded shadow">
              <img src={profile.user_img} alt="User" className="w-16 h-16 rounded-full mb-2" />
              <p><strong>Name:</strong> {profile.user_name}</p>
              <p><strong>Profile ID:</strong> {profile.profile_id}</p>
              <p><strong>Total Points:</strong> {profile.total_points}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

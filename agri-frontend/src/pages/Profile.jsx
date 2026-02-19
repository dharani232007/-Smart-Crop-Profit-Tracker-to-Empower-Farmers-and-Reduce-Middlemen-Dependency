import { useEffect, useState } from "react";
import API from "../api/api";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get("/profile");
      setUser(res.data);
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="glass-card p-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}

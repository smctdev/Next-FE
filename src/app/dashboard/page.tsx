"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function page() {
  const { isAuthenticated, loading, logout }: any = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      return router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return <div>Loading...</div>;

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-lg"
      >
        <i className="far fa-right-from-bracket"></i> Logout
      </button>
    </div>
  );
}

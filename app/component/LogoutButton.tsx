"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };

  return (
    <div className="fixed top-12 right-150 z-50">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 text-white px-5 py-2 rounded-xl shadow-lg font-medium"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };

  return (
  <div className="top-4 right-4 z-50">
  <button
    onClick={handleLogout}
    className="
      flex items-center gap-1.5
      bg-white/10
      backdrop-blur-md
      border border-white/20
      hover:border-gray-400
      text-gray-700 hover:text-black
      px-3 py-1.5
      rounded-xl
      shadow-sm hover:shadow-md
      transition-all duration-200
      text-sm font-medium
    "
  >
    <LogOut size={15} />
    Logout
  </button>
</div>
  );
}
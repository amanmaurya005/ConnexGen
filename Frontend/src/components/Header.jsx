import React from "react";
import { FiSearch, FiBell, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 w-full
                 bg-gradient-to-r from-[#0f2027]/80 via-[#203a43]/80 to-[#2c5364]/80
                 backdrop-blur-xl
                 border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 
                      flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white cursor-pointer"
        >
          Social<span className="text-cyan-400">Hub</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center 
                        bg-black/30 border border-white/20
                        rounded-full px-4 py-2 w-96">
          <FiSearch className="text-white/70 mr-2" />
          <input
            type="text"
            placeholder="Search people, posts..."
            className="bg-transparent outline-none text-white 
                       placeholder-white/60 w-full"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">

          {/* Create Post */}
          <button
            onClick={() => navigate("/create-post")}
            className="p-2 rounded-full 
                       bg-gradient-to-r from-cyan-400 to-blue-500
                       hover:from-cyan-500 hover:to-blue-600
                       text-white shadow-md transition"
          >
            <FiPlus size={18} />
          </button>

          {/* Notifications */}
          <button
            onClick={()=>navigate("/notifications")}
            className="relative p-2 rounded-full 
                       hover:bg-white/10 transition text-white"
          >
            <FiBell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 
                             bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile-user")}
            className="w-9 h-9 rounded-full 
                       bg-gradient-to-br from-cyan-400 to-blue-600
                       flex items-center justify-center 
                       text-white font-semibold shadow-md"
          >
            A
          </button>
        </div>
      </div>
    </header>
  );
}

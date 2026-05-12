import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "./Icons"; // Replace with your actual profile icon

interface HeaderProps {
  upvotesLeft: number;
  totalDownvotes: number;
  numFavorites: number;
  skillGamesLeft: number;

  isLoggedIn: boolean;

  onLogin: () => void;
  onLogout: () => void;

  onOpenPremiumModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogin, onLogout, onOpenPremiumModal }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setMenuOpen(false);
    if (!isLoggedIn) onLogin();
    else navigate("/profile");
  };

  return (
    <header className="bg-yellow-50/90 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="text-4xl md:text-6xl font-bold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-green-500 font-playwrite"
      >
        QUILPANA
      </div>

      {/* Profile */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full hover:bg-gray-200 p-2 transition-colors"
        >
          <UserIcon className="w-8 h-8 text-gray-700" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md py-1 z-50">
            <button
              onClick={handleProfileClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {isLoggedIn ? "Profile" : "Login"}
            </button>
            {isLoggedIn && (
              <button
                onClick={() => { onLogout(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

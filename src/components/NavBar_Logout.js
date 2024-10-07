import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo_new.jpg";

const NavBar_Logout = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          {/* Logo */}
          <div className="shrink-0 cursor-pointer">
            <img
              className="h-30 w-30" width="65% !important"  // Increased height to 20, keeping the width auto
              src={logo}
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Title */}
          <div className="hidden md:block text-center flex-grow">
            <span className="text-xl font-semibold text-black">
              Empower Your Health: Secure Electronic Records at Your Fingertips
            </span>
          </div>

          {/* Logout Button */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 sm:mt-0 text-center">
            <button
              className="text-base sm:text-lg px-4 py-2 rounded-md font-medium text-black hover:bg-gray-200 transition-all duration-200"
              onClick={() => navigate("/")}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar_Logout;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    dToken && setDToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      
      {/* ===== LEFT (LOGO + ROLE) ===== */}
      <div className="flex items-center gap-4">
        
        {/* LOGO */}
        <h2 className="text-xl font-bold text-gray-800 cursor-pointer">
          Jifxe
        </h2>

        {/* ROLE BADGE */}
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>

      {/* ===== RIGHT (PROFILE + LOGOUT) ===== */}
      <div className="flex items-center gap-4">

        {/* PROFILE */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold">
            {aToken ? "A" : "D"}
          </div>
          <span className="text-sm text-gray-700 hidden sm:block">
            {aToken ? "Admin" : "Doctor"}
          </span>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
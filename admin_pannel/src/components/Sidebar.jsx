import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const linkClasses = (isActive) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
     ${
       isActive
         ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
         : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
     }`;

  return (
    <div className="min-h-screen w-64 bg-white border-r flex flex-col p-4">

      {/* ===== LOGO / TITLE ===== */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-gray-800">
          Admin Panel
        </h1>
        <p className="text-xs text-gray-400">Management System</p>
      </div>

      {/* ===== ADMIN ROUTES ===== */}
      {aToken && (
        <ul className="flex flex-col gap-2">
          
          <NavLink to="/" className={({ isActive }) => linkClasses(isActive)}>
            <img src={assets.home_icon} className="w-5 h-5" alt="" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/all-appointments" className={({ isActive }) => linkClasses(isActive)}>
            <img src={assets.appointment_icon} className="w-5 h-5" alt="" />
            <span>Appointments</span>
          </NavLink>

          <NavLink to="/add-doctor" className={({ isActive }) => linkClasses(isActive)}>
            <img src={assets.add_icon} className="w-5 h-5" alt="" />
            <span>Add Doctor</span>
          </NavLink>

          <NavLink to="/doctors-list" className={({ isActive }) => linkClasses(isActive)}>
            <img src={assets.people_icon} className="w-5 h-5" alt="" />
            <span>Doctors List</span>
          </NavLink>

        </ul>
      )}

      {/* ===== DOCTOR ROUTES ===== */}
      {dToken && (
        <ul className="flex flex-col gap-2">

          <NavLink end to="/doctor/" className={({ isActive }) => linkClasses(isActive)}>
            <img src={assets.home_icon} className="w-5 h-5" alt="" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/doctor/appointments" className={({ isActive }) => linkClasses(isActive)}>
            <img src={assets.appointment_icon} className="w-5 h-5" alt="" />
            <span>Appointments</span>
          </NavLink>

          <NavLink to="/doctor/profile" className={({ isActive }) => linkClasses(isActive)}>
            <img src={assets.people_icon} className="w-5 h-5" alt="" />
            <span>Profile</span>
          </NavLink>

        </ul>
      )}
    </div>
  );
};

export default Sidebar;
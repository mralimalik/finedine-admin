import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-gray-100 flex flex-col h-screen ">
      <h2 className="text-xl font-bold text-center py-6 border-b border-gray-700">
        Welcome, Admin
      </h2>
      <nav className="flex flex-col mt-4 space-y-2 px-4">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

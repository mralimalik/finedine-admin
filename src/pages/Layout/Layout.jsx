import React, { useContext, useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { ToastContainer } from "react-toastify";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { FaBars } from "react-icons/fa";

const Layout = () => {
  const { loading } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-full">
      <div className="max-lg:hidden">
        <Sidebar />
      </div>
      <div
        className={`responsive-sidebar lg:hidden fixed z-50 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        ref={sidebarRef}
      >
        <Sidebar />
      </div>
      <div className="min-h-screen w-full bg-slate-200 overflow-y-auto">
        <button
          className="lg:hidden p-2 bg-gray-800 text-white my-2 mx-4 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
        <Outlet />
      </div>
      <ToastContainer pauseOnHover={false} />
      <LoadingIndicator loading={loading} />
    </div>
  );
};

export default Layout;

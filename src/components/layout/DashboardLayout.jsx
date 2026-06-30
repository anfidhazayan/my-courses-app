import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Menu,
  X,
  GraduationCap,
  Sun,
  Moon
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] text-gray-900 transition-colors duration-250 dark:bg-gray-950 dark:text-gray-100">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 md:hidden transition-opacity duration-300 animate-fade-in"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#eaecef] flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen dark:bg-gray-900 dark:border-gray-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-[#eaecef] flex items-center justify-between dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-md shadow-brand-red/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900 tracking-tight dark:text-white">my-courses</span>
              <span className="block text-[10px] text-gray-400 font-medium -mt-1">LMS Platform</span>
            </div>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 md:hidden dark:hover:bg-gray-805"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          <div>
            <span className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Navigation
            </span>
            <nav className="space-y-1">
              <Link
                to="/"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-205 bg-brand-red-light text-brand-red dark:bg-brand-red/10 dark:text-brand-red group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4.5 h-4.5 text-brand-red" />
                  <span>My Courses</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#eaecef] px-4 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-500 md:hidden transition-colors dark:hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Theme Toggle in Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-850 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Dashboard Pages Content Container */}
        <main className="flex-1 p-4 md:p-8 animate-slide-in">
          {children}
        </main>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import CourseCard from "../components/course/CourseCard";
import ErrorMessage from "../components/course/common/ErrorMessage";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useCourses } from "../hooks/useCourses";
import { useMaterials } from "../hooks/useMaterials";
import { useFaculty } from "../hooks/useFaculty";
import { useLiveClasses } from "../hooks/useLiveClasses";
import { useAssignments } from "../hooks/useAssignments";
import { BookOpen, Calendar, Clock, Video, Search, Heart, Award } from "lucide-react";

export default function MyCourses() {
  const { data: courses, isLoading: isCoursesLoading, error: coursesError } = useCourses();
  const { data: materials = [], isLoading: isMaterialsLoading, error: materialsError } = useMaterials();
  const { data: faculty = [], isLoading: isFacultyLoading, error: facultyError } = useFaculty();
  const { data: liveClasses = [], isLoading: isLiveClassesLoading, error: liveClassesError } = useLiveClasses();
  const { data: assignments = [], isLoading: isAssignmentsLoading, error: assignmentsError } = useAssignments();
  
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed' | 'favorites'
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const isLoading = isCoursesLoading || isMaterialsLoading || isFacultyLoading || isLiveClassesLoading || isAssignmentsLoading;
  const error = coursesError || materialsError || facultyError || liveClassesError || assignmentsError;

  // Toggle favorite helper
  const toggleFavorite = (courseId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(courseId);
      const updated = isFav ? prev.filter((id) => id !== courseId) : [...prev, courseId];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Loading skeleton screen
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          {/* Banner Skeleton */}
          <div className="h-44 bg-gray-200 rounded-2xl w-full dark:bg-gray-800" />
          
          {/* Tabs Skeleton */}
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded-xl w-32 dark:bg-gray-800" />
            <div className="h-10 bg-gray-200 rounded-xl w-32 dark:bg-gray-800" />
            <div className="h-10 bg-gray-200 rounded-xl w-32 dark:bg-gray-800" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4 dark:bg-gray-900 dark:border-gray-800">
                <div className="aspect-video bg-gray-200 rounded-xl dark:bg-gray-800" />
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 dark:bg-gray-800" />
                <div className="h-4 bg-gray-200 rounded-lg w-1/2 dark:bg-gray-800" />
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorMessage />
      </DashboardLayout>
    );
  }

  // Calculate dynamic progress & instructor info for each course based on real database records
  const coursesWithProgress = (courses || []).map((course) => {
    const courseMaterials = materials.filter((m) => m.courseId === Number(course.id));
    const completed = courseMaterials.filter((m) => m.completed).length;
    const computedProgress =
      courseMaterials.length === 0
        ? 0
        : Math.round((completed / courseMaterials.length) * 100);

    const courseFaculty = faculty.find((f) => String(f.id) === String(course.facultyId));

    return {
      ...course,
      progress: computedProgress,
      instructorName: courseFaculty?.name || "Expert Faculty",
      instructorRating: courseFaculty?.rating || "4.8"
    };
  });

  // Calculate overall platform stats dynamically matching prompt values
  const totalCoursesCount = coursesWithProgress.length;
  const completedMaterialsCount = materials.filter((m) => m.completed).length;
  const pendingAssignmentsCount = assignments.filter((a) => a.status?.toLowerCase() === "pending").length;
  const upcomingClassesCount = liveClasses.filter((c) => c.status?.toLowerCase() === "upcoming").length;

  // Filter next live class at the top
  const upcomingLiveClasses = liveClasses.filter((c) => c.status?.toLowerCase() === "upcoming");
  const sortedClasses = [...upcomingLiveClasses].sort((a, b) => new Date(a.date) - new Date(b.date));
  const nextLiveClass = sortedClasses[0];
  const nextClassCourse = nextLiveClass ? coursesWithProgress.find(c => Number(c.id) === nextLiveClass.courseId) : null;

  // Filter courses based on calculated progress & searches & favorites
  const activeCourses = coursesWithProgress.filter((c) => c.progress > 0 && c.progress < 100);
  const completedCourses = coursesWithProgress.filter((c) => c.progress === 100);

  const searchedCourses = coursesWithProgress.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCourses = searchedCourses.filter((course) => {
    if (filter === "active") return course.progress > 0 && course.progress < 100;
    if (filter === "completed") return course.progress === 100;
    if (filter === "favorites") return favorites.includes(course.id);
    return true;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Section Layout: Banner (Left 2/3) & Next Live Class Card (Right 1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Banner / Hero Section */}
          <div className="lg:col-span-2 relative overflow-hidden bg-[#fff0f0] border border-[#fcdede] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs dark:bg-red-950/20 dark:border-red-900/30">
            <div className="space-y-2 z-10">
              <span className="text-[10px] font-extrabold text-brand-red uppercase tracking-widest bg-brand-red-light px-2.5 py-1 rounded-md border border-brand-red/10 dark:bg-brand-red/20 dark:border-brand-red/30">
                LEARNING PORTAL
              </span>
              <h1 className="text-3xl font-extrabold text-brand-red tracking-tight pt-2 dark:text-red-400">
                MY COURSES
              </h1>
              <p className="text-gray-600 text-sm font-medium dark:text-gray-300">
                Welcome back! Ready for your next class?
              </p>
            </div>
            
            {/* Dynamic Dashboard Stats Grid */}
            <div className="grid grid-cols-4 gap-2 md:gap-4 bg-white/80 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/80 shadow-xs z-10 w-full mt-6 dark:bg-gray-900/80 dark:border-gray-800">
              <div className="text-center">
                <span className="block text-lg font-bold text-gray-900 dark:text-white">{totalCoursesCount}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Courses</span>
              </div>
              <div className="text-center border-l border-gray-150 pl-2 dark:border-gray-800">
                <span className="block text-lg font-bold text-gray-900 dark:text-white">{completedMaterialsCount}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight font-medium">Completed</span>
              </div>
              <div className="text-center border-l border-gray-150 pl-2 dark:border-gray-800">
                <span className="block text-lg font-bold text-gray-900 dark:text-white">{pendingAssignmentsCount}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Pending</span>
              </div>
              <div className="text-center border-l border-gray-150 pl-2 dark:border-gray-800">
                <span className="block text-lg font-bold text-gray-900 dark:text-white">{upcomingClassesCount}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Live Sessions</span>
              </div>
            </div>

            {/* Decorative Vector */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-brand-red">
                <circle cx="90" cy="50" r="40" />
              </svg>
            </div>
          </div>

          {/* 🔔 Upcoming Classes Card */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between shadow-xs dark:bg-gray-900 dark:border-gray-800">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Next Live Class</span>
                </div>
              </div>

              {nextLiveClass ? (
                <div className="mt-4 space-y-3.5">
                  <div>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md dark:bg-blue-900/20 dark:text-blue-400">
                      {nextClassCourse?.title || "Upcoming Class"}
                    </span>
                    <h3 className="text-sm font-extrabold text-gray-900 mt-2 line-clamp-1 dark:text-white">
                      {nextLiveClass.topic}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{nextLiveClass.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{nextLiveClass.time} ({nextLiveClass.duration})</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center text-xs text-gray-400 py-6">
                  No upcoming classes scheduled.
                </div>
              )}
            </div>

            {nextLiveClass && (
              <a
                href={nextLiveClass.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Join Live Class</span>
              </a>
            )}
          </div>
        </div>

        {/* Filters, Search and Search Bar Container */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-150 pb-5 dark:border-gray-800">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                filter === "all"
                  ? "bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/10"
                  : "bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-850"
              }`}
            >
              All Courses ({coursesWithProgress.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                filter === "active"
                  ? "bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/10"
                  : "bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-850"
              }`}
            >
              Active ({activeCourses.length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                filter === "completed"
                  ? "bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/10"
                  : "bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-850"
              }`}
            >
              Completed ({completedCourses.length})
            </button>
            <button
              onClick={() => setFilter("favorites")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border flex items-center gap-1.5 ${
                filter === "favorites"
                  ? "bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/10"
                  : "bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-850"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${filter === "favorites" ? "fill-white text-white" : "text-gray-400"}`} />
              <span>Favorites ({favorites.length})</span>
            </button>
          </div>

          {/* 🔍 Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs placeholder-gray-400 focus:outline-none focus:border-brand-red/30 focus:ring-2 focus:ring-brand-red/5 transition-all dark:bg-gray-850 dark:border-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Courses Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 p-8 dark:bg-gray-900 dark:border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 mx-auto mb-4 border border-gray-100 dark:bg-gray-850 dark:border-gray-800">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-850 dark:text-gray-200">No courses found</h3>
            <p className="text-xs text-gray-400 mt-1">Try modifying your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isFavorited={favorites.includes(course.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
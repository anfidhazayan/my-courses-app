import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Star, ArrowRight, Heart } from "lucide-react";

export default function CourseCard({ course, isFavorited, onToggleFavorite }) {
  // Determine course category dynamically based on the title
  const getCategory = (title) => {
    const t = title?.toLowerCase() || "";
    if (t.includes("ai") || t.includes("artificial")) return "Artificial Intelligence";
    if (t.includes("react") || t.includes("web") || t.includes("frontend")) return "Web Development";
    if (t.includes("learning") || t.includes("machine") || t.includes("data science")) return "Data Science";
    if (t.includes("structure") || t.includes("algorithm") || t.includes("dsa")) return "Computer Science";
    return "Software Engineering";
  };

  // Assign beautiful dummy images based on the course topic
  const getDummyImage = (title) => {
    const t = title?.toLowerCase() || "";
    if (t.includes("ai") || t.includes("artificial")) {
      return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600";
    }
    if (t.includes("react") || t.includes("web") || t.includes("frontend")) {
      return "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600";
    }
    if (t.includes("learning") || t.includes("machine")) {
      return "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=600";
    }
    if (t.includes("structure") || t.includes("algorithm") || t.includes("dsa")) {
      return "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600";
    }
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600";
  };

  const category = getCategory(course.title);
  const rating = course.instructorRating || "4.8";
  const instructorName = course.instructorName || "Instructor";
  const thumbnail = getDummyImage(course.title);

  return (
    <div className="group bg-white rounded-2xl border border-gray-150 overflow-hidden hover:shadow-xl hover:shadow-gray-250/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full dark:bg-gray-900 dark:border-gray-800 dark:hover:shadow-black/20">
      {/* Thumbnail area with overlays */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-850">
        <img
          src={thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-lg border shadow-sm bg-brand-red-light text-brand-red border-brand-red/10 dark:bg-brand-red/10 dark:text-brand-red dark:border-brand-red/20">
          {category}
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(course.id);
          }}
          className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-xs rounded-lg border border-gray-100 text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer dark:bg-gray-900/90 dark:border-gray-800"
          title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? "text-red-500 fill-red-500" : "text-gray-400 dark:text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* Course details container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-brand-red transition-colors line-clamp-1 dark:text-white">
            {course.title}
          </h3>

          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2 dark:text-gray-400">
            {course.description || "Learn and master industry-standard skills with expert faculty instruction and live project reviews."}
          </p>

          {/* Instructor & Rating Row (No Overlap) */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold truncate max-w-[130px]">{instructorName}</span>
            <span className="flex items-center gap-1 text-[10px] font-extrabold text-amber-700 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400 px-2 py-0.5 rounded-lg border border-amber-100 dark:border-amber-900/30 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </span>
          </div>
        </div>

        {/* Dynamic Progress info */}
        <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-2 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              <span>Progress</span>
            </span>
            <span className="font-bold text-gray-800 dark:text-gray-200">{course.progress}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden dark:bg-gray-800">
            <div
              className="bg-gradient-to-r from-pink-500 to-brand-red h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${course.progress}%`,
              }}
            />
          </div>
        </div>

        {/* Action Link button */}
        <div className="mt-5">
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-50 group-hover:bg-brand-red text-gray-700 group-hover:text-white text-xs font-semibold rounded-xl transition-all duration-350 border border-gray-100 group-hover:border-brand-red hover:shadow-md cursor-pointer dark:bg-gray-850 dark:border-gray-800 dark:text-gray-300 dark:group-hover:bg-brand-red dark:group-hover:border-brand-red dark:group-hover:text-white"
          >
            <span>View Course</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
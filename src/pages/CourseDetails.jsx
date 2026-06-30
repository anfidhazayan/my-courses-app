import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Video,
  FileText,
  Code,
  FileSpreadsheet,
  CheckCircle2,
  Mail,
  Star,
  VideoOff
} from "lucide-react";

import { useCourse } from "../hooks/useCourse";
import { useMaterials } from "../hooks/useMaterials";
import { useAssignments } from "../hooks/useAssignments";
import { useFaculty } from "../hooks/useFaculty";
import { useLiveClasses } from "../hooks/useLiveClasses";
import { useUpdateMaterial } from "../hooks/useUpdatMaterial";
import ErrorMessage from "../components/course/common/ErrorMessage";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function CourseDetails() {
  const { courseId } = useParams();

  const { data: course, isLoading, error } = useCourse(courseId);
  const { data: materials = [] } = useMaterials();
  const { data: assignments = [] } = useAssignments();
  const { data: faculty = [] } = useFaculty();
  const { data: liveClasses = [] } = useLiveClasses();
  const updateMaterial = useUpdateMaterial();

  // Assign beautiful dummy images based on the course topic (using fully active URLs)
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

  // Loading skeleton screen
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-250 rounded-full dark:bg-gray-800" />
            <div className="h-6 bg-gray-250 rounded-md w-48 dark:bg-gray-800" />
          </div>
          <div className="h-28 bg-gray-250 rounded-2xl w-full dark:bg-gray-800" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-48 bg-gray-250 rounded-2xl dark:bg-gray-800" />
              <div className="h-48 bg-gray-250 rounded-2xl dark:bg-gray-800" />
            </div>
            <div className="space-y-6">
              <div className="h-40 bg-gray-250 rounded-2xl dark:bg-gray-800" />
              <div className="h-64 bg-gray-250 rounded-2xl dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !course) {
    return (
      <DashboardLayout>
        <ErrorMessage />
      </DashboardLayout>
    );
  }

  // Filter & calculate data
  const courseMaterials = materials.filter(
    (material) => material.courseId === Number(courseId)
  );
  
  const completedMaterials = courseMaterials.filter(
    (material) => material.completed
  ).length;

  const progress =
    courseMaterials.length === 0
      ? 0
      : Math.round((completedMaterials / courseMaterials.length) * 100);

  // Loose comparison because db has string IDs for faculty but numeric IDs for course.facultyId
  const courseFaculty = faculty.find(
    (f) => String(f.id) === String(course.facultyId)
  );

  const courseAssignments = assignments.filter(
    (assignment) => assignment.courseId === Number(courseId)
  );

  const courseLiveClasses = liveClasses.filter(
    (liveClass) => liveClass.courseId === Number(courseId)
  );

  const thumbnail = getDummyImage(course.title);

  // Helper function to return icon for study materials
  const getMaterialIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "video":
        return <Video className="w-4 h-4 text-purple-500" />;
      case "pdf":
        return <FileText className="w-4 h-4 text-rose-500" />;
      case "article":
        return <FileSpreadsheet className="w-4 h-4 text-blue-500" />;
      case "lab exercise":
      case "lab":
        return <Code className="w-4 h-4 text-emerald-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium dark:text-gray-500">
            <Link to="/" className="hover:text-brand-red hover:underline transition-colors">
              My Courses
            </Link>
            <span>/</span>
            <span className="text-gray-600 font-semibold truncate dark:text-gray-305">{course.title}</span>
          </div>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors w-fit group dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Hero Section Banner */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-xs dark:bg-gray-900 dark:border-gray-800">
          <img
            src={thumbnail}
            alt={course.title}
            className="w-full md:w-56 aspect-video object-cover rounded-xl border border-gray-100 shadow-sm dark:border-gray-800"
          />
          <div className="flex-1 space-y-3 text-center md:text-left">
            <span className="text-[10px] font-extrabold text-brand-red uppercase tracking-wider bg-brand-red-light px-2.5 py-1 rounded-md border border-brand-red/10 dark:bg-brand-red/10 dark:text-brand-red dark:border-brand-red/20">
              Active Course
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight dark:text-white">
              {course.title}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl dark:text-gray-400">
              {course.description || "Learn and master industry-standard skills with expert faculty instruction and live project reviews."}
            </p>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Progress Card */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs dark:bg-gray-900 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Your Learning Progress</h3>
                  <p className="text-xs text-gray-400 mt-0.5 dark:text-gray-500">
                    Complete all study modules to get your final certificate.
                  </p>
                </div>
                <span className="text-2xl font-extrabold text-brand-red self-start sm:self-auto dark:text-red-400">
                  {progress}% <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Done</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden dark:bg-gray-800">
                <div
                  className="bg-gradient-to-r from-pink-500 to-brand-red h-3.5 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-405">
                <span>{completedMaterials} of {courseMaterials.length} modules completed</span>
                {progress === 100 && (
                  <span className="flex items-center gap-1 text-emerald-600 font-bold dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-50 text-emerald-600 dark:fill-emerald-950/20 dark:text-emerald-400" />
                    <span>Course Completed!</span>
                  </span>
                )}
              </div>
            </div>

            {/* Study Materials Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 dark:text-white">
                  <span>📚 Study Materials</span>
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md dark:bg-gray-800 dark:text-gray-400">
                    {courseMaterials.length}
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {courseMaterials.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50/55 rounded-2xl border border-dashed border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
                    <p className="text-sm text-gray-400">No study materials available yet.</p>
                  </div>
                ) : (
                  courseMaterials.map((material) => (
                    <div
                      key={material.id}
                      className={`flex items-center justify-between bg-white border rounded-xl p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-xs group dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-700 ${
                        material.completed ? "border-emerald-100 bg-emerald-50/5 dark:border-emerald-900/20" : "border-gray-150"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Type Icon Box */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-inner dark:border-gray-850 ${
                          material.completed 
                            ? "bg-emerald-50 border-emerald-150 dark:bg-emerald-950/20 dark:border-emerald-900/30" 
                            : "bg-gray-50 border-gray-100 dark:bg-gray-850 dark:border-gray-800"
                        }`}>
                          {getMaterialIcon(material.type)}
                        </div>

                        <div>
                          <h4 className={`text-sm font-bold transition-colors ${
                            material.completed ? "text-gray-500 line-through font-medium" : "text-gray-900 dark:text-white"
                          }`}>
                            {material.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5 dark:text-gray-500">
                            <span className="font-semibold uppercase text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-md text-gray-500 dark:bg-gray-850 dark:text-gray-400">
                              {material.type}
                            </span>
                            <span>•</span>
                            <span>{material.duration || "10 min read"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Custom Checkbox Input with Mutate Call */}
                      <label className="flex items-center justify-center p-1.5 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <input
                          type="checkbox"
                          checked={material.completed}
                          onChange={() =>
                            updateMaterial.mutate({
                              id: material.id,
                              completed: !material.completed,
                            })
                          }
                          className="w-5 h-5 rounded-lg text-emerald-500 border-gray-300 focus:ring-emerald-400 cursor-pointer dark:border-gray-700 dark:bg-gray-800"
                        />
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Assignments Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 dark:text-white">
                <span>📝 Assignments</span>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md dark:bg-gray-800 dark:text-gray-400">
                  {courseAssignments.length}
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseAssignments.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50/55 rounded-2xl border border-dashed border-gray-200 col-span-2 dark:bg-gray-900/50 dark:border-gray-800">
                    <p className="text-xs text-gray-400">No assignments posted for this course.</p>
                  </div>
                ) : (
                  courseAssignments.map((assignment) => {
                    const isPending = assignment.status?.toLowerCase() === "pending";
                    const isSubmitted = assignment.status?.toLowerCase() === "submitted" || assignment.status?.toLowerCase() === "completed";

                    return (
                      <div
                        key={assignment.id}
                        className="bg-white rounded-2xl border border-gray-150 p-5 flex flex-col justify-between hover:shadow-xs transition-shadow duration-200 dark:bg-gray-900 dark:border-gray-800"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1 dark:text-white">
                              {assignment.title}
                            </h4>
                            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-lg border uppercase tracking-wider ${
                              isSubmitted
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-900/30"
                                : "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-450 dark:border-amber-900/30"
                            }`}>
                              {assignment.status}
                            </span>
                          </div>

                          <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2 dark:text-gray-400">
                            {assignment.description || "Submit your completed project files before the deadline for evaluation."}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-gray-100 text-xs dark:border-gray-800">
                          <span className="flex items-center gap-1.5 text-gray-400 font-medium dark:text-gray-500">
                            <Calendar className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                            <span>Due: {assignment.dueDate}</span>
                          </span>
                          
                          {assignment.totalMarks && (
                            <span className="font-semibold text-gray-500 dark:text-gray-450">
                              {assignment.totalMarks} Marks
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Live Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 dark:text-white">
                <span>🎥 Live Classes</span>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md dark:bg-gray-800 dark:text-gray-400">
                  {courseLiveClasses.length}
                </span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {courseLiveClasses.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50/55 rounded-2xl border border-dashed border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
                    <p className="text-xs text-gray-400">No live classes scheduled.</p>
                  </div>
                ) : (
                  courseLiveClasses.map((liveClass) => {
                    const isCompleted = liveClass.status?.toLowerCase() === "completed";

                    return (
                      <div
                        key={liveClass.id}
                        className={`bg-white rounded-xl border border-gray-150 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-xs transition-shadow dark:bg-gray-900 dark:border-gray-800 ${
                          isCompleted ? "opacity-75" : ""
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                              {liveClass.topic}
                            </h4>
                            <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider flex items-center gap-1 ${
                              isCompleted
                                ? "bg-gray-100 text-gray-500 border border-gray-250 dark:bg-gray-850 dark:text-gray-400 dark:border-gray-800"
                                : "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
                            }`}>
                              {!isCompleted && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                              {liveClass.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{liveClass.date}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{liveClass.time} ({liveClass.duration})</span>
                            </span>
                          </div>
                        </div>

                        {/* Meeting Join Button */}
                        {isCompleted ? (
                          <button
                            disabled
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-400 text-xs font-semibold rounded-lg border border-gray-200 cursor-not-allowed dark:bg-gray-850 dark:border-gray-800 dark:text-gray-500"
                          >
                            <VideoOff className="w-3.5 h-3.5" />
                            <span>Class Finished</span>
                          </button>
                        ) : (
                          <a
                            href={liveClass.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-red hover:bg-brand-red-dark text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Join Class</span>
                          </a>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Columns (Right) */}
          <div className="space-y-6">
            
            {/* Faculty Section Card */}
            {courseFaculty && (
              <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs dark:bg-gray-900 dark:border-gray-800">
                <div className="bg-gradient-to-br from-brand-red-light to-red-50/50 p-6 border-b border-gray-150 text-center dark:from-red-950/20 dark:to-transparent dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 text-base dark:text-white">{courseFaculty.name}</h4>
                  <p className="text-xs text-brand-red font-medium mt-0.5 dark:text-red-400">
                    {courseFaculty.designation}
                  </p>
                  
                  {/* Rating Badge */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-gray-100 rounded-md text-[10px] font-bold text-gray-700 shadow-2xs mt-3 dark:bg-gray-850 dark:border-gray-800 dark:text-gray-300">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{courseFaculty.rating} Instructor Rating</span>
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Mail Contact */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 shadow-inner dark:bg-gray-850 dark:border-gray-800 dark:text-gray-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider dark:text-gray-500">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${courseFaculty.email}`}
                        className="text-xs font-semibold text-gray-700 hover:text-brand-red transition-colors block truncate dark:text-gray-300 dark:hover:text-brand-red"
                      >
                        {courseFaculty.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats Summary Widget */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs space-y-4 dark:bg-gray-900 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 text-sm dark:text-white">Course Overview</h4>
              
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-center dark:bg-gray-850 dark:border-gray-800">
                  <span className="block text-lg font-extrabold text-gray-800 dark:text-white">
                    {courseMaterials.length}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider dark:text-gray-500">
                    Total Modules
                  </span>
                </div>

                <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-center dark:bg-gray-850 dark:border-gray-800">
                  <span className="block text-lg font-extrabold text-gray-800 dark:text-white">
                    {courseAssignments.length}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider dark:text-gray-500">
                    Assignments
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-2 dark:border-gray-800">
                <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>Course ID:</span>
                  <span className="text-gray-800 font-semibold dark:text-gray-250">#{courseId}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>Syllabus Status:</span>
                  <span className="text-emerald-600 font-bold dark:text-emerald-450">100% Verified</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
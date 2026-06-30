import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-4">
        {course.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {course.description}
      </p>

      <div className="mt-4">

        <div className="flex justify-between mb-2">

          <span>Progress</span>

          <span>{course.progress}%</span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">

          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{
              width: `${course.progress}%`,
            }}
          />

        </div>

      </div>

      <Link
        to={`/courses/${course.id}`}
        className="inline-block mt-6 text-indigo-600 font-semibold"
      >
        View Course →
      </Link>

    </div>
  );
}
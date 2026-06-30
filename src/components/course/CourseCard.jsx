import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {course.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {course.description}
        </p>

        <div className="mt-5">

          <div className="flex justify-between text-sm mb-2">
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
          className="mt-6 inline-block text-indigo-600 font-semibold hover:underline"
        >
          View Course →
        </Link>

      </div>
    </div>
  );
}
import { useParams } from "react-router-dom";

import { useCourse } from "../hooks/useCourse";
import { useMaterials } from "../hooks/useMaterials";
import { useAssignments } from "../hooks/useAssignments";
import { useFaculty } from "../hooks/useFaculty";
import { useLiveClasses } from "../hooks/useLiveClasses";
import { useUpdateMaterial } from "../hooks/useUpdatMaterial";
export default function CourseDetails() {

  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    error,
  } = useCourse(courseId);

  const { data: materials = [] } = useMaterials();
  const { data: assignments = [] } = useAssignments();
  const { data: faculty = [] } = useFaculty();
  const { data: liveClasses = [] } = useLiveClasses();
  const courseMaterials = materials.filter(
  (material) => material.courseId === Number(courseId)
);
const completedMaterials = courseMaterials.filter(
  (material) => material.completed
).length;

const progress =
  courseMaterials.length === 0
    ? 0
    : Math.round(
        (completedMaterials / courseMaterials.length) * 100
      );
      const courseFaculty = faculty.find(
  (f) => f.id === course.facultyId
);
const updateMaterial = useUpdateMaterial();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong.</h1>;

  console.log(course);
  console.log(materials);
const courseAssignments = assignments.filter(
  (assignment) => assignment.courseId === Number(courseId)
);
const courseLiveClasses = liveClasses.filter(
  (liveClass) => liveClass.courseId === Number(courseId)
);
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        {course.title}
      </h1>
      <div className="mt-8">

  <div className="flex justify-between mb-2">

    <span className="font-semibold">
      Course Progress
    </span>

    <span>
      {progress}%
    </span>

  </div>

  <div className="w-full bg-gray-200 rounded-full h-3">

    <div
      className="bg-green-500 h-3 rounded-full transition-all duration-500"
      style={{
        width: `${progress}%`,
      }}
    />

  </div>

</div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
   Study Materials
</h2>

<div className="space-y-4">

  {courseMaterials.map((material) => (

    <div
      key={material.id}
      className="flex justify-between items-center bg-white rounded-lg shadow p-4"
    >

      <div>

        <h3 className="font-semibold">
          {material.title}
        </h3>

        <p className="text-gray-500 text-sm">
          {material.type}
        </p>

      </div>
<input
  type="checkbox"
  checked={material.completed}
  onChange={() =>
    updateMaterial.mutate({
      id: material.id,
      completed: !material.completed,
    })
  }
/>

    </div>

  ))}

</div>

      <p className="mt-3 text-gray-600">
        {course.description}
      </p>
<div className="mt-10">

  <h2 className="text-2xl font-semibold mb-4">
     Faculty
  </h2>

  {courseFaculty && (

    <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">

      <img
        src={courseFaculty.avatar}
        alt={courseFaculty.name}
        className="w-16 h-16 rounded-full"
      />

      <div>

        <h3 className="font-bold">
          {courseFaculty.name}
        </h3>

        <p className="text-gray-500">
          {courseFaculty.designation}
        </p>

        <p className="text-yellow-500">
           {courseFaculty.rating}
        </p>

      </div>

    </div>

  )}

</div>
<div className="mt-10">

  <h2 className="text-2xl font-semibold mb-4">
    Assignments
  </h2>

  <div className="space-y-4">

    {courseAssignments.map((assignment) => (

      <div
        key={assignment.id}
        className="bg-white rounded-lg shadow p-4"
      >

        <h3 className="font-bold">
          {assignment.title}
        </h3>

        <p className="text-gray-500">
          {assignment.description}
        </p>

        <div className="flex justify-between mt-3">

          <span>
            Due: {assignment.dueDate}
          </span>

          <span className="font-semibold text-blue-600">
            {assignment.status}
          </span>

        </div>

      </div>

    ))}

  </div>

</div>
<div className="mt-10">

  <h2 className="text-2xl font-semibold mb-4">
    git add <div className=""></div> Live Classes
  </h2>

  <div className="space-y-4">

    {courseLiveClasses.map((liveClass) => (

      <div
        key={liveClass.id}
        className="bg-white rounded-lg shadow p-4"
      >

        <h3 className="font-bold">
          {liveClass.topic}
        </h3>

        <p className="text-gray-500">
          {liveClass.date} • {liveClass.time}
        </p>

        <a
          href={liveClass.meetingLink}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 font-semibold"
        >
          Join Class →
        </a>

      </div>

    ))}

  </div>

</div>
    </div>
    
  );
}
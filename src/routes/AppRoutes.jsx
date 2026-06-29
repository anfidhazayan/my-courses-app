import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCourses from "../pages/MyCourses";
import CourseDetails from "../pages/CourseDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyCourses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
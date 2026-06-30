import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../services/courseService";

export const useCourse = (courseId) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourse(courseId),
    enabled: !!courseId,
  });
};
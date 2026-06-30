import { useQuery } from "@tanstack/react-query";
import { getFaculty } from "../services/facultyServices";

export const useFaculty = () => {
  return useQuery({
    queryKey: ["faculty"],
    queryFn: getFaculty,
  });
};
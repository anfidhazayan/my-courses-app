import { useQuery } from "@tanstack/react-query";
import { getAssignments } from "../services/assignmentsServices";

export const useAssignments = () => {
  return useQuery({
    queryKey: ["assignments"],
    queryFn: getAssignments,
  });
};
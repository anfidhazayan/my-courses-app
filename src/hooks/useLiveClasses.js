import { useQuery } from "@tanstack/react-query";
import { getLiveClasses } from "../services/liveClassServices";

export const useLiveClasses = () => {
  return useQuery({
    queryKey: ["liveClasses"],
    queryFn: getLiveClasses,
  });
};
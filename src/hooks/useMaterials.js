import { useQuery } from "@tanstack/react-query";
import { getMaterials } from "../services/materialServices";

export const useMaterials = () => {
  return useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });
};
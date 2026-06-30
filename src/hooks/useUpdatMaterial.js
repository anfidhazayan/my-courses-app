import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMaterial } from "../services/materialServices";

export const useUpdateMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }) =>
      updateMaterial(id, completed),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["materials"],
      });
    },
  });
};
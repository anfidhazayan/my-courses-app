import api from "./api";

export const getMaterials = async () => {
  const response = await api.get("/materials");
  return response.data;
};
export const updateMaterial = async (id, completed) => {
  const response = await api.patch(`/materials/${id}`, {
    completed,
  });

  return response.data;
};
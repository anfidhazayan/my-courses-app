import api from "./api";

export const getAssignments = async () => {
  const response = await api.get("/assignments");
  return response.data;
};
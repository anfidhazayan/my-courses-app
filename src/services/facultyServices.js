import api from "./api";

export const getFaculty = async () => {
  const response = await api.get("/faculty");
  return response.data;
};
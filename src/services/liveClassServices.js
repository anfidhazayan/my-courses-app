import api from "./api";

export const getLiveClasses = async () => {
  const response = await api.get("/liveClasses");
  return response.data;
};
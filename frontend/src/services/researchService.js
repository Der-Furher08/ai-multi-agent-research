import api from "./api";

export const startResearch = async (topic) => {
  const response = await api.post("/research", {
    topic,
  });

  return response.data;
};
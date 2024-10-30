import axios from "./axios-customize";

export const readTools = () => {
  return axios.get(`/api/v1/tools`);
}

export const createTool = (newTool) => {
  return axios.post(`/api/v1/tools`, newTool)
}

export const updateTool = (toolId, updatedTool) => {
  return axios.put(`/api/v1/tools/${toolId}`, updatedTool);
}

export const deleteTool = (toolId) => {
  return axios.delete(`/api/v1/tools/${toolId}`);
}

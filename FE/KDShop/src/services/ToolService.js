import axios from "./axios-customize";

export const readTools = async () => {
  const res = await axios.get(`/api/v1/tools`);
  return res?.data;
}

export const createTool = async (newTool) => {
  const res = await axios.post(`/api/v1/tools`, newTool);
  return res?.data;
}

export const updateTool = async (toolId, updatedTool) => {
  const res = await axios.put(`/api/v1/tools/${toolId}`, updatedTool);
  return res?.data;
}

export const deleteTool = async (toolId) => {
  const res = await axios.delete(`/api/v1/tools/${toolId}`);
  return res?.data;
}

export const getToolOfCart = async (id) => {
  const path = `/api/v1/cart-tools/tool-of-cart/${id}`;
  const res = await axios.get(path);
  // console.log(res);
  return res?.data;
}

export const callGetToolByToolId = async (id) => {
  const path = `/api/v1/tools/${id}`;
  const res = await axios.get(path);
  return res?.data;
}
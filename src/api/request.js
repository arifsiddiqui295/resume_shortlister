import api from "./api";

const request = async (method, endpoint, data = null, params = null) => {
  // console.log("endpoint:", endpoint);
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export default request;

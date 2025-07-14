import axios from "axios";

const API_BASE = "http://localhost:5000";

export const createShortUrl = async (data) => {
  return axios.post(`${API_BASE}/shorturls`, data);
};

export const getUrlStats = async (shortcode) => {
  return axios.get(`${API_BASE}/shorturls/${shortcode}`);
};

export const fetchAllUrls = async () => {
  const response = await axios.get(`${API_BASE}/shorturls`);
  return response.data;
};
export const fetchAllStats = async () => {
  return axios.get("http://localhost:5000/shorturls");
};

import axios from "axios";

// ✅ Live Backend URL
const API = axios.create({
  baseURL: "https://ai-mock-interview-ny3i.onrender.com/api",
});

// ✅ Token interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
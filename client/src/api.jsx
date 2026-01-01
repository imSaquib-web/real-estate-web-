import axios from "axios";

const API = axios.create({
  baseURL: "https://real-estate-web-server-teal.vercel.app/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

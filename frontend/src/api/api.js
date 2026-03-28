import axios from "axios";

const api = axios.create({
  baseURL: "https://order-management-system-6hgx.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

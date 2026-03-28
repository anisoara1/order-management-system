import api from "./api";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

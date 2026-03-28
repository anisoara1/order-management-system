import api from "../api/api";

export const getProducts = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createProduct = async (data) => {
  const token = localStorage.getItem("token");

  const res = await api.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateProduct = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await api.put(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

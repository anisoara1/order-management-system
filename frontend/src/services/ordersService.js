import api from "../api/api";

export const getOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const token = localStorage.getItem("token");

  const res = await api.put(
    `/orders/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

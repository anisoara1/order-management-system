import api from "../api/api";

export const getOrders = async () => (await api.get("/orders")).data;
export const updateOrderStatus = async (id, status) =>
  (await api.put(`/orders/${id}/status`, { status })).data;

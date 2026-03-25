import prisma from "../prisma/client.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch {
    res.status(500).json({ error: "Eroare la preluarea comenzilor" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body; // "new" | "processing" | "delivered"

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.json(order);
  } catch {
    res.status(500).json({ error: "Eroare la actualizarea statusului" });
  }
};

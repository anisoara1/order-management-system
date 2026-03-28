import express from "express";
import prisma from "../prisma/client.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const newOrders = await prisma.order.count({
      where: { status: "new" },
    });

    const revenue = await prisma.order.aggregate({
      _sum: { total: true },
    });

    const topProductsRaw = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    const topProducts = await Promise.all(
      topProductsRaw.map(async (tp) => {
        const product = await prisma.product.findUnique({
          where: { id: tp.productId },
        });
        return {
          id: product.id,
          name: product.name,
          sold: tp._sum.quantity,
        };
      }),
    );

    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const lowStockItems = await prisma.product.findMany({
      where: { stock: { lt: 5 } },
      orderBy: { stock: "asc" },
    });

    res.json({
      totalProducts,
      totalOrders,
      newOrders,
      totalRevenue: revenue._sum.total || 0,
      topProducts,
      recentOrders,
      lowStockItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard error" });
  }
});

export default router;

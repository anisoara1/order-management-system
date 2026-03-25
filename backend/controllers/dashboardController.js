import prisma from "../prisma/client.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();
    const newOrders = await prisma.order.count({ where: { status: "new" } });

    const revenueAgg = await prisma.order.aggregate({
      _sum: { total: true },
    });

    const totalProducts = await prisma.product.count();

    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lt: 5 } },
      orderBy: { stock: "asc" },
      take: 10,
    });

    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const topProducts = await prisma.product.findMany({
      orderBy: { stock: "asc" }, // fallback dacă nu ai sold
      take: 5,
    });

    // SAFE sales last 7 days (fără groupBy)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesLast7Days = await prisma.order.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      orderBy: { createdAt: "asc" },
      select: {
        createdAt: true,
        total: true,
      },
    });

    res.json({
      totalProducts,
      totalOrders,
      newOrders,
      totalRevenue: revenueAgg._sum.total || 0,
      lowStock: lowStockProducts.length,
      lowStockItems: lowStockProducts,
      recentOrders,
      topProducts,
      salesLast7Days,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Eroare la încărcarea dashboard-ului" });
  }
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const product = await prisma.product.create({
      data: { name, price: Number(price), stock: Number(stock) },
    });

    res.json(product);
  } catch {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price, stock } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: { name, price: Number(price), stock: Number(stock) },
    });

    res.json(product);
  } catch {
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({ where: { id } });

    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

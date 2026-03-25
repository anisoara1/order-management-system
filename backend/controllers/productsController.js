import prisma from "../prisma/client.js";

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Eroare la preluarea produselor" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
      },
    });

    res.status(201).json(product);
  } catch {
    res.status(500).json({ error: "Eroare la crearea produsului" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price, stock } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
      },
    });

    res.json(product);
  } catch {
    res.status(500).json({ error: "Eroare la actualizarea produsului" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({ where: { id } });

    res.json({ message: "Produs șters" });
  } catch {
    res.status(500).json({ error: "Eroare la ștergerea produsului" });
  }
};

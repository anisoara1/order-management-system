import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credențiale invalide" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Credențiale invalide" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Eroare la autentificare" });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const hashed = await bcrypt.hash("123456", 10);

    const user = await prisma.user.create({
      data: {
        email: "admin@admin.com",
        password: hashed,
      },
    });

    res.json({ message: "Admin created", user });
  } catch (err) {
    res.status(500).json({ error: "Nu s-a putut crea adminul" });
  }
};
export const deleteAdmin = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { email: "admin@admin.com" },
    });

    res.json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ error: "Nu s-a putut șterge adminul" });
  }
};
export const resetAdminPassword = async (req, res) => {
  try {
    const hashed = await bcrypt.hash("123456", 10);

    const user = await prisma.user.update({
      where: { email: "admin@admin.com" },
      data: { password: hashed },
    });

    res.json({ message: "Parola resetată", user });
  } catch (err) {
    res.status(500).json({ error: "Nu s-a putut reseta parola" });
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    await sendVerificationEmail(
      email,
      "Contul tău a fost creat și verificat cu succes!",
    );

    res.json({ message: "Cont creat cu succes!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Eroare la înregistrare" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(400).json({ error: "Email sau parolă greșită" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ error: "Email sau parolă greșită" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Eroare la login" });
  }
};

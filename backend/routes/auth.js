import express from "express";
import {
  login,
  createAdmin,
  deleteAdmin,
  resetAdminPassword,
} from "../controllers/authController.js";
import prisma from "../prisma/client.js";

const router = express.Router();

// LOGIN
router.post("/login", login);

// CREATE ADMIN
router.get("/create-admin", createAdmin);

// DELETE ADMIN
router.get("/delete-admin", deleteAdmin);

// RESET ADMIN PASSWORD
router.get("/reset-admin", resetAdminPassword);

// DEBUG ADMIN (temporar)
router.get("/debug-admin", async (req, res) => {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: "admin@admin.com" },
    });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: "Nu s-a putut obține adminul" });
  }
});

export default router;

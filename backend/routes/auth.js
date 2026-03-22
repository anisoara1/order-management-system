import express from "express";
import { register, login } from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = express.Router();

// Rute publice
router.post("/register", register);
router.post("/login", login);

// Rute protejate
router.get("/profile", auth, (req, res) => {
  res.json({ user: req.user });
});

// Rute doar pentru admin
router.get("/admin/users", auth, role(["admin"]), (req, res) => {
  res.json({ message: "Doar adminul vede asta" });
});

export default router;

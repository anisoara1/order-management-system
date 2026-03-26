import express from "express";
import {
  login,
  createAdmin,
  deleteAdmin,
  resetAdminPassword,
} from "../controllers/authController.js";

const router = express.Router();

// LOGIN
router.post("/login", login);

// CREATE ADMIN (temporar)
router.get("/create-admin", createAdmin);

router.get("/delete-admin", deleteAdmin);
router.get("/reset-admin", resetAdminPassword);

export default router;

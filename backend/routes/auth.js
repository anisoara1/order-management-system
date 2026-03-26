import express from "express";
import { login, createAdmin } from "../controllers/authController.js";

const router = express.Router();

// LOGIN
router.post("/login", login);

// CREATE ADMIN (temporar)
router.get("/create-admin", createAdmin);

export default router;

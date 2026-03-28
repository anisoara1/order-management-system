import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  res.json({ message: "Dashboard data", user: req.user });
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);
export default router;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Order Management System API is running");
});

// Import routes
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import ordersRouter from "./routes/orders.js";
import dashboardRouter from "./routes/dashboard.js";

// Register routes
app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/orders", ordersRouter);
app.use("/dashboard", dashboardRouter);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

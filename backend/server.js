import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
;

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.send("Order Management System API is running");
});

// Import routes
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import ordersRouter from "./routes/orders.js";
import dashboardRouter from "./routes/dashboard.js";
import authRouter from "./routes/auth.js"

// Register routes
app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/orders", ordersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

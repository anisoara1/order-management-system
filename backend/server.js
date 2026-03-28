import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://anisoara1.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

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
import dashboardRoutes from "./routes/dashboard.js";

// Register routes
app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/orders", ordersRouter);
app.use("/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


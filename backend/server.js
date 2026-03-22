import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Order Management System API is running");
});

// Import routes
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
console.log("Auth router loaded");
/* import customersRouter from "./routes/customers.js";
import ordersRouter from "./routes/orders.js";
 */

app.use("/products", productsRouter);
app.use("/auth", authRouter);
/*app.use("/orders", ordersRouter);
app.use("/users", usersRouter); */

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

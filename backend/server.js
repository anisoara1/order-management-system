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
/* import customersRouter from "./routes/customers.js";
import ordersRouter from "./routes/orders.js";
import usersRouter from "./routes/users.js"; */

app.use("/products", productsRouter);
/* app.use("/customers", customersRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter); */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

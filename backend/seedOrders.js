import prisma from "./client.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  // 1. Creează user admin
  const password = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "admin@admin.com",
      password: password,
    },
  });

  console.log("Admin user created");

  // 2. Curățăm comenzile vechi
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  // 3. Comenzi simulate
  const orders = [
    {
      customerName: "Ion Pop",
      customerPhone: "0745123456",
      customerAddress: "Str. Florilor 10",
      total: 149,
      status: "new",
      items: [{ productId: 1, quantity: 1, price: 149 }],
    },
    {
      customerName: "Maria Ionescu",
      customerPhone: "0722334455",
      customerAddress: "Bd. Republicii 22",
      total: 89,
      status: "processing",
      items: [{ productId: 2, quantity: 1, price: 89 }],
    },
    // ... restul comenzilor tale
  ];

  // 4. Inserăm comenzile
  for (const order of orders) {
    await prisma.order.create({
      data: {
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        total: order.total,
        status: order.status,
        items: {
          create: order.items,
        },
      },
    });
  }

  console.log("Comenzi generate cu succes!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

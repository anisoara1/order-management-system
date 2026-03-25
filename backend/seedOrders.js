import prisma from "./prisma/client.js";

const run = async () => {
  // Curățăm comenzile vechi
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  // Comenzi simulate
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
    {
      customerName: "Vasile Moldovan",
      customerPhone: "0755667788",
      customerAddress: "Str. Libertății 5",
      total: 299,
      status: "delivered",
      items: [{ productId: 3, quantity: 1, price: 299 }],
    },
    {
      customerName: "Elena Dobre",
      customerPhone: "0733445566",
      customerAddress: "Str. Mihai Viteazu 14",
      total: 118,
      status: "new",
      items: [{ productId: 4, quantity: 2, price: 59 }],
    },
    {
      customerName: "Cristian Pavel",
      customerPhone: "0766778899",
      customerAddress: "Str. Avram Iancu 3",
      total: 129,
      status: "processing",
      items: [{ productId: 5, quantity: 1, price: 129 }],
    },
    {
      customerName: "Ana Mureșan",
      customerPhone: "0744001122",
      customerAddress: "Str. Zorilor 18",
      total: 78,
      status: "delivered",
      items: [{ productId: 6, quantity: 2, price: 39 }],
    },
    {
      customerName: "Darius Popescu",
      customerPhone: "0722556677",
      customerAddress: "Str. Horea 9",
      total: 198,
      status: "new",
      items: [{ productId: 7, quantity: 2, price: 99 }],
    },
    {
      customerName: "Simona Lupu",
      customerPhone: "0755332211",
      customerAddress: "Str. Eroilor 7",
      total: 199,
      status: "processing",
      items: [{ productId: 8, quantity: 1, price: 199 }],
    },
    {
      customerName: "Mihai Radu",
      customerPhone: "0733004455",
      customerAddress: "Str. Crișan 11",
      total: 238,
      status: "delivered",
      items: [
        { productId: 1, quantity: 1, price: 149 },
        { productId: 6, quantity: 1, price: 39 },
        { productId: 4, quantity: 1, price: 59 },
      ],
    },
    {
      customerName: "Laura Stan",
      customerPhone: "0745667788",
      customerAddress: "Str. Dunării 2",
      total: 348,
      status: "new",
      items: [
        { productId: 3, quantity: 1, price: 299 },
        { productId: 6, quantity: 1, price: 39 },
        { productId: 4, quantity: 1, price: 59 },
      ],
    },
  ];

  // Inserăm comenzile
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

  console.log("Comenzi software generate cu succes!");
  process.exit();
};

run();

import prisma from "./client.js";

async function main() {
  // Produse software
  const products = [
    { name: "Visual Studio Code", price: 0, stock: 999 },
    { name: "IntelliJ IDEA Ultimate", price: 499, stock: 50 },
    { name: "Adobe Photoshop CC", price: 239, stock: 120 },
    { name: "Microsoft Office 365", price: 99, stock: 200 },
    { name: "Figma Professional", price: 144, stock: 80 },
    { name: "Slack Premium", price: 96, stock: 150 },
    { name: "Notion Plus", price: 96, stock: 300 },
    { name: "GitHub Copilot", price: 120, stock: 500 },
    { name: "Docker Pro", price: 60, stock: 100 },
    { name: "Postman Professional", price: 228, stock: 70 },
  ];

  // Creează produsele dacă nu există
  const createdProducts = [];
  for (const p of products) {
    const prod = await prisma.product.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
    createdProducts.push(prod);
  }

  // Helper pentru item
  const item = (productName, qty) => {
    const product = createdProducts.find((p) => p.name === productName);
    return {
      productId: product.id,
      quantity: qty,
      price: product.price,
    };
  };

  // Comenzi
  const orders = [
    {
      customerName: "John Doe",
      customerPhone: "0712345678",
      customerAddress: "Str. Libertății 10, București",
      status: "new",
      items: [item("GitHub Copilot", 1), item("Visual Studio Code", 1)],
    },
    {
      customerName: "Maria Popescu",
      customerPhone: "0722334455",
      customerAddress: "Str. Florilor 22, Cluj-Napoca",
      status: "processing",
      items: [item("IntelliJ IDEA Ultimate", 1)],
    },
    {
      customerName: "Alex Ionescu",
      customerPhone: "0733445566",
      customerAddress: "Str. Muncii 5, Iași",
      status: "delivered",
      items: [item("Adobe Photoshop CC", 1), item("Figma Professional", 1)],
    },
    {
      customerName: "Elena Radu",
      customerPhone: "0744556677",
      customerAddress: "Str. Dunării 18, Timișoara",
      status: "new",
      items: [item("Slack Premium", 5)],
    },
    {
      customerName: "George Mihai",
      customerPhone: "0755667788",
      customerAddress: "Str. Avram Iancu 3, Oradea",
      status: "processing",
      items: [item("Docker Pro", 2), item("Postman Professional", 1)],
    },
    {
      customerName: "Cristina Mureșan",
      customerPhone: "0766778899",
      customerAddress: "Str. Zorilor 12, Brașov",
      status: "delivered",
      items: [item("Notion Plus", 3)],
    },
    {
      customerName: "Robert Stan",
      customerPhone: "0777889900",
      customerAddress: "Str. Mihai Viteazu 7, Sibiu",
      status: "new",
      items: [item("Microsoft Office 365", 2)],
    },
    {
      customerName: "Ana Dobre",
      customerPhone: "0788990011",
      customerAddress: "Str. Crișan 9, Arad",
      status: "processing",
      items: [item("Figma Professional", 1), item("Slack Premium", 2)],
    },
    {
      customerName: "Vlad Marinescu",
      customerPhone: "0799001122",
      customerAddress: "Str. Horea 14, Alba Iulia",
      status: "delivered",
      items: [item("GitHub Copilot", 2)],
    },
    {
      customerName: "Ioana Pavel",
      customerPhone: "0700112233",
      customerAddress: "Str. Republicii 20, Satu Mare",
      status: "new",
      items: [item("Postman Professional", 1)],
    },
  ];
  // Creează comenzile
  for (const order of orders) {
    const total = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await prisma.order.create({
      data: {
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        status: order.status,
        total,
        items: { create: order.items },
      },
    });
  }

  console.log("Seed complet!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

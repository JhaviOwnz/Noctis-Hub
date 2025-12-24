// backend/prisma/seed.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // 1) Modules (idempotente por slug)
  const modules = [
    {
      name: "Front Office Refund Requests",
      slug: "refund-requests",
      description: "Manage and track guest refund requests and attachments.",
    },
    {
      name: "OE&S Planner",
      slug: "oes-planner",
      description: "Operating Equipment & Supplies categories and items for Noctis.",
    },
    // Si tenés más módulos en tu sitio, agregalos acá.
  ];

  for (const m of modules) {
    await prisma.module.upsert({
      where: { slug: m.slug },
      update: {
        name: m.name,
        description: m.description,
      },
      create: m,
    });
  }

  // 2) OE&S Categories (idempotente por key)
  // Esto es opcional pero recomendado para que el módulo tenga base.
  const oesCategories = [
    { key: "design-objects", name: "Design Objects", description: "Decor and design-related objects.", order: 10 },
    { key: "linen", name: "Linen", description: "Bed linen, towels, and related.", order: 20 },
    { key: "amenities", name: "Amenities", description: "Guest amenities and consumables.", order: 30 },
    { key: "cleaning", name: "Cleaning", description: "Cleaning tools and supplies.", order: 40 },
  ];

  for (const c of oesCategories) {
    await prisma.oesCategory.upsert({
      where: { key: c.key },
      update: {
        name: c.name,
        description: c.description,
        order: c.order,
      },
      create: c,
    });
  }

  // 3) (Opcional) No seed de OesItem por ahora
  // Mejor mantener items como data real del proyecto, no demo.

  console.log("✅ Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

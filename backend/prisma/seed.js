// backend/prisma/seed.js
import { PrismaClient } from "@prisma/client";

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
  ];

  for (const m of modules) {
    await prisma.module.upsert({
      where: { slug: m.slug },
      update: { name: m.name, description: m.description },
      create: m,
    });
  }

  // 2) OE&S Categories (idempotente por key)
  const oesCategories = [
    { key: "design-objects", name: "Design Objects", description: "Decor and design-related objects.", order: 10 },
    { key: "linen", name: "Linen", description: "Bed linen, towels, and related.", order: 20 },
    { key: "amenities", name: "Amenities", description: "Guest amenities and consumables.", order: 30 },
    { key: "cleaning", name: "Cleaning", description: "Cleaning tools and supplies.", order: 40 },
  ];

  for (const c of oesCategories) {
    await prisma.oesCategory.upsert({
      where: { key: c.key },
      update: { name: c.name, description: c.description, order: c.order },
      create: c,
    });
  }

  // 3) Role Types (idempotente por key)
  const roleTypes = [
    { key: "HSK_MANAGER", label: "HSK Manager", sortLevel: 0, colorKey: "navy" },
    { key: "SUPERVISOR", label: "Supervisor", sortLevel: 1, colorKey: "teal" },
    { key: "TEAM_LEADER", label: "Team Leader", sortLevel: 2, colorKey: "purple" },
    { key: "SENIOR_HSK", label: "Senior HSK", sortLevel: 3, colorKey: "indigo" },
    { key: "ROOM_ATTENDANT", label: "Room Attendant", sortLevel: 4, colorKey: "coral" },
    { key: "NOTE", label: "Note", sortLevel: 99, colorKey: "grey" },
  ];

  for (const r of roleTypes) {
    await prisma.roleType.upsert({
      where: { key: r.key },
      update: { label: r.label, sortLevel: r.sortLevel, colorKey: r.colorKey },
      create: r,
    });
  }

  // 4) Snapshots (CURRENT + FUTURE)
  await prisma.orgSnapshot.upsert({
    where: { type: "CURRENT" },
    update: { name: "Current Housekeeping Structure", isActive: true },
    create: { name: "Current Housekeeping Structure", type: "CURRENT", isActive: true },
  });

  await prisma.orgSnapshot.upsert({
    where: { type: "FUTURE" },
    update: { name: "Future Proposal Structure", isActive: false },
    create: { name: "Future Proposal Structure", type: "FUTURE", isActive: false },
  });

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

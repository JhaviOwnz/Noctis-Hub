import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/org/snapshots
 * Lista todos los snapshots (CURRENT / FUTURE)
 */
router.get("/snapshots", async (req, res) => {
  try {
    const snapshots = await prisma.orgSnapshot.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.json(snapshots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch snapshots" });
  }
});

/**
 * GET /api/org/snapshots/:type
 * Devuelve un snapshot + slots + relaciones
 */
router.get("/snapshots/:type", async (req, res) => {
  const { type } = req.params;

  try {
    const snapshot = await prisma.orgSnapshot.findUnique({
      where: { type },
      include: {
        slots: {
          include: {
            roleType: true,
            employee: true,
          },
          orderBy: [
            { roleType: { sortLevel: "asc" } },
            { orderIndex: "asc" },
          ],
        },
      },
    });

    if (!snapshot) {
      return res.status(404).json({ error: "Snapshot not found" });
    }

    res.json(snapshot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch org structure" });
  }
});

export default router;

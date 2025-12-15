// Backend for Noctis Ops Hub
// Exposes APIs for OE&S planner and Refunds module.

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");



const app = express();
const prisma = new PrismaClient();

// ---------- MIDDLEWARE GLOBAL ----------
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (html/css/js) desde /public
app.use(express.static(path.join(__dirname, "..", "public")));

// Asegurarse de que existe la carpeta de uploads
const uploadsRoot = path.join(__dirname, "..", "uploads", "refunds");
fs.mkdirSync(uploadsRoot, { recursive: true });

// Configuración de multer para adjuntos de refunds
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadsRoot),
  filename: (_, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({ storage });

// ---------- RUTAS BÁSICAS ----------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Placeholder para módulos
app.get("/api/modules", async (req, res) => {
  res.json([]);
});

// ---------- OE&S DOCUMENT API ----------

app.get("/api/oes-docs/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const doc = await prisma.oesDocument.findUnique({
      where: { key },
    });

    if (!doc) {
      return res.json({ key, data: null });
    }

    let parsed = null;
    try {
      parsed = JSON.parse(doc.data);
    } catch (e) {
      console.warn("Could not parse stored JSON for", key, e);
    }

    res.json({ key: doc.key, data: parsed });
  } catch (err) {
    console.error("GET /api/oes-docs error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/oes-docs/:key", async (req, res) => {
  const { key } = req.params;
  const { data } = req.body;

  if (!data || typeof data !== "object") {
    return res.status(400).json({ error: "Invalid data payload" });
  }

  const jsonString = JSON.stringify(data);

  try {
    const doc = await prisma.oesDocument.upsert({
      where: { key },
      update: { data: jsonString },
      create: { key, data: jsonString },
    });

    res.json({ key: doc.key, updatedAt: doc.updatedAt });
  } catch (err) {
    console.error("PUT /api/oes-docs error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ===== OE&S API =====

// Devuelve todas las categorías con sus ítems
app.get("/api/oes/sections", async (req, res) => {
  try {
    const sections = await prisma.oesCategory.findMany({
      orderBy: { order: "asc" },
      include: { items: { orderBy: { id: "asc" } } },
    });
    res.json(sections);
  } catch (err) {
    console.error("Error fetching OE&S sections", err);
    res.status(500).json({ error: "Failed to load OE&S data" });
  }
});

// Guarda completamente una sección (sobrescribe los ítems de esa sección)
app.post("/api/oes/save-section", async (req, res) => {
  try {
    const { key, name, rows } = req.body;
    if (!key || !Array.isArray(rows)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // Aseguramos que exista la categoría
    const category = await prisma.oesCategory.upsert({
      where: { key },
      update: { name: name || key },
      create: { key, name: name || key },
    });

    // Borramos ítems anteriores de esa categoría
    await prisma.oesItem.deleteMany({
      where: { categoryId: category.id },
    });

    // Insertamos los nuevos
    if (rows.length > 0) {
      await prisma.oesItem.createMany({
        data: rows.map((row) => ({
          categoryId: category.id,
          item: row.item || "",
          who: row.who || "",
          notes: row.notes || "",
          ideas: row.ideas || "",
          finalised: !!row.finalised,
        })),
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Error saving OE&S section", err);
    res.status(500).json({ error: "Failed to save OE&S section" });
  }
});

// ---------- REFUNDS API ----------

// Listar refunds
app.get("/api/refunds", async (req, res) => {
  try {
    const refunds = await prisma.refundRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(refunds);
  } catch (err) {
    console.error("GET /api/refunds error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Crear refund con adjuntos
app.post(
  "/api/refunds",
  upload.fields([
    { name: "windcaveLetter", maxCount: 1 },
    { name: "operaReceipt", maxCount: 1 },
    { name: "refundForm", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        bookingNumber,
        guestName,
        email,
        phone,
        amountRequested,
        reason,
        details,
      } = req.body;

      const amount = amountRequested
        ? parseFloat(amountRequested)
        : null;

const refund = await prisma.refundRequest.create({
  data: {
    bookingNumber,
    guestName,
    email,
    phone,
    amountRequested: amount,
    reason,
    details,
    status: "PENDING",
  },
});

      // Adjuntos
      const files = req.files || {};
      const attachmentsData = [];

      if (files.windcaveLetter && files.windcaveLetter[0]) {
        attachmentsData.push({
          refundRequestId: refund.id,
          type: "WINDCAVE_LETTER",
          fileName: files.windcaveLetter[0].originalname,
          filePath: files.windcaveLetter[0].filename,
        });
      }
      if (files.operaReceipt && files.operaReceipt[0]) {
        attachmentsData.push({
          refundRequestId: refund.id,
          type: "OPERA_RECEIPT",
          fileName: files.operaReceipt[0].originalname,
          filePath: files.operaReceipt[0].filename,
        });
      }
      if (files.refundForm && files.refundForm[0]) {
        attachmentsData.push({
          refundRequestId: refund.id,
          type: "REFUND_FORM",
          fileName: files.refundForm[0].originalname,
          filePath: files.refundForm[0].filename,
        });
      }

      if (attachmentsData.length > 0) {
        await prisma.refundAttachment.createMany({
          data: attachmentsData,
        });
      }

      res.status(201).json(refund);
    } catch (err) {
      console.error("POST /api/refunds error", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Cambiar estado (opcional para futuro)
app.put("/api/refunds/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Missing status" });
  }

  try {
    const updated = await prisma.refundRequest.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    console.error("PUT /api/refunds/:id/status error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

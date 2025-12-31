-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "preferredName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RoleType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortLevel" INTEGER NOT NULL DEFAULT 0,
    "colorKey" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OrgSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StructureSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "snapshotId" INTEGER NOT NULL,
    "roleTypeId" INTEGER NOT NULL,
    "slotType" TEXT NOT NULL DEFAULT 'ROLE',
    "displayName" TEXT,
    "employeeId" INTEGER,
    "reportsToSlotId" INTEGER,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "posX" REAL,
    "posY" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StructureSlot_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "OrgSnapshot" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StructureSlot_roleTypeId_fkey" FOREIGN KEY ("roleTypeId") REFERENCES "RoleType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StructureSlot_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "StructureSlot_reportsToSlotId_fkey" FOREIGN KEY ("reportsToSlotId") REFERENCES "StructureSlot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleType_key_key" ON "RoleType"("key");

-- CreateIndex
CREATE UNIQUE INDEX "OrgSnapshot_type_key" ON "OrgSnapshot"("type");

-- CreateIndex
CREATE INDEX "StructureSlot_snapshotId_idx" ON "StructureSlot"("snapshotId");

-- CreateIndex
CREATE INDEX "StructureSlot_roleTypeId_idx" ON "StructureSlot"("roleTypeId");

-- CreateIndex
CREATE INDEX "StructureSlot_employeeId_idx" ON "StructureSlot"("employeeId");

-- CreateIndex
CREATE INDEX "StructureSlot_reportsToSlotId_idx" ON "StructureSlot"("reportsToSlotId");

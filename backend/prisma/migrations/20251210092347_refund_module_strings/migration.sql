/*
  Warnings:

  - You are about to drop the `OesDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OesDocument";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RefundRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookingNumber" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "amountRequested" DECIMAL,
    "reason" TEXT NOT NULL,
    "details" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RefundAttachment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refundRequestId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RefundAttachment_refundRequestId_fkey" FOREIGN KEY ("refundRequestId") REFERENCES "RefundRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

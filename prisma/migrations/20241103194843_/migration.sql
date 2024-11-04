/*
  Warnings:

  - You are about to drop the `TicketType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "TicketType_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TicketType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ticket_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requester" TEXT NOT NULL,
    "problemDescription" TEXT NOT NULL,
    "notes" TEXT,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "sectorId" INTEGER,
    "assignedToId" INTEGER,
    "ticketTypeId" INTEGER,
    CONSTRAINT "ticket_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ticket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ticket_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "ticket_type" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ticket" ("assignedToId", "createdAt", "finished", "id", "notes", "problemDescription", "requester", "sectorId", "ticketTypeId", "updatedAt", "userId") SELECT "assignedToId", "createdAt", "finished", "id", "notes", "problemDescription", "requester", "sectorId", "ticketTypeId", "updatedAt", "userId" FROM "ticket";
DROP TABLE "ticket";
ALTER TABLE "new_ticket" RENAME TO "ticket";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ticket_type_name_key" ON "ticket_type"("name");

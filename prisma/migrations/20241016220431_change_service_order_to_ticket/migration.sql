/*
  Warnings:

  - You are about to drop the `service_order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "service_order" DROP CONSTRAINT "service_order_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "service_order" DROP CONSTRAINT "service_order_userId_fkey";

-- DropTable
DROP TABLE "service_order";

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "requester" TEXT NOT NULL,
    "problemDescription" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "sectorId" INTEGER,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

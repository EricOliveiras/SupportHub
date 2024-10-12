/*
  Warnings:

  - You are about to drop the `Sector` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "service_order" DROP CONSTRAINT "service_order_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_sectorId_fkey";

-- DropTable
DROP TABLE "Sector";

-- CreateTable
CREATE TABLE "sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sector_name_key" ON "sector"("name");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_order" ADD CONSTRAINT "service_order_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

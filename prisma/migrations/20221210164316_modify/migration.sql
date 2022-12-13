/*
  Warnings:

  - You are about to drop the column `unitId` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `businessUnitId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_unitId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "unitId",
ADD COLUMN     "businessUnitId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_businessUnitId_fkey" FOREIGN KEY ("businessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

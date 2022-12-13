/*
  Warnings:

  - You are about to drop the column `groupId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `UnitType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `businessUnitTypeId` to the `BusinessUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceGroupId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_groupId_fkey";

-- DropIndex
DROP INDEX "BusinessDays_businessUnitId_key";

-- DropIndex
DROP INDEX "Service_groupId_key";

-- AlterTable
ALTER TABLE "BusinessUnit" ADD COLUMN     "businessUnitTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "groupId",
ADD COLUMN     "serviceGroupId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UnitType";

-- CreateTable
CREATE TABLE "BusinessUnitType" (
    "id" SERIAL NOT NULL,
    "businessUnitType" TEXT NOT NULL,

    CONSTRAINT "BusinessUnitType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessUnit" ADD CONSTRAINT "BusinessUnit_businessUnitTypeId_fkey" FOREIGN KEY ("businessUnitTypeId") REFERENCES "BusinessUnitType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceGroupId_fkey" FOREIGN KEY ("serviceGroupId") REFERENCES "ServiceGroupName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

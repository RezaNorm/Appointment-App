/*
  Warnings:

  - You are about to drop the column `businessUnitType` on the `BusinessUnitType` table. All the data in the column will be lost.
  - Added the required column `unit_type` to the `BusinessUnitType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessUnitType" DROP COLUMN "businessUnitType",
ADD COLUMN     "unit_type" TEXT NOT NULL;

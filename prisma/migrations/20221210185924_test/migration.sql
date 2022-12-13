/*
  Warnings:

  - A unique constraint covering the columns `[businessUnitName]` on the table `BusinessUnit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BusinessUnit_businessUnitName_key" ON "BusinessUnit"("businessUnitName");

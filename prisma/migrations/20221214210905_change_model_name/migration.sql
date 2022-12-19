/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_businessUnitId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_serviceGroupId_fkey";

-- DropTable
DROP TABLE "Employee";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT,
    "name" TEXT NOT NULL,
    "startWorkTime" TIMESTAMP(3) NOT NULL,
    "offWorkTime" TIMESTAMP(3) NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Employee',
    "businessUnitId" INTEGER NOT NULL,
    "serviceGroupId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_serviceGroupId_key" ON "User"("serviceGroupId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_businessUnitId_fkey" FOREIGN KEY ("businessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serviceGroupId_fkey" FOREIGN KEY ("serviceGroupId") REFERENCES "ServiceGroupName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

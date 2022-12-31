/*
  Warnings:

  - Added the required column `businessWebsite` to the `BusinessUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessUnitId` to the `ServiceGroupName` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_serviceGroupId_fkey";

-- AlterTable
ALTER TABLE "BusinessUnit" ADD COLUMN     "businessWebsite" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceGroupName" ADD COLUMN     "businessUnitId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "startWorkTime" DROP NOT NULL,
ALTER COLUMN "offWorkTime" DROP NOT NULL,
ALTER COLUMN "serviceGroupId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Authentication" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceGroupName" ADD CONSTRAINT "ServiceGroupName_businessUnitId_fkey" FOREIGN KEY ("businessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serviceGroupId_fkey" FOREIGN KEY ("serviceGroupId") REFERENCES "ServiceGroupName"("id") ON DELETE SET NULL ON UPDATE CASCADE;

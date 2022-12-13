/*
  Warnings:

  - You are about to drop the column `unitName` on the `BusinessUnit` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `serviceName` on the `ServiceGroupName` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `BusinessDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessUnitName` to the `BusinessUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BusinessUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offWorkTime` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startWorkTime` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceFee` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceName` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupName` to the `ServiceGroupName` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ServiceGroupName` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitName` to the `UnitType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessDays" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BusinessUnit" DROP COLUMN "unitName",
ADD COLUMN     "businessUnitName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "aboutUs" DROP NOT NULL,
ALTER COLUMN "contactUs" DROP NOT NULL,
ALTER COLUMN "instagramLink" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE employee_id_seq;
ALTER TABLE "Employee" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "offWorkTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startWorkTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('employee_id_seq');
ALTER SEQUENCE employee_id_seq OWNED BY "Employee"."id";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isPrepayable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "serviceFee" INTEGER NOT NULL,
ADD COLUMN     "serviceName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceGroupName" DROP COLUMN "serviceName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "groupName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UnitType" ADD COLUMN     "unitName" TEXT NOT NULL;

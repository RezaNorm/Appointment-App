-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Manager', 'Employee', 'Customer');

-- CreateTable
CREATE TABLE "BusinessUnit" (
    "id" SERIAL NOT NULL,
    "unitName" TEXT NOT NULL,
    "aboutUs" TEXT NOT NULL,
    "contactUs" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "instagramLink" TEXT NOT NULL,

    CONSTRAINT "BusinessUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitType" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "UnitType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceGroupName" (
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "ServiceGroupName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "avatar" TEXT,
    "employeeName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "unitId" INTEGER NOT NULL,
    "serviceGroupId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessDays" (
    "id" SERIAL NOT NULL,
    "openFrom" TIMESTAMP(3) NOT NULL,
    "openUntil" TIMESTAMP(3) NOT NULL,
    "businessUnitId" INTEGER NOT NULL,

    CONSTRAINT "BusinessDays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_groupId_key" ON "Service"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_serviceGroupId_key" ON "Employee"("serviceGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessDays_businessUnitId_key" ON "BusinessDays"("businessUnitId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ServiceGroupName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_serviceGroupId_fkey" FOREIGN KEY ("serviceGroupId") REFERENCES "ServiceGroupName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessDays" ADD CONSTRAINT "BusinessDays_businessUnitId_fkey" FOREIGN KEY ("businessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

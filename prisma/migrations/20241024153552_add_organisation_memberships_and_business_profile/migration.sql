-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('individual', 'organisation');

-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "businessType" "BusinessType" NOT NULL DEFAULT 'individual';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultOrganisationId" TEXT;

-- CreateTable
CREATE TABLE "OrganisationMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "OrganisationMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" TEXT NOT NULL,
    "organisationName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "emailAddress" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrganisationMember_userId_orgId_idx" ON "OrganisationMember"("userId", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_orgId_key" ON "BusinessProfile"("orgId");

-- CreateIndex
CREATE INDEX "Organisation_creatorId_idx" ON "Organisation"("creatorId");

-- CreateIndex
CREATE INDEX "User_defaultOrganisationId_idx" ON "User"("defaultOrganisationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultOrganisationId_fkey" FOREIGN KEY ("defaultOrganisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganisationMember" ADD CONSTRAINT "OrganisationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganisationMember" ADD CONSTRAINT "OrganisationMember_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

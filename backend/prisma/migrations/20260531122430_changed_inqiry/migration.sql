/*
  Warnings:

  - You are about to drop the column `customerId` on the `Inquiry` table. All the data in the column will be lost.
  - Added the required column `customerEmail` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_customerId_fkey";

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "customerId",
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL;

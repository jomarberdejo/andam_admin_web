/*
  Warnings:

  - You are about to drop the column `residentId` on the `agreement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `agreement` DROP FOREIGN KEY `Agreement_residentId_fkey`;

-- AlterTable
ALTER TABLE `agreement` DROP COLUMN `residentId`;

-- AlterTable
ALTER TABLE `resident` ADD COLUMN `agreementId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Resident` ADD CONSTRAINT `Resident_agreementId_fkey` FOREIGN KEY (`agreementId`) REFERENCES `Agreement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

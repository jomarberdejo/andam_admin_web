/*
  Warnings:

  - The values [NONE] on the enum `Feedback_agency` will be removed. If these variants are still used in the database, this will fail.
  - The values [NONE] on the enum `Feedback_agency` will be removed. If these variants are still used in the database, this will fail.
  - The values [NONE] on the enum `Feedback_agency` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `agency` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(4))`.
  - A unique constraint covering the columns `[username]` on the table `Resident` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Resident` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Resident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contact` MODIFY `agency` ENUM('PNP', 'BFP', 'LGU', 'MDRRMO') NOT NULL;

-- AlterTable
ALTER TABLE `entry` MODIFY `agency` ENUM('PNP', 'BFP', 'LGU', 'MDRRMO') NULL;

-- AlterTable
ALTER TABLE `report` MODIFY `agency` ENUM('PNP', 'BFP', 'LGU', 'MDRRMO') NOT NULL DEFAULT 'MDRRMO';

-- AlterTable
ALTER TABLE `resident` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `agency` ENUM('PNP', 'BFP', 'LGU', 'MDRRMO') NOT NULL DEFAULT 'MDRRMO';

-- CreateTable
CREATE TABLE `Feedback` (
    `id` VARCHAR(191) NOT NULL,
    `feedbackDetail` VARCHAR(191) NOT NULL,
    `agency` ENUM('PNP', 'BFP', 'LGU', 'MDRRMO') NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `residentId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Resident_username_key` ON `Resident`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Resident_email_key` ON `Resident`(`email`);

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_residentId_fkey` FOREIGN KEY (`residentId`) REFERENCES `Resident`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

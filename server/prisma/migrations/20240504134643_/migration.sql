/*
  Warnings:

  - You are about to drop the column `fullname` on the `resident` table. All the data in the column will be lost.
  - You are about to drop the column `imageIdentity` on the `resident` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `resident` table. All the data in the column will be lost.
  - Added the required column `contactNumber` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageIdentityUrl` to the `Resident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resident` DROP COLUMN `fullname`,
    DROP COLUMN `imageIdentity`,
    DROP COLUMN `phone`,
    ADD COLUMN `contactNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageIdentityUrl` VARCHAR(191) NOT NULL;

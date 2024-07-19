/*
  Warnings:

  - You are about to drop the column `contact` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `report` DROP COLUMN `contact`,
    DROP COLUMN `name`;

/*
  Warnings:

  - A unique constraint covering the columns `[residentId]` on the table `Agreement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Agreement_residentId_key` ON `Agreement`(`residentId`);

-- AlterTable
ALTER TABLE `contact` MODIFY `agency` ENUM('NONE', 'PNP', 'BFP', 'LGU', 'MDRRMO') NOT NULL;

-- AlterTable
ALTER TABLE `entry` MODIFY `agency` ENUM('NONE', 'PNP', 'BFP', 'LGU', 'MDRRMO') NULL;

-- AlterTable
ALTER TABLE `report` ADD COLUMN `residentId` VARCHAR(191) NULL,
    MODIFY `agency` ENUM('NONE', 'PNP', 'BFP', 'LGU', 'MDRRMO') NOT NULL DEFAULT 'MDRRMO';

-- AlterTable
ALTER TABLE `user` MODIFY `agency` ENUM('NONE', 'PNP', 'BFP', 'LGU', 'MDRRMO') NOT NULL DEFAULT 'NONE';

-- CreateTable
CREATE TABLE `Resident` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `imageIdentity` VARCHAR(191) NOT NULL,
    `registeredAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agreement` (
    `id` VARCHAR(191) NOT NULL,
    `agreedAt` VARCHAR(191) NOT NULL,
    `residentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_residentId_fkey` FOREIGN KEY (`residentId`) REFERENCES `Resident`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agreement` ADD CONSTRAINT `Agreement_residentId_fkey` FOREIGN KEY (`residentId`) REFERENCES `Resident`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

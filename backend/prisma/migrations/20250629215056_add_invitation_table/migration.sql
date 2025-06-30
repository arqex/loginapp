-- DropForeignKey
ALTER TABLE `TodoItem` DROP FOREIGN KEY `TodoItem_todoListId_fkey`;

-- CreateTable
CREATE TABLE `Invitation` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'DECLINED', 'ACCEPTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `meta` JSON NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,

    INDEX `Invitation_accountId_idx`(`accountId`),
    INDEX `Invitation_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invitation` ADD CONSTRAINT `Invitation_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TodoItem` ADD CONSTRAINT `TodoItem_todoListId_fkey` FOREIGN KEY (`todoListId`) REFERENCES `TodoList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

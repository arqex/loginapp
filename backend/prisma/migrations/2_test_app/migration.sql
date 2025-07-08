-- CreateTable
CREATE TABLE `TodoList` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TodoItem` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `todoListId` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TodoList` ADD CONSTRAINT `TodoList_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TodoItem` ADD CONSTRAINT `TodoItem_todoListId_fkey` FOREIGN KEY (`todoListId`) REFERENCES `TodoList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert TodoList
INSERT INTO `TodoList` (`id`, `accountId`, `createdAt`, `updatedAt`, `name`) VALUES
  ('list1', 'account1', NOW(), NOW(), 'Demo List');

-- Insert TodoItems
INSERT INTO `TodoItem` (`id`, `todoListId`, `createdAt`, `updatedAt`, `title`, `completed`) VALUES
  ('item1', 'list1', NOW(), NOW(), 'First task', false),
  ('item2', 'list1', NOW(), NOW(), 'Second task', true);
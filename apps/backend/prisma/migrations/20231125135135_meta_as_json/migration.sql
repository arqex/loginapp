/*
  Warnings:

  - You are about to alter the column `meta` on the `AuthToken` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.
  - You are about to alter the column `meta` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `AuthToken` MODIFY `meta` JSON NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `meta` JSON NOT NULL;

-- AlterTable
ALTER TABLE `AuthToken` MODIFY `type` ENUM('EMAIL_LOGIN', 'API_KEY', 'OAUTH20', 'PROVIDER_LOGIN') NOT NULL;

-- RenameIndex
ALTER TABLE `AuthToken` RENAME INDEX `AuthToken_userId_fkey` TO `AuthToken_userId_idx`;

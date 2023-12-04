/*
  Warnings:

  - The values [EMAIL] on the enum `AuthToken_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `AuthToken` MODIFY `type` ENUM('EMAIL_LOGIN', 'API_KEY', 'OTT') NOT NULL;

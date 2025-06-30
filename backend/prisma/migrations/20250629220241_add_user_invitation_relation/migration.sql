-- AddForeignKey
ALTER TABLE `Invitation` ADD CONSTRAINT `Invitation_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

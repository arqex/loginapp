import * as sendgrid from '@sendgrid/mail';
import { EmailDetails } from './email.types';
sendgrid.setApiKey(process.env.SENDGRID_KEY);

export function sendEmail(recipient: string, details: EmailDetails) {
  return sendgrid.send({
    to: recipient,
    from: process.env.SENDGRID_VERIFIED_SENDER_EMAIL,
    ...details,
  });
}

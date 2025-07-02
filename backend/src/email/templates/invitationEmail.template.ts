import { EmailDetails } from '../email.types';

export interface InvitationEmailData {
  to: string;
  invitationId: string;
  accountName: string;
  role: string;
  secret: string;
}

export function getInvitationEmailTemplate(
  data: InvitationEmailData,
): EmailDetails {
  const inviteLink = `${process.env.APP_URL}/#/invitation_accept/${
    data.invitationId
  }?email=${encodeURIComponent(data.to)}&account=${encodeURIComponent(
    data.accountName,
  )}&secret=${encodeURIComponent(data.secret)}`;

  return {
    subject: `You've been invited to join ${data.accountName}`,
    text: `You've been invited to join ${data.accountName} as a ${data.role}. Click this link to accept: ${inviteLink}`,
    html: `
      <h1>You've been invited to join ${data.accountName}</h1>
      <p>You've been invited to join the account <strong>${data.accountName}</strong> with the role of <strong>${data.role}</strong>.</p>
      <p><a href="${inviteLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Accept Invitation</a></p>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${inviteLink}</p>
      <p>This invitation will expire in a few days.</p>
    `,
  };
}

export async function sendInvitationEmail(data: InvitationEmailData) {
  const { sendEmail } = await import('../sender');
  const emailTemplate = getInvitationEmailTemplate(data);

  return await sendEmail(data.to, emailTemplate);
}

import { EmailDetails } from '../email.types';

export function getEmailVerifyTemplate(
  email: string,
  verificationCode: string,
): EmailDetails {
  const verifyLink = `${
    process.env.APP_URL
  }/#/verify_email?vc=${verificationCode}&email=${encodeURIComponent(email)}`;

  return {
    subject: 'Welcome to LoginApp',
    text: `You are one step away from using LoginApp. Verify your email address using this link: ${verifyLink}`,
    html: `
      <h1>Welcome to LoginApp</h1>
      <p>You are one step away from using LoginApp. Verify your email address using this link <a href="${verifyLink}">${verifyLink}</a></p>
    `,
  };
}

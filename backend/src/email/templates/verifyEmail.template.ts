import { EmailDetails } from '../email.types';

export function getEmailVerifyTemplate(
  email: string,
  verificationCode: string,
): EmailDetails {
  const verifyLink = `${
    process.env.APP_URL
  }/#/verify_email?email=${encodeURIComponent(email)}`;

  return {
    subject: 'Welcome to LoginApp',
    text: `You are one step away from using LoginApp. Verify your email address using this link: ${verifyLink}`,
    html: `
      <h1>Welcome to LoginApp</h1>
      <p>You are one step away from using LoginApp. Go back to the app or <a href="${verifyLink}">visit this link<a> and type the following code:</p>
      <h2>${verificationCode}</h2>
    `,
  };
}

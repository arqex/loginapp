import { EmailDetails } from '../email.types';

export function getPasswordRecoveryTemplate(
  email: string,
  ott: string,
): EmailDetails {
  const recoveryLink = `${
    process.env.APP_URL
  }/#/reset_password?ott=${ott}&email=${encodeURIComponent(email)}`;
  return {
    subject: 'Password recovery',
    text: `Use the following link to reset your password: ${recoveryLink}`,
    html: `
      <h1>Password recovery</h1>
      <p>Use the following link to reset your password: <a href="${recoveryLink}">${recoveryLink}</a></p>
    `,
  };
}

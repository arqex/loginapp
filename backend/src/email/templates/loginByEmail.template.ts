import { EmailDetails } from '../email.types';

export function getLoginByEmailTemplate(
  email: string,
  ott: string,
): EmailDetails {
  const loginLink = `${
    process.env.APP_URL
  }/#/ott_login?ott=${ott}&key=${encodeURIComponent(email)}&source=email`;
  return {
    subject: 'Login to your account',
    text: `Login to your account using this link: ${loginLink}`,
    html: `
      <h1>Login to your account</h1>
      <p>Login to your account using this link: <a href="${loginLink}">${loginLink}</a></p>
    `,
  };
}

import { Router } from 'express';
import { loginController } from './controllers/login.controller';
import { logoutController } from './controllers/logout.controller';
import { signupController } from './controllers/signup.controller';
import { verifyEmailController } from './controllers/verifyEmail.controller';
import { requestEmailLoginController } from './controllers/requestEmailLogin.controller';
import { loginByOTTController } from './controllers/loginByOtt.controller';
import { loginByProviderController } from './controllers/loginByProvider.controller';
import { requestPasswordRecoveryController } from './controllers/requestPasswordRecovery.controller';
import { resetPasswordController } from './controllers/resetPassword.controller';
import { oauthCallbackController } from './controllers/oauthCallback.controller';
import { oauthStartController } from './controllers/oauthStart.controller';
import { oauthCallback, oauthStart } from './strategies/oauth.strategy';
import { signupByProviderController } from './controllers/signupByProvider.controller';

const authRouter = Router();

authRouter
  .post('/login', loginController)
  .post('/logout', logoutController)
  .post('/signup', signupController)
  .post('/login_by_ott', loginByOTTController)
  .post('/login_by_provider', loginByProviderController)
  .post('/signup_by_provider', signupByProviderController)
  .get('/oauth_callback', oauthCallback, oauthCallbackController)
  .get('/oauth_start', oauthStart, oauthStartController)
  .post('/reset_password', resetPasswordController)
  .post('/verify_email', verifyEmailController)
  .post('/request_email_login', requestEmailLoginController)
  .post('/request_password_recovery', requestPasswordRecoveryController);

export default authRouter;

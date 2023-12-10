import { Router } from 'express';
import { loginController } from './controllers/login.controller';
import { logoutController } from './controllers/logout.controller';
import { signupController } from './controllers/signup.controller';
import { verifyEmailController } from './controllers/verifyEmail.controller';
import { requestEmailLoginController } from './controllers/requestEmailLogin.controller';
import { loginByOTTController } from './controllers/loginByOtt.controller';
import { requestPasswordRecoveryController } from './controllers/requestPasswordRecovery.controller';
import { resetPasswordController } from './controllers/resetPassword.controller';
import { oauthCallbackController } from './controllers/oauthCallback.controller';
import { oauthStartController } from './controllers/oauthStart.controller';
import { oauthCallback, oauthStart } from './strategies/oauth.strategy';

const authRouter = Router();

authRouter
  .post('/login', loginController)
  .post('/logout', logoutController)
  .post('/signup', signupController)
  .post('/login_by_ott', loginByOTTController)
  .get('/oauth_callback', oauthCallback, oauthCallbackController)
  .get('/oauth_start', oauthStart, oauthStartController)
  .post('/reset_password', resetPasswordController)
  .post('/verify_email', verifyEmailController)
  .post('/request_email_login', requestEmailLoginController)
  .post('/request_password_recovery', requestPasswordRecoveryController);

export default authRouter;

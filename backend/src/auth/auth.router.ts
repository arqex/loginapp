import { Router } from 'express';
import { loginController } from './controllers/login.controller';
import { logoutController } from './controllers/logout.controller';
import { signupController } from './controllers/signup.controller';
import { verifyEmailController } from './controllers/verifyEmail.controller';
import { requestEmailLoginController } from './controllers/requestEmailLogin.controller';
import { loginByOTTController } from './controllers/loginByOtt.controller';
import { requestPasswordRecoveryController } from './controllers/requestPasswordRecovery';
import { resetPasswordController } from './controllers/resetPassword.controller';

const authRouter = Router();

authRouter
  .post('/login', loginController)
  .post('/logout', logoutController)
  .post('/signup', signupController)
  .post('/login_by_ott', loginByOTTController)
  .post('/reset_password', resetPasswordController)
  .post('/verify_email', verifyEmailController)
  .post('/request_email_login', requestEmailLoginController)
  .post('/request_password_recovery', requestPasswordRecoveryController);

export default authRouter;

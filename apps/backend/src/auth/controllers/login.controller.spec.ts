import { loginController } from './login.controller';
import { mockPost, mockResponse } from 'testing/testing.utils';

describe('login.controller', () => {
  describe('when no email is sent', () => {
    it('should return invalid email error', () => {
      const req = mockPost('/login', {});
      const res = mockResponse();
      loginController(req, res);
      expect(res.status).toBe(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'invalid_email_address' });
    });
  });
});

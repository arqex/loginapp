import { Request, Response } from 'express';

export async function logoutController(req: Request, res: Response) {
  res.clearCookie('auth');
  res.status(204).send();
}

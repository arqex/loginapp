import { Response } from 'express';

export function resUnauthorized(res: Response) {
  resError(res, 'unauthorized', 401);
}

export function resForbidden(res: Response) {
  resError(res, 'forbidden', 403);
}

export function resError(res: Response, code: string, status: number = 400) {
  res.status(status).json({ error: code });
}

export function resInvalidEmail(res: Response) {
  resError(res, 'invalid_email_address', 400);
}

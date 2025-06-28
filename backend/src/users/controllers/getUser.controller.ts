import { Response } from 'express';
import { getUserById } from '../users.db';
import { JsonObject } from '@prisma/client/runtime/library';
import { AuthRequest } from '../../auth/auth.types';
import { resError } from '../../utils/respond.utils';

export async function getUserController(req: AuthRequest, res: Response) {
  const userId = req.params.id;

  const user = await getUserById(userId);
  if (!user) {
    return resError(res, 'user_not_found', 404);
  }

  const { meta, ...userWithoutMeta } = user;

  res.json({
    ...userWithoutMeta,
    ...(meta as JsonObject),
  });
}

import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { resError, resForbidden } from 'src/utils/respond.utils';
import { getUserById } from '../users.db';
import { JsonObject } from '@prisma/client/runtime/library';

export async function getUserController(req: AuthRequest, res: Response) {
  const { id: authenticatedUserId } = req.user!;
  const userId = req.params.id;

  console.log('authenticatedUserId', authenticatedUserId, 'userId', userId);

  if (userId !== authenticatedUserId) {
    return resForbidden(res);
  }

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

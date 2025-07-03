import { Response } from 'express';
import { getUserById } from '../users.db';
import { JsonObject } from '@prisma/client/runtime/library';
import { AuthRequest } from '../../auth/auth.types';
import { resError } from '../../utils/respond.utils';
import { generateUserSignals } from '../../utils/signals.utils';

export async function getUserController(req: AuthRequest, res: Response) {
  const userId = req.params.id;

  const user = await getUserById(userId);
  if (!user) {
    return resError(res, 'user_not_found', 404);
  }

  const { meta, clientData, ...userWithoutMeta } = user;

  // Generate signals to inform frontend about user status
  const signals = await generateUserSignals(user);

  res.json({
    ...userWithoutMeta,
    ...(meta as JsonObject),
    clientData: clientData,
    // backend signals about something that's not right with the user
    signals,
  });
}

import { JsonObject } from '@prisma/client/runtime/library';
import { getAccountById } from '../account.db';
import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { resError } from '../../../../utils/respond.utils';

export async function getAccountController(req: AuthRequest, res: Response) {
  const { accountId } = req.params;

  const account = await getAccountById(accountId);
  if (!account) {
    return resError(res, 'account_not_found', 404);
  }

  const { meta, ...accountWithoutMeta } = account;

  res.json({
    ...accountWithoutMeta,
    ...(meta as JsonObject),
  });
}

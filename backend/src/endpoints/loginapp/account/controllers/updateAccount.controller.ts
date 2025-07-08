import { JsonObject } from '@prisma/client/runtime/library';
import { updateAccount } from '../account.db';
import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { resError } from '../../../../utils/respond.utils';

export async function updateAccountController(req: AuthRequest, res: Response) {
  const { accountId } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return resError(res, 'account_name_required', 400);
  }

  if (name.trim().length < 2) {
    return resError(res, 'account_name_too_short', 400);
  }

  try {
    const updatedAccount = await updateAccount(accountId, {
      meta: {
        name: name.trim(),
      },
    });

    const { meta, ...accountWithoutMeta } = updatedAccount;

    res.json({
      ...accountWithoutMeta,
      ...(meta as JsonObject),
    });
  } catch (error) {
    console.error('Error updating account:', error);
    return resError(res, 'account_update_failed', 500);
  }
}

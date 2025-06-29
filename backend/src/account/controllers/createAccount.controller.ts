import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { createAccount } from '../account.db';
import { createAccountMembers } from '../../userRole/userRole.db';
import { resError, resPayloadError } from '../../utils/respond.utils';
import { UsersOnAccountRole } from '@prisma/client';

export async function createAccountController(req: AuthRequest, res: Response) {
  const { name } = req.body;
  const userId = req.user.id;

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return resPayloadError(res, 'Account name is required');
  }

  try {
    // Create the account with the provided name
    const account = await createAccount({
      meta: {
        name: name.trim(),
      },
    });

    // Add the creating user as an ADMIN of the new account
    await createAccountMembers([
      {
        userId,
        accountId: account.id,
        role: UsersOnAccountRole.ADMIN,
      },
    ]);

    // Return only the account ID
    res.status(201).json({
      id: account.id,
    });
  } catch (error) {
    console.error('Error creating account:', error);
    return resError(res, 'account_creation_failed', 500);
  }
}

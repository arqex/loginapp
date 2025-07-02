import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { getInvitationsByAccount } from '../invitation.db';
import { resError } from '../../utils/respond.utils';

export async function getAccountInvitationsController(
  req: AuthRequest,
  res: Response,
) {
  const { accountId } = req.params;

  try {
    const invitations = await getInvitationsByAccount(accountId);
    res.json(invitations);
  } catch (error) {
    console.error('Error fetching invitations:', error);
    return resError(res, 'failed_to_fetch_invitations');
  }
}

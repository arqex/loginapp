import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { updateInvitation } from '../invitation.db';
import { resError } from '../../utils/respond.utils';
import { InvitationStatus } from '@prisma/client';
import { validateInvitationForUser } from '../utils/invitation.utils';

export async function declineInvitationController(
  req: AuthRequest,
  res: Response,
) {
  const { invitationId } = req.params;
  const userId = req.user.id;

  try {
    // Validate invitation and user
    const validation = await validateInvitationForUser(req, res, invitationId);
    if (!validation.isValid) {
      return; // Error response already sent by validation function
    }

    // Update invitation status to DECLINED
    await updateInvitation(invitationId, {
      status: InvitationStatus.DECLINED,
    });

    res.json({
      authenticatedId: userId,
      message: 'Invitation declined successfully',
    });
  } catch (error) {
    console.error('Error declining invitation:', error);
    return resError(res, 'failed_to_decline_invitation');
  }
}

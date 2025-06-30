import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { updateInvitation } from '../invitation.db';
import { resError } from '../../utils/respond.utils';
import { InvitationStatus } from '@prisma/client';
import { createAccountMembers } from '../../userRole/userRole.db';
import { getRoleValue } from '../../userRole/userRole.utils';
import { validateInvitationForUser } from '../utils/invitation.utils';

export async function acceptInvitationController(
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

    const { invitation } = validation;

    // Get the role from invitation meta
    const roleString = (invitation.meta as any)?.role || 'collaborator';
    const accountRole = getRoleValue(roleString.toLowerCase() as any);

    // Add user to the account
    await createAccountMembers([
      {
        userId,
        accountId: invitation.accountId,
        role: accountRole,
      },
    ]);

    // Update invitation status to ACCEPTED
    await updateInvitation(invitationId, {
      status: InvitationStatus.ACCEPTED,
    });

    res.json({
      authenticatedId: userId,
      data: {
        accountId: invitation.accountId,
        role: accountRole,
      },
      message: 'Invitation accepted successfully',
    });
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return resError(res, 'failed_to_accept_invitation');
  }
}

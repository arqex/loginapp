import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { getInvitationById, updateInvitation } from '../invitation.db';
import { resError } from '../../utils/respond.utils';
import { InvitationStatus } from '@prisma/client';
import { getPrismaClient } from '../../prismaclient';
import {
  validateInvitationAccess,
  addUserToAccountFromInvitation,
} from '../utils/invitation.utils';

const prisma = getPrismaClient();

export async function invitationReplyAuthenticatedController(
  req: AuthRequest,
  res: Response,
) {
  const { invitationId } = req.params;
  const { reply } = req.body;
  const userId = req.user.id;

  if (!reply || !['ACCEPT', 'DECLINE'].includes(reply)) {
    return resError(res, 'invalid_reply_value');
  }

  try {
    // Get the invitation
    const invitation = await getInvitationById(invitationId);

    // Validate invitation access
    const validationResult = await validateInvitationAccess(invitation);
    if (!validationResult.isValid) {
      return resError(res, validationResult.error || 'invitation_not_valid');
    }

    // Get current user's email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      return resError(res, 'user_not_found', 404);
    }

    // Check if the invitation is for the current user's email
    if (invitation.email.toLowerCase() !== user.email.toLowerCase()) {
      return resError(res, 'invitation_not_for_user');
    }

    // If accepting the invitation, add user to the account
    if (reply === 'ACCEPT') {
      // Add user to account using utility function
      await addUserToAccountFromInvitation(userId, invitation);
    }

    await updateInvitation(invitationId, {
      status: reply === 'ACCEPT' ? 'ACCEPTED' : 'DECLINED',
    });
  } catch (error) {
    console.error('Error processing invitation reply:', error);
    return resError(res, 'failed_to_process_invitation_reply');
  }
}

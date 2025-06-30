import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { getInvitationById } from '../invitation.db';
import { resError } from '../../utils/respond.utils';
import { InvitationStatus } from '@prisma/client';
import { getPrismaClient } from '../../prismaclient';

const prisma = getPrismaClient();

export interface ValidateInvitationResult {
  isValid: boolean;
  invitation?: any;
  user?: any;
}

/**
 * Validates that an invitation can be accepted or declined by the current user
 * @param req The authenticated request
 * @param res The response object
 * @param invitationId The invitation ID to validate
 * @returns Object with validation result and data, or sends error response
 */
export async function validateInvitationForUser(
  req: AuthRequest,
  res: Response,
  invitationId: string,
): Promise<ValidateInvitationResult> {
  const userId = req.user.id;

  try {
    // Get the invitation
    const invitation = await getInvitationById(invitationId);
    if (!invitation) {
      resError(res, 'invitation_not_found', 404);
      return { isValid: false };
    }

    // Check if invitation is valid
    if (invitation.status !== InvitationStatus.PENDING) {
      resError(res, 'invitation_not_valid');
      return { isValid: false };
    }

    if (invitation.expiresAt < new Date()) {
      resError(res, 'invitation_expired');
      return { isValid: false };
    }

    // Get current user's email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      resError(res, 'user_not_found', 404);
      return { isValid: false };
    }

    // Check if the invitation is for the current user's email
    if (invitation.email.toLowerCase() !== user.email.toLowerCase()) {
      resError(res, 'invitation_not_for_user');
      return { isValid: false };
    }

    return {
      isValid: true,
      invitation,
      user,
    };
  } catch (error) {
    console.error('Error validating invitation:', error);
    resError(res, 'failed_to_validate_invitation');
    return { isValid: false };
  }
}

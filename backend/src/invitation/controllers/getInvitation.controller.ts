import { Response, Request } from 'express';
import { resError } from '../../utils/respond.utils';
import { InvitationStatus } from '@prisma/client';
import { validateInvitationAccess } from '../utils/invitation.utils';

export async function getInvitationController(req: Request, res: Response) {
  const { invitationId } = req.params;
  const { email, secret } = req.query;

  // Require email and secret for public invitation access
  if (!email || !secret) {
    return resError(res, 'email_and_secret_required', 400);
  }

  try {
    // Validate invitation access with email and secret
    const validation = await validateInvitationAccess(
      invitationId,
      email as string,
      secret as string,
    );

    if (!validation.isValid) {
      return resError(res, validation.error || 'invalid_invitation', 403);
    }

    const invitation = validation.invitation;

    // Return basic info for public access
    const publicInvitation = {
      id: invitation.id,
      email: invitation.email,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
      isExpired: invitation.expiresAt < new Date(),
      isValid:
        invitation.status === InvitationStatus.PENDING &&
        invitation.expiresAt > new Date(),
      account: {
        id: invitation.account.id,
        name: (invitation.account.meta as any)?.name || 'Account',
      },
      meta: {
        role: (invitation.meta as any)?.role || 'COLLABORATOR',
      },
    };

    res.json({
      data: publicInvitation,
    });
  } catch (error) {
    console.error('Error fetching invitation:', error);
    return resError(res, 'failed_to_fetch_invitation');
  }
}

import { Response, Request } from 'express';
import { getInvitationById } from '../invitation.db';
import { resError } from '../../utils/respond.utils';
import { InvitationStatus } from '@prisma/client';

export async function getInvitationController(req: Request, res: Response) {
  const { invitationId } = req.params;

  try {
    const invitation = await getInvitationById(invitationId);

    if (!invitation) {
      return resError(res, 'invitation_not_found', 404);
    }

    // Only return basic info for public access
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

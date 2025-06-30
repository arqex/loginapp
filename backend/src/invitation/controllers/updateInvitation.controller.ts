import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { updateInvitation, getInvitationById } from '../invitation.db';
import { resError, resPayloadError } from '../../utils/respond.utils';
import { InvitationStatus } from '@prisma/client';

export async function updateInvitationController(
  req: AuthRequest,
  res: Response,
) {
  const { invitationId } = req.params;
  const { status, role, expirationDays } = req.body;
  const userId = req.user.id;

  try {
    // Check if invitation exists
    const existingInvitation = await getInvitationById(invitationId);
    if (!existingInvitation) {
      return resError(res, 'invitation_not_found', 404);
    }

    const updateData: any = {};

    // Update status if provided
    if (status) {
      if (!Object.values(InvitationStatus).includes(status)) {
        return resPayloadError(res, 'invalid_status');
      }
      updateData.status = status;
    }

    // Update expiration if provided
    if (expirationDays) {
      if (
        typeof expirationDays !== 'number' ||
        expirationDays < 1 ||
        expirationDays > 30
      ) {
        return resPayloadError(res, 'invalid_expiration_days');
      }
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expirationDays);
      updateData.expiresAt = expiresAt;
    }

    // Update role in meta if provided
    if (role) {
      if (!['ADMIN', 'EDITOR', 'COLLABORATOR'].includes(role)) {
        return resPayloadError(res, 'invalid_role');
      }
      updateData.meta = {
        ...(existingInvitation.meta as any),
        role,
      };
    }

    const updatedInvitation = await updateInvitation(invitationId, updateData);

    res.json({
      authenticatedId: userId,
      data: updatedInvitation,
    });
  } catch (error) {
    console.error('Error updating invitation:', error);
    return resError(res, 'failed_to_update_invitation');
  }
}

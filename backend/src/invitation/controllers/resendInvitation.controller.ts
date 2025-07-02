import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { getInvitationById, updateInvitation } from '../invitation.db';
import { resError } from '../../utils/respond.utils';
import { sendInvitationEmail } from '../../email/templates/invitationEmail.template';
import { InvitationStatus } from '@prisma/client';

export async function resendInvitationController(
  req: AuthRequest,
  res: Response,
) {
  const { invitationId } = req.params;
  const { expirationDays = 7 } = req.body;
  const userId = req.user.id;

  try {
    // Check if invitation exists
    const invitation = await getInvitationById(invitationId);
    if (!invitation) {
      return resError(res, 'invitation_not_found', 404);
    }

    // Update expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    const updatedInvitation = await updateInvitation(invitationId, {
      expiresAt,
      status: InvitationStatus.PENDING, // Reset to pending if it was expired
    });

    // Resend invitation email
    try {
      const accountName = (invitation.account.meta as any)?.name || 'Account';
      const role = (invitation.meta as any)?.role || 'COLLABORATOR';
      const secret = invitation.secret;

      if (!secret) {
        return resError(res, 'invitation_missing_secret');
      }

      await sendInvitationEmail({
        to: invitation.email,
        invitationId: invitation.id,
        accountName,
        role,
        secret,
      });
    } catch (emailError) {
      console.error('Failed to resend invitation email:', emailError);
      return resError(res, 'failed_to_send_invitation_email');
    }

    res.json({
      authenticatedId: userId,
      data: updatedInvitation,
      message: 'Invitation resent successfully',
    });
  } catch (error) {
    console.error('Error resending invitation:', error);
    return resError(res, 'failed_to_resend_invitation');
  }
}

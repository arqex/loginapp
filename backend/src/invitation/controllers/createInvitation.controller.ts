import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { createInvitation } from '../invitation.db';
import { resError, resPayloadError } from '../../utils/respond.utils';
import { isValidEmailAddress } from '../../utils/validation.utils';
import { sendInvitationEmail } from '../../email/templates/invitationEmail.template';

export async function createInvitationController(
  req: AuthRequest,
  res: Response,
) {
  const { accountId } = req.params;
  const { email, role = 'COLLABORATOR', expirationDays = 7 } = req.body;
  const userId = req.user.id;

  // Validate required fields
  if (!email || typeof email !== 'string') {
    return resPayloadError(res, 'email_required');
  }

  if (!isValidEmailAddress(email)) {
    return resPayloadError(res, 'invalid_email_format');
  }

  if (!role || !['ADMIN', 'EDITOR', 'COLLABORATOR'].includes(role)) {
    return resPayloadError(res, 'invalid_role');
  }

  if (
    !expirationDays ||
    typeof expirationDays !== 'number' ||
    expirationDays < 1 ||
    expirationDays > 30
  ) {
    return resPayloadError(res, 'invalid_expiration_days');
  }

  try {
    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    // Create the invitation
    const invitation = await createInvitation({
      email: email.toLowerCase(),
      accountId,
      expiresAt,
      meta: {
        role,
        invitedBy: userId,
      },
    });

    // Send invitation email
    try {
      const accountName = (invitation.account.meta as any)?.name || 'Account';
      await sendInvitationEmail({
        to: email,
        invitationId: invitation.id,
        accountName,
        role,
      });
    } catch (emailError) {
      console.error('Failed to send invitation email:', emailError);
      // Continue even if email fails - the invitation is still created
    }

    res.json({
      authenticatedId: userId,
      data: invitation,
    });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return resError(res, 'failed_to_create_invitation');
  }
}

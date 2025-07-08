import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { deleteInvitation, getInvitationById } from '../invitation.db';
import { resError } from '../../../../utils/respond.utils';

export async function deleteInvitationController(
  req: AuthRequest,
  res: Response,
) {
  const { invitationId } = req.params;
  const userId = req.user.id;

  try {
    // Check if invitation exists
    const existingInvitation = await getInvitationById(invitationId);
    if (!existingInvitation) {
      return resError(res, 'invitation_not_found', 404);
    }

    await deleteInvitation(invitationId);

    res.json({
      authenticatedId: userId,
      message: 'Invitation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting invitation:', error);
    return resError(res, 'failed_to_delete_invitation');
  }
}

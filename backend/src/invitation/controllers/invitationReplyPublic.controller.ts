import { Request, Response } from 'express';
import { getPrismaClient } from '../../prismaclient';
import {
  getInvitationByEmailAndSecret,
  updateInvitation,
} from '../invitation.db';
import { resError } from '../../utils/respond.utils';
import {
  validateInvitationAccess,
  addUserToAccountFromInvitation,
} from '../utils/invitation.utils';
import { respondLogin } from '../../auth/controllers/login.controller';
import { createUser } from '../../users/users.db';

const prisma = getPrismaClient();

export async function handleInvitationReplyPublic(req: Request, res: Response) {
  const { secret, email, reply } = req.body;

  if (!secret || !email || !reply) {
    return resError(res, 'missing_required_fields');
  }

  if (!['ACCEPT', 'DECLINE'].includes(reply)) {
    return resError(res, 'invalid_reply_value');
  }

  try {
    const invitation = await getInvitationByEmailAndSecret(email, secret);

    // Validate invitation access
    const validationResult = await validateInvitationAccess(invitation);
    if (!validationResult.isValid) {
      return resError(res, validationResult.error || 'invitation_not_valid');
    }

    // If accepting the invitation, add user to the account
    if (reply === 'ACCEPT') {
      // Find the user by email
      let user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        // If user does not exist, create a new user
        user = await createUser({
          email: email,
          clientData: { needSetup: true },
          meta: {},
        });
      }

      // Add user to account using utility function
      await addUserToAccountFromInvitation(user.id, invitation);

      // Update invitation status to ACCEPTED
      await updateInvitation(invitation.id, {
        status: 'ACCEPTED',
      });

      // Login the user and return authentication cookie
      const { useCookie } = req.query;
      // this is a 201 response with a cookie
      return await respondLogin(user.id, res, useCookie !== 'false');
    }

    // If declining the invitation, just update status
    await updateInvitation(invitation.id, {
      status: 'DECLINED',
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return resError(res, 'internal_server_error', 500);
  }
}

import { Router } from 'express';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { requireRoleForInvitation } from '../utils/permissions.utils';
import { updateInvitationController } from './controllers/updateInvitation.controller';
import { deleteInvitationController } from './controllers/deleteInvitation.controller';
import { resendInvitationController } from './controllers/resendInvitation.controller';
import { acceptInvitationController } from './controllers/acceptInvitation.controller';
import { declineInvitationController } from './controllers/declineInvitation.controller';
import { getInvitationController } from './controllers/getInvitation.controller';

const invitationRouter = Router();

// Public endpoint to get invitation details (no auth required)
invitationRouter.get('/:invitationId', getInvitationController);

// Accept an invitation (authenticated user)
invitationRouter.post(
  '/:invitationId/accept',
  withJWTAuth,
  acceptInvitationController,
);

// Decline an invitation (authenticated user)
invitationRouter.post(
  '/:invitationId/decline',
  withJWTAuth,
  declineInvitationController,
);

// Admin-only endpoints
// Update an invitation (change status, role, or expiration)
invitationRouter.patch(
  '/:invitationId',
  withJWTAuth,
  requireRoleForInvitation('ADMIN'),
  updateInvitationController,
);

// Delete an invitation
invitationRouter.delete(
  '/:invitationId',
  withJWTAuth,
  requireRoleForInvitation('ADMIN'),
  deleteInvitationController,
);

// Resend an invitation email
invitationRouter.post(
  '/:invitationId/resend',
  withJWTAuth,
  requireRoleForInvitation('ADMIN'),
  resendInvitationController,
);

export default invitationRouter;

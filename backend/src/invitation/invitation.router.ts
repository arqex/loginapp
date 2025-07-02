import { Router } from 'express';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { requireRoleForInvitation } from '../utils/permissions.utils';
import { updateInvitationController } from './controllers/updateInvitation.controller';
import { deleteInvitationController } from './controllers/deleteInvitation.controller';
import { resendInvitationController } from './controllers/resendInvitation.controller';
import { invitationReplyAuthenticatedController } from './controllers/invitationReplyAuthenticated.controller';

const invitationRouter = Router();

// Reply to an invitation (authenticated user) - unified accept/decline endpoint
invitationRouter.post(
  '/:invitationId/reply',
  withJWTAuth,
  invitationReplyAuthenticatedController,
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

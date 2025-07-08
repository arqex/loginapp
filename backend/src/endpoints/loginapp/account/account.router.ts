import { getAccountController } from './controllers/getAccount.controller';
import { createAccountController } from './controllers/createAccount.controller';
import { updateAccountController } from './controllers/updateAccount.controller';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { getAccountUserListController } from './controllers/getAccountUserList.controller';
import { deleteAccountMemberController } from './controllers/deleteAccountMember.controller';

import { getAccountInvitationsController } from '../invitation/controllers/getAccountInvitations.controller';
import { createInvitationController } from '../invitation/controllers/createInvitation.controller';
import { createAsyncRouter } from '../../../utils/asyncRouter';
import {
  requireAdmin,
  requireCollaborator,
} from '../../../utils/permissions.utils';
import { createAccountTodoListController } from '../../todo/createAccountTodoList.controller';
import { getAccountTodoListController } from '../../todo/getAccountTodoList.controller';

const accountRouter = createAsyncRouter();

// Create a new account (authenticated users only)
accountRouter.post('/', withJWTAuth, createAccountController);

accountRouter.get('/:accountId', withJWTAuth, getAccountController);

accountRouter.patch(
  '/:accountId',
  withJWTAuth,
  requireAdmin(),
  updateAccountController,
);

accountRouter.get(
  '/:accountId/users',
  withJWTAuth,
  requireCollaborator(),
  getAccountUserListController,
);

// Remove a user from an account
accountRouter.delete(
  '/:accountId/users/:userId',
  withJWTAuth,
  requireAdmin(),
  deleteAccountMemberController,
);

accountRouter.get(
  '/:accountId/lists',
  withJWTAuth,
  requireCollaborator(),
  getAccountTodoListController,
);

accountRouter.post(
  '/:accountId/lists',
  withJWTAuth,
  requireAdmin(),
  createAccountTodoListController,
);

// Invitation endpoints
// Get all invitations for an account
accountRouter.get(
  '/:accountId/invitations',
  withJWTAuth,
  requireAdmin(),
  getAccountInvitationsController,
);

// Create a new invitation for an account
accountRouter.post(
  '/:accountId/invitations',
  withJWTAuth,
  requireAdmin(),
  createInvitationController,
);

export default accountRouter.getRouter();

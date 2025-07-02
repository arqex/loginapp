import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../auth/auth.types';
import { UsersOnAccountRole } from '@prisma/client';
import { getUsersOnAccountRoleOnAccount } from '../userRole/userRole.db';
import { resForbidden, resError } from './respond.utils';
import { getTodoListById } from '../todoList/todoList.db';
import { getTodoItemById } from '../todoItem/todoItem.db';
import { getInvitationById } from '../invitation/invitation.db';

export type RequiredRole = 'ADMIN' | 'EDITOR' | 'COLLABORATOR';

/**
 * Middleware to check if the authenticated user has the required role for an account.
 * The account ID is extracted from the request parameters.
 *
 * @param requiredRole The minimum role required to access the endpoint
 * @param accountIdParam The parameter name containing the account ID (defaults to 'accountId')
 * @returns Express middleware function
 */
export function requireRole(
  requiredRole: RequiredRole,
  accountIdParam: string = 'accountId',
) {
  return requireRoleWithExtractor(requiredRole, (req: Request) =>
    Promise.resolve(req.params[accountIdParam]),
  );
}

/**
 * Check if a user role has the required permissions.
 * Role hierarchy: ADMIN > EDITOR > COLLABORATOR
 *
 * @param userRole The user's role in the account
 * @param requiredRole The minimum required role
 * @returns true if user has sufficient permissions
 */
export function hasRequiredRole(
  userRole: UsersOnAccountRole,
  requiredRole: RequiredRole,
): boolean {
  const roleHierarchy = {
    [UsersOnAccountRole.ADMIN]: 3,
    [UsersOnAccountRole.EDITOR]: 2,
    [UsersOnAccountRole.COLLABORATOR]: 1,
  };

  const requiredRoleEnum = UsersOnAccountRole[requiredRole];

  return roleHierarchy[userRole] >= roleHierarchy[requiredRoleEnum];
}

/**
 * Middleware that requires ADMIN role for the account
 */
export const requireAdmin = (accountIdParam?: string) =>
  requireRole('ADMIN', accountIdParam);

/**
 * Middleware that requires EDITOR or higher role for the account
 */
export const requireEditor = (accountIdParam?: string) =>
  requireRole('EDITOR', accountIdParam);

/**
 * Middleware that requires COLLABORATOR or higher role for the account
 */
export const requireCollaborator = (accountIdParam?: string) =>
  requireRole('COLLABORATOR', accountIdParam);

/**
 * Alternative middleware for cases where account ID needs to be extracted from a different source
 *
 * @param requiredRole The minimum role required
 * @param accountIdExtractor Function to extract account ID from request (can be async)
 */
export function requireRoleWithExtractor(
  requiredRole: RequiredRole,
  accountIdExtractor: (
    req: Request,
  ) => string | undefined | Promise<string | undefined>,
) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Extract account ID using the provided extractor
      const accountId = await accountIdExtractor(req);
      if (!accountId) {
        return resError(res, 'account_id_required', 400, {
          reason: 'Account ID could not be extracted from request',
        });
      }

      // Get user's role in the account
      const userRole = await getUsersOnAccountRoleOnAccount(
        req.user.id,
        accountId,
      );

      // Check if user has sufficient permissions
      if (!userRole || !hasRequiredRole(userRole, requiredRole)) {
        return resForbidden(res);
      }

      // Add role information to request for use in controllers
      req.user.accountRole = userRole;
      req.user.accountId = accountId;

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      return resError(res, 'permission_check_failed', 500);
    }
  };
}

/**
 * Helper function to extract account ID from TodoList ID
 */
export async function getAccountIdFromTodoList(
  req: Request,
): Promise<string | undefined> {
  const todoListId = req.params.id || req.params.todoListId;
  if (!todoListId) return undefined;

  const todoList = await getTodoListById(todoListId);
  return todoList?.accountId;
}

/**
 * Helper function to extract account ID from TodoItem ID
 */
export async function getAccountIdFromTodoItem(
  req: Request,
): Promise<string | undefined> {
  const todoItemId = req.params.id || req.params.todoItemId;
  if (!todoItemId) return undefined;

  const todoItem = await getTodoItemById(todoItemId);
  if (!todoItem) return undefined;

  // Get the account ID from the associated TodoList
  const todoList = await getTodoListById(todoItem.todoListId);
  return todoList?.accountId;
}

/**
 * Helper function to extract account ID from Invitation ID
 */
export async function getAccountIdFromInvitation(
  req: Request,
): Promise<string | undefined> {
  const invitationId = req.params.invitationId;
  if (!invitationId) return undefined;

  const invitation = await getInvitationById(invitationId);
  return invitation?.accountId;
}

/**
 * Middleware for TodoList operations that requires a specific role
 */
export const requireRoleForTodoList = (requiredRole: RequiredRole) =>
  requireRoleWithExtractor(requiredRole, getAccountIdFromTodoList);

/**
 * Middleware for TodoItem operations that requires a specific role
 */
export const requireRoleForTodoItem = (requiredRole: RequiredRole) =>
  requireRoleWithExtractor(requiredRole, getAccountIdFromTodoItem);

/**
 * Middleware for Invitation operations that requires a specific role
 */
export const requireRoleForInvitation = (requiredRole: RequiredRole) =>
  requireRoleWithExtractor(requiredRole, getAccountIdFromInvitation);

/**
 * Middleware to ensure that the authenticated user can only access their own user data.
 * Compares the authenticated user's ID with the user ID from the request parameters.
 *
 * @param userIdParam The parameter name containing the user ID (defaults to 'id')
 * @returns Express middleware function
 */
export function requireSelfUser(userIdParam: string = 'id') {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Extract user ID from request parameters
      const requestedUserId = req.params[userIdParam];
      if (!requestedUserId) {
        return resError(res, 'user_id_required', 400, {
          reason: `User ID parameter '${userIdParam}' is required`,
        });
      }

      // Check if the authenticated user is trying to access their own data
      if (req.user.id !== requestedUserId) {
        return resForbidden(res);
      }

      next();
    } catch (error) {
      console.error('User permission check error:', error);
      return resError(res, 'permission_check_failed', 500);
    }
  };
}

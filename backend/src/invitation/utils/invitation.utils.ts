import { Invitation, InvitationStatus } from '@prisma/client';
import { randomBytes } from 'node:crypto';
import { createAccountMembers } from '../../userRole/userRole.db';
import { getRoleValue } from '../../userRole/userRole.utils';

export interface ValidateInvitationResult {
  isValid: boolean;
  invitation?: any;
  user?: any;
}

/**
 * Generates a cryptographically secure secret for an invitation
 */
export function generateInvitationSecret(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Validates that an invitation can be accessed to be accepted or declined
 */
export async function validateInvitationAccess(
  invitation: Invitation | null,
): Promise<{ isValid: boolean; invitation?: any; error?: string }> {
  try {
    if (!invitation) {
      return { isValid: false, error: 'invitation_not_found' };
    }

    // Check if invitation is valid
    if (invitation.status !== InvitationStatus.PENDING) {
      return { isValid: false, error: 'invitation_not_valid' };
    }

    if (invitation.expiresAt < new Date()) {
      return { isValid: false, error: 'invitation_expired' };
    }

    return {
      isValid: true,
      invitation,
    };
  } catch (error) {
    console.error('Error validating invitation access:', error);
    return { isValid: false, error: 'failed_to_validate_invitation' };
  }
}

/**
 * Adds a user to an account based on invitation metadata
 */
export async function addUserToAccountFromInvitation(
  userId: string,
  invitation: any,
): Promise<{ accountId: string; role: any }> {
  // Get the role from invitation meta
  const roleString = (invitation.meta as any)?.role || 'collaborator';
  const accountRole = getRoleValue(roleString.toLowerCase() as any);

  // Add user to the account
  await createAccountMembers([
    {
      userId,
      accountId: invitation.accountId,
      role: accountRole,
    },
  ]);

  return {
    accountId: invitation.accountId,
    role: accountRole,
  };
}

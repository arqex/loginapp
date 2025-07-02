import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { getInvitationById } from '../invitation.db';
import { resError } from '../../utils/respond.utils';
import { InvitationStatus } from '@prisma/client';
import { getPrismaClient } from '../../prismaclient';
import { randomBytes, timingSafeEqual } from 'node:crypto';

const prisma = getPrismaClient();

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
 * Validates an invitation secret against the stored secret
 * @param invitationId The invitation ID
 * @param providedSecret The secret provided by the user
 * @returns True if the secret is valid, false otherwise
 */
export async function validateInvitationSecret(
  invitationId: string,
  providedSecret: string,
): Promise<boolean> {
  const invitation = await getInvitationById(invitationId);

  if (!invitation || !invitation.secret) {
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  return timingSafeEqual(
    Buffer.from(invitation.secret, 'hex'),
    Buffer.from(providedSecret, 'hex'),
  );
}

/**
 * Validates that an invitation can be accepted or declined by the current user
 * @param req The authenticated request
 * @param res The response object
 * @param invitationId The invitation ID to validate
 * @returns Object with validation result and data, or sends error response
 */
export async function validateInvitationForUser(
  req: AuthRequest,
  res: Response,
  invitationId: string,
): Promise<ValidateInvitationResult> {
  const userId = req.user.id;

  try {
    // Get the invitation
    const invitation = await getInvitationById(invitationId);
    if (!invitation) {
      resError(res, 'invitation_not_found', 404);
      return { isValid: false };
    }

    // Check if invitation is valid
    if (invitation.status !== InvitationStatus.PENDING) {
      resError(res, 'invitation_not_valid');
      return { isValid: false };
    }

    if (invitation.expiresAt < new Date()) {
      resError(res, 'invitation_expired');
      return { isValid: false };
    }

    // Get current user's email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      resError(res, 'user_not_found', 404);
      return { isValid: false };
    }

    // Check if the invitation is for the current user's email
    if (invitation.email.toLowerCase() !== user.email.toLowerCase()) {
      resError(res, 'invitation_not_for_user');
      return { isValid: false };
    }

    return {
      isValid: true,
      invitation,
      user,
    };
  } catch (error) {
    console.error('Error validating invitation:', error);
    resError(res, 'failed_to_validate_invitation');
    return { isValid: false };
  }
}

/**
 * Validates that an invitation can be accessed with the provided secret
 * This is used for public invitation links that don't require authentication
 * @param invitationId The invitation ID
 * @param email The email for the invitation
 * @param secret The secret for the invitation
 * @returns Object with validation result and invitation data
 */
export async function validateInvitationAccess(
  invitationId: string,
  email: string,
  secret: string,
): Promise<{ isValid: boolean; invitation?: any; error?: string }> {
  try {
    // Get the invitation
    const invitation = await getInvitationById(invitationId);
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

    // Check if the invitation is for the provided email
    if (invitation.email.toLowerCase() !== email.toLowerCase()) {
      return { isValid: false, error: 'invitation_not_for_email' };
    }

    // Validate the secret
    const isSecretValid = await validateInvitationSecret(invitationId, secret);
    if (!isSecretValid) {
      return { isValid: false, error: 'invalid_invitation_secret' };
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
 * Migrates existing invitations to add secrets
 * This should be run once when deploying the secret feature
 */
export async function migrateInvitationsWithSecrets(): Promise<number> {
  const invitations = await prisma.invitation.findMany({
    where: {
      status: InvitationStatus.PENDING,
      OR: [{ secret: '' }, { secret: null }],
    },
  });

  let migratedCount = 0;

  for (const invitation of invitations) {
    const secret = generateInvitationSecret();

    await prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        secret,
      },
    });

    migratedCount++;
  }

  return migratedCount;
}

import { InvitationStatus } from '@prisma/client';
import { getPrismaClient } from '../prismaclient';

const prisma = getPrismaClient();

export interface CreateInvitationData {
  email: string;
  accountId: string;
  expiresAt: Date;
  secret: string;
  meta: Record<string, any>;
}

export interface UpdateInvitationData {
  status?: InvitationStatus;
  meta?: Record<string, any>;
  expiresAt?: Date;
}

// Create a new invitation
export async function createInvitation(data: CreateInvitationData) {
  return await prisma.invitation.create({
    data: {
      email: data.email,
      accountId: data.accountId,
      expiresAt: data.expiresAt,
      secret: data.secret,
      meta: data.meta,
    },
    include: {
      account: {
        select: {
          id: true,
          meta: true,
        },
      },
    },
  });
}

// Get invitation by ID
export async function getInvitationById(id: string) {
  return await prisma.invitation.findUnique({
    where: { id },
    include: {
      account: {
        select: {
          id: true,
          meta: true,
        },
      },
    },
  });
}

// Get all invitations for an account
export async function getInvitationsByAccount(accountId: string) {
  return await prisma.invitation.findMany({
    where: { accountId },
    include: {
      account: {
        select: {
          id: true,
          meta: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// Update invitation
export async function updateInvitation(id: string, data: UpdateInvitationData) {
  return await prisma.invitation.update({
    where: { id },
    data,
    include: {
      account: {
        select: {
          id: true,
          meta: true,
        },
      },
    },
  });
}

// Delete invitation
export async function deleteInvitation(id: string) {
  return await prisma.invitation.delete({
    where: { id },
  });
}

// Check if invitation exists and is valid
export async function isInvitationValid(id: string): Promise<boolean> {
  const invitation = await prisma.invitation.findUnique({
    where: { id },
    select: {
      status: true,
      expiresAt: true,
    },
  });

  if (!invitation) return false;

  return (
    invitation.status === InvitationStatus.PENDING &&
    invitation.expiresAt > new Date()
  );
}

// Get pending invitations by email (for checking when user logs in)
export async function getPendingInvitationsByEmail(email: string) {
  return await prisma.invitation.findMany({
    where: {
      email,
      status: InvitationStatus.PENDING,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      account: {
        select: {
          id: true,
          meta: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

import { User } from '@prisma/client';
import { getPrismaClient } from '../prismaclient';

export interface UserSignals {
  missingAuth?: boolean;
  [key: string]: boolean | undefined;
}

/**
 * Generate signals for a user indicating what might be missing or wrong
 * with their account that affects the application's proper functioning
 */
export async function generateUserSignals(user: User): Promise<UserSignals> {
  const signals: UserSignals = {};

  // Check for missing authentication tokens
  const missingAuth = await checkMissingAuth(user.id);
  if (missingAuth) {
    signals.missingAuth = true;
  }

  return signals;
}

/**
 * Check if user has any authentication tokens
 */
async function checkMissingAuth(userId: string): Promise<boolean> {
  const authToken = await getPrismaClient().authToken.findFirst({
    where: {
      userId,
    },
  });

  return !authToken;
}

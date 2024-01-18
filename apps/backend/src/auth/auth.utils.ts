import { pbkdf2, randomBytes, randomUUID } from 'node:crypto';
import { EmailAuthMeta } from './auth.types';
import { AuthToken } from '@prisma/client';

import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { createAuth, findAuth, updateAuth } from './auth.db';
import { JsonObject } from '@prisma/client/runtime/library';
import { getUserById, getUserByEmail, createUser } from '../users/users.db';

const createHash = promisify(pbkdf2);
const generateSalt = promisify(randomBytes);

export async function isValidPassword(auth: AuthToken, password: string) {
  const { salt, hash } = auth.meta as unknown as EmailAuthMeta;
  const receivedHash = await hashPassword(password, salt);
  return receivedHash === hash;
}

export async function generatePasswordAuth(password: string) {
  const saltBuffer = await generateSalt(32);
  const salt = saltBuffer.toString('hex');
  return {
    salt,
    hash: await hashPassword(password, salt),
  };
}

async function hashPassword(password: string, salt: string) {
  const hash = await createHash(password, salt, 310000, 32, 'sha256');
  return hash.toString('hex');
}

export async function createJWT(userId: string, permissions: string[]) {
  const token = await jwt.sign(
    { userId, permissions },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
      algorithm: 'RS256',
    },
  );
  return token;
}

export function generateVerificationCode() {
  // six capital letters
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const OTT_EXPIRY = 1000 * 60 * 5; // 5 minutes
export function generateOtt() {
  const ott = `ott_${randomUUID()}`;
  return {
    token: ott,
    expiresAt: Date.now() + OTT_EXPIRY,
  };
}

export function isValidOTT(auth: AuthToken, ott: string) {
  const meta = auth.meta as unknown as EmailAuthMeta;
  const storedOTT = meta.ott;
  return (
    storedOTT && storedOTT.token === ott && Date.now() < storedOTT.expiresAt
  );
}

export async function refreshOTT(auth: AuthToken) {
  const ott = generateOtt();
  const meta = {
    ...(auth.meta as JsonObject),
    ott,
  };
  await updateAuth(auth.key, { meta });
  return ott.token;
}

export async function handleOauthCallback(accessToken, refreshToken, profile) {
  const auth = await findAuth(profile.id);
  const email = profile.emails[0].value;

  if (!email) throw new Error('Oauth: No email found in profile');

  // Login
  if (auth) {
    const user = await getUserById(auth.userId);
    if (user) {
      const ott = await refreshOTT(auth);
      return { id: profile.id, ott };
    }
  }

  // Maybe user never got authenticated by this provider
  let user = await getUserByEmail(email);
  if (!user) {
    // Register
    user = await createUser({
      email: profile.emails[0].value,
      meta: {
        verified: true,
        name: profile.displayName,
        picURL: profile.photos[0]?.value || '',
      },
    });
  }

  const ott = generateOtt();

  await createAuth({
    key: profile.id,
    type: 'OAUTH20',
    userId: user.id,
    meta: {
      provider: profile.provider,
      accessToken,
      refreshToken,
      ott,
    },
  });

  return { id: profile.id, ott };
}

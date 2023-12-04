import { pbkdf2, randomBytes, randomUUID } from 'node:crypto';
import { EmailAuthMeta } from './auth.types';
import { AuthToken } from '@prisma/client';

import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';

const createHash = promisify(pbkdf2);
const generateSalt = promisify(randomBytes);

export async function isValidPassword(auth: AuthToken, password: string) {
  const { salt, hash } = auth.meta as unknown as EmailAuthMeta;
  const receivedHash = await hashPassword(password, salt);
  console.log('isValidPassword', receivedHash, hash);
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
  console.log('generateOtt', ott);
  return {
    token: ott,
    expiresAt: Date.now() + OTT_EXPIRY,
  };
}

export function isValidOTT(auth: AuthToken, ott: string) {
  const meta = auth.meta as unknown as EmailAuthMeta;
  const storedOTT = meta.ott;
  console.log('isValidOTT', storedOTT, ott);
  return (
    storedOTT && storedOTT.token === ott && Date.now() < storedOTT.expiresAt
  );
}

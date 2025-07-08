import { Request } from 'express';
import { UsersOnAccountRole } from '@prisma/client';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface EmailAuthMeta {
  salt: string;
  hash: string;
  ott?: StoredOTT;
  vt?: string;
}

export interface AuthRequest extends Request {
  user: {
    id: string;
    permissions: ('all' | 'read' | 'write' | 'delete')[];
    accountRole?: UsersOnAccountRole;
    accountId?: string;
  };
}

export interface OauthRequest extends Request {
  user: {
    id: string;
    ott: string;
  };
  returnTo: string;
}

export interface StoredOTT {
  token: string;
  expiresAt: number;
}

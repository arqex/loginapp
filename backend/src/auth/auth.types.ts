import { Request } from 'express';

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

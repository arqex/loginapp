import '../src/config';
import * as jwt from 'jsonwebtoken';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { Response as OriResponse } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import * as request from 'supertest';
import app from '../src/app';

export function mockRequest(method: string, url: string, data?: any) {
  const req = new Request(url, {
    // @ts-ignore
    method,
    headers: { 'content-type': 'application/json' },
  });
  if (data) {
    req.setBody(data);
  }
  // @ts-ignore
  req.user = {
    id: 'dummy_user_id',
    permissions: ['all'],
  };
  // @ts-ignore
  return req as AuthRequest;
}

export function mockGet(url: string) {
  return mockRequest('GET', url);
}

export function mockPatch(url: string, data: any) {
  return mockRequest('PATCH', url, data);
}

export function mockPost(url: string, data: any) {
  return mockRequest('POST', url, data);
}

export function mockDelete(url: string) {
  return mockRequest('DELETE', url);
}

export function mockResponse() {
  // @ts-ignore
  return new Response() as OriResponse;
}

export const testUserId = 'dummy_user_id';
export const testAccountId = 'dummy_account_id';

let token: string;
export async function prepareTestAuthToken() {
  if (!token) {
    const signObject = {
      userId: testUserId,
      permissions: ['all'],
      accountId: testAccountId,
    };
    token = await jwt.sign(signObject, process.env.JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'RS256',
    });
  }
  return token;
}

export function mockAuthGet(path: string) {
  return request(app).get(path).set('Authorization', `Bearer ${token}`);
}

export function mockAuthPost(path: string) {
  return request(app).post(path).set('Authorization', `Bearer ${token}`);
}

export function mockAuthPatch(path: string) {
  return request(app).patch(path).set('Authorization', `Bearer ${token}`);
}

export function mockAuthDelete(path: string) {
  return request(app).delete(path).set('Authorization', `Bearer ${token}`);
}

import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { Response as OriResponse } from 'express';
import { AuthRequest } from 'src/auth/auth.types';

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

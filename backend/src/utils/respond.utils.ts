import { Response } from 'express';
import { PaginationQuery } from './request.utils';

export function resUnauthorized(res: Response) {
  resError(res, 'unauthorized', 401);
}

export function resForbidden(res: Response) {
  resError(res, 'forbidden', 403);
}

export function resError(
  res: Response,
  code: string,
  status: number = 400,
  extra?: any,
) {
  res.status(status).json({
    error: code,
    ...(extra || {}),
  });
}

export function resPayloadError(res: Response, reason: string) {
  resError(res, 'invalid_payload', 400, { reason });
}

export function resInvalidEmail(res: Response) {
  resError(res, 'invalid_email_address', 400);
}

export interface PaginationResponseData<T> {
  items: T[];
  pageSize: number;
  cursor: string | null;
  nextCursor: string | null;
}
export function getPaginationResponse<T>(
  data: T[],
  paginationQuery: PaginationQuery,
): PaginationResponseData<T> {
  const orderAttribute = Object.keys(paginationQuery.orderBy)[0];
  const nextCursor =
    data.length > 0 ? data[data.length - 1][orderAttribute] : null;

  return {
    items: data,
    pageSize: paginationQuery.take,
    cursor: paginationQuery.cursor?.[orderAttribute] || null,
    nextCursor: nextCursor,
  };
}

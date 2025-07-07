import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../auth/auth.types';
import { resError } from './respond.utils';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function createAppError(
  message: string,
  statusCode: number = 500,
  isOperational: boolean = true,
): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = isOperational;
  return error;
}

export function errorHandler(
  err: AppError,
  req: Request | AuthRequest,
  res: Response,
): void {
  // Log error for debugging
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
    userId: 'user' in req ? (req as AuthRequest).user?.id : undefined,
  });

  resError(res, 'unexpected_error', 500);
}

// Wrapper for async route handlers to catch errors
export function asyncHandler(
  fn: (
    req: Request | AuthRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<void> | void,
) {
  return (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

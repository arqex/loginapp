import { Router, Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../endpoints/loginapp/auth/auth.types';

/**
 * Express.js does not automatically catch errors thrown by async route handlers.
 * If an async function throws an error (or a promise rejects), it becomes an
 * unhandled promise rejection, which could crash the application.
 *
 * This utility class wraps route handlers to ensure that any errors thrown can be caught
 */

type AsyncRouteHandler = (
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction,
) => Promise<any> | any;

class AsyncRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  private wrapHandler(handler: AsyncRouteHandler): AsyncRouteHandler {
    return (req: Request | AuthRequest, res: Response, next: NextFunction) => {
      Promise.resolve(handler(req, res, next)).catch(next);
    };
  }

  private wrapHandlers(handlers: AsyncRouteHandler[]): AsyncRouteHandler[] {
    return handlers.map((handler) => this.wrapHandler(handler));
  }

  get(path: string, ...handlers: AsyncRouteHandler[]): this {
    this.router.get(path, ...this.wrapHandlers(handlers));
    return this;
  }

  post(path: string, ...handlers: AsyncRouteHandler[]): this {
    this.router.post(path, ...this.wrapHandlers(handlers));
    return this;
  }

  put(path: string, ...handlers: AsyncRouteHandler[]): this {
    this.router.put(path, ...this.wrapHandlers(handlers));
    return this;
  }

  patch(path: string, ...handlers: AsyncRouteHandler[]): this {
    this.router.patch(path, ...this.wrapHandlers(handlers));
    return this;
  }

  delete(path: string, ...handlers: AsyncRouteHandler[]): this {
    this.router.delete(path, ...this.wrapHandlers(handlers));
    return this;
  }

  use(...args: any[]): this {
    this.router.use(...args);
    return this;
  }

  // Get the underlying Express router
  getRouter(): Router {
    return this.router;
  }
}

export function createAsyncRouter(): AsyncRouter {
  return new AsyncRouter();
}

// For compatibility with existing code
export { AsyncRouter };

import { Router, Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../auth/auth.types';

type AsyncRouteHandler = (
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

// Monkey patch Express Router to automatically handle async functions
const originalMethods = {
  get: Router.prototype.get,
  post: Router.prototype.post,
  put: Router.prototype.put,
  patch: Router.prototype.patch,
  delete: Router.prototype.delete,
};

function wrapAsyncHandler(handler: AsyncRouteHandler): AsyncRouteHandler {
  return (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function wrapHandlers(handlers: AsyncRouteHandler[]): AsyncRouteHandler[] {
  return handlers.map((handler) => {
    if (typeof handler === 'function') {
      return wrapAsyncHandler(handler);
    }
    return handler;
  });
}

// Override Router methods to automatically wrap async handlers
Router.prototype.get = function (
  path: string,
  ...handlers: AsyncRouteHandler[]
) {
  return originalMethods.get.call(this, path, ...wrapHandlers(handlers));
};

Router.prototype.post = function (
  path: string,
  ...handlers: AsyncRouteHandler[]
) {
  return originalMethods.post.call(this, path, ...wrapHandlers(handlers));
};

Router.prototype.put = function (
  path: string,
  ...handlers: AsyncRouteHandler[]
) {
  return originalMethods.put.call(this, path, ...wrapHandlers(handlers));
};

Router.prototype.patch = function (
  path: string,
  ...handlers: AsyncRouteHandler[]
) {
  return originalMethods.patch.call(this, path, ...wrapHandlers(handlers));
};

Router.prototype.delete = function (
  path: string,
  ...handlers: AsyncRouteHandler[]
) {
  return originalMethods.delete.call(this, path, ...wrapHandlers(handlers));
};

// Export the patched Router
export { Router as AsyncRouter };

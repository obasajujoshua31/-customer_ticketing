import { serverError } from './http';
import { Request, NextFunction, Response, RequestHandler } from 'express';
import { logger } from './logger';

/**
 * @description This tries the handler and return server error if it fails
 *
 * @param {RequestHandler} handler
 */
export const tryAsync = (handler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      logger.log({
        level: 'error',
        message: 'server error',
        error: error.message,
      });
      return serverError(res);
    }
  };
};

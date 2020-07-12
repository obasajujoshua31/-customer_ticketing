import { findUserById } from './../utils/query';
import { badRequest, notFound } from './../utils/http';
import { logger } from '../utils/logger';
import { isValidId } from './../utils/validator';
import { Response, Request, NextFunction } from 'express';
import { IUser } from '../../database/models/user';

/**
 * @description This is responsible for getting request from params by req.params.requestId
 * and it populates customer and agent.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { userId } = req.params;

  if (!isValidId(userId)) {
    logger.log({
      level: 'error',
      message: 'invalid user id',
    });
    return badRequest(res, { error: 'invalid user id' });
  }
  const foundUser = (await findUserById(userId)) as IUser;

  if (!foundUser) {
    return notFound(res, 'user is not found');
  }

  if (foundUser.isDeactivated) {
    return notFound(res, 'user account is deactivated');
  }

  req.foundUser = foundUser;
  return next();
};

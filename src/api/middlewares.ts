import { isValidId } from './utils/validator';
import logger from 'morgan';
import express, { Application, Request, Response, NextFunction } from 'express';
import { notAuthenticated, notAuthorized } from './utils/http';
import User, { IUser } from '../database/models/user';
import { decodeToken } from '../api/utils/jwt';
import { userType } from '../api/utils/constants';
import Mongoose from 'mongoose';

const initializeMiddlewares = (app: Application) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(logger('dev'));
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerToken = req.headers[`authorization`] as string;

  if (typeof bearerToken === 'undefined') {
    return notAuthenticated(res, 'no bearer token');
  }

  const token = bearerToken.split(' ')[1];
  if (!token) {
    return notAuthenticated(res, 'no bearer token');
  }

  try {
    const decoded = decodeToken(token);

    const user = (await User.findOne({
      _id: decoded.userId,
    })) as IUser;
    if (!user) {
      return notAuthenticated(res, 'not authenticated');
    }

    req.user = user;
    return next();
  } catch (error) {
    return notAuthenticated(res, 'please sign in to continue!');
  }
};

export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user.accountType !== userType.customer.toString()) {
    return notAuthorized(res);
  }

  return next();
};
export const isAgent = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user.accountType !== userType.agent.toString()) {
    return notAuthorized(res);
  }

  return next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user.accountType !== userType.admin.toString()) {
    return notAuthorized(res);
  }

  return next();
};

export const isAgentOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (user.accountType === userType.customer.toString()) {
    return notAuthorized(res);
  }

  return next();
};

export default initializeMiddlewares;

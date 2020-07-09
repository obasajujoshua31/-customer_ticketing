import { userType } from './../utils/constants';
import { decodeToken } from './../utils/jwt';
import { notAuthenticated, notAuthorized } from './../utils/http';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../../database/models/user';

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    if (user.isDeactivated) {
      return notAuthenticated(res, 'user account is deactivated');
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
  next: NextFunction
) => {
  const user = req.user;

  if (user.accountType === userType.customer.toString()) {
    return notAuthorized(res);
  }

  return next();
};

export const isCustomerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user.accountType === userType.agent.toString()) {
    return notAuthorized(res);
  }

  return next();
};

export const isCustomerOrAgent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user.accountType === userType.admin.toString()) {
    return notAuthorized(res);
  }

  return next();
};

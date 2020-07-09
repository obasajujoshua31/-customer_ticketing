import { userType } from './../utils/constants';
import { badRequest, notFound, notAuthorized } from './../utils/http';
import { logger } from '../utils/logger';
import { isValidId } from './../utils/validator';
import RequestModel, { IRequest } from '../../database/models/request';
import { Response, Request, NextFunction } from 'express';

/**
 * @description This is responsible for getting request from params by req.params.requestId
 * and it populates customer and agent.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */

export const getRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { requestId } = req.params;

  if (!isValidId(requestId)) {
    logger.log({
      level: 'error',
      message: 'invalid request id',
    });
    return badRequest(res, { error: 'invalid request id' });
  }
  const request = (await RequestModel.findById(req.params.requestId)
    .populate('customer')
    .populate('agent')
    .exec()) as IRequest;

  if (!request) {
    return notFound(res, 'request is not found');
  }

  logger.log({
    level: 'info',
    message: 'request retrieved',
    data: request,
  });

  // remove password from request object
  request.customer.password = undefined;
  if (request.agent) request.agent.password = undefined;

  req.request = request;
  return next();
};

export const isCustomerRequests = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user, request } = req;

  if (
    user.accountType === userType.customer.toString() &&
    request.customer._id.toString() !== user._id.toString()
  ) {
    return notAuthorized(res);
  }

  return next();
};

export const isAgentRequests = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user, request } = req;

  if (
    user.accountType === userType.agent.toString() &&
    request.agent._id.toString() !== user._id.toString()
  ) {
    return notAuthorized(res);
  }

  return next();
};
